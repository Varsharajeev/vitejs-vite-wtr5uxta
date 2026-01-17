import create from 'zustand';
import { v4 as uuid } from 'uuid';
import { persistence } from '../services/persistence';
import {
  Blueprint,
  BlueprintField,
  Contract,
  ContractField,
  ContractStatus,
} from '../types';
import { canTransition } from '../state/stateMachine';

interface StoreState {
  blueprints: Blueprint[];
  contracts: Contract[];
  loadAll: () => void;
  addBlueprint: (b: Omit<Blueprint, 'id' | 'createdAt'>) => Blueprint;
  deleteBlueprint: (id: string) => void;
  createContractFromBlueprint: (
    blueprintId: string,
    name: string
  ) => Contract | null;
  updateContractField: (
    contractId: string,
    fieldId: string,
    value: any
  ) => void;
  transitionContract: (contractId: string, target: ContractStatus) => boolean;
  seedIfEmpty: () => void;
}

export const useStore = create<StoreState>((set, get) => ({
  blueprints: [],
  contracts: [],

  loadAll() {
    const bs = persistence.loadBlueprints();
    const cs = persistence.loadContracts();
    set({ blueprints: bs, contracts: cs });
  },

  addBlueprint(b) {
    const bp: Blueprint = {
      id: uuid(),
      name: b.name,
      fields: b.fields ?? [],
      createdAt: new Date().toISOString(),
    };
    const updated = [...get().blueprints, bp];
    persistence.saveBlueprints(updated);
    set({ blueprints: updated });
    return bp;
  },

  deleteBlueprint(id) {
    const filtered = get().blueprints.filter((x) => x.id !== id);
    persistence.saveBlueprints(filtered);
    set({ blueprints: filtered });
  },

  createContractFromBlueprint(blueprintId, name) {
    const bp = get().blueprints.find((b) => b.id === blueprintId);
    if (!bp) return null;
    const fields: ContractField[] = bp.fields.map((f) => ({
      id: f.id,
      type: f.type,
      label: f.label,
      position: f.position,
      width: f.width,
      value: f.type === 'checkbox' ? false : '',
    }));
    const c: Contract = {
      id: uuid(),
      name,
      blueprintId: bp.id,
      blueprintName: bp.name,
      fields,
      status: 'Created',
      createdAt: new Date().toISOString(),
    };
    const updated = [...get().contracts, c];
    persistence.saveContracts(updated);
    set({ contracts: updated });
    return c;
  },

  updateContractField(contractId, fieldId, value) {
    const cs = get().contracts.map((c) => {
      if (c.id !== contractId) return c;
      if (c.status === 'Locked' || c.status === 'Revoked') return c;
      const fields = c.fields.map((f) =>
        f.id === fieldId ? { ...f, value } : f
      );
      const updatedC = { ...c, fields, updatedAt: new Date().toISOString() };
      return updatedC;
    });
    persistence.saveContracts(cs);
    set({ contracts: cs });
  },

  transitionContract(contractId, target) {
    const cs = get().contracts.slice();
    const idx = cs.findIndex((c) => c.id === contractId);
    if (idx === -1) return false;
    const current = cs[idx].status;
    if (!canTransition(current, target)) return false;
    cs[idx] = {
      ...cs[idx],
      status: target,
      updatedAt: new Date().toISOString(),
    };
    if (target === 'Signed') cs[idx].signedAt = new Date().toISOString();
    if (target === 'Revoked') cs[idx].revokedAt = new Date().toISOString();
    persistence.saveContracts(cs);
    set({ contracts: cs });
    return true;
  },

  seedIfEmpty() {
    const bs = persistence.loadBlueprints();
    const cs = persistence.loadContracts();
    if (bs.length === 0) {
      const sampleBlueprint = {
        id: uuid(),
        name: 'Employment Agreement',
        createdAt: new Date().toISOString(),
        fields: [
          {
            id: uuid(),
            type: 'text' as const,
            label: 'Employee Name',
            position: { x: 10, y: 10 },
          },
          {
            id: uuid(),
            type: 'date' as const,
            label: 'Start Date',
            position: { x: 10, y: 20 },
          },
          {
            id: uuid(),
            type: 'signature' as const,
            label: 'Employee Signature',
            position: { x: 10, y: 60 },
            width: 60,
          },
        ],
      };
      persistence.saveBlueprints([sampleBlueprint]);
      set({ blueprints: [sampleBlueprint] });
    } else {
      set({ blueprints: bs });
    }

    if (cs.length === 0) {
      persistence.saveContracts([]);
      set({ contracts: [] });
    } else {
      set({ contracts: cs });
    }
  },
}));
