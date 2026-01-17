import { Blueprint, Contract } from '../types';

const BLUEPRINTS_KEY = 'cmp_blueprints_v1';
const CONTRACTS_KEY = 'cmp_contracts_v1';

export const persistence = {
  loadBlueprints(): Blueprint[] {
    try {
      const raw = localStorage.getItem(BLUEPRINTS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  saveBlueprints(list: Blueprint[]) {
    localStorage.setItem(BLUEPRINTS_KEY, JSON.stringify(list));
  },

  loadContracts(): Contract[] {
    try {
      const raw = localStorage.getItem(CONTRACTS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  saveContracts(list: Contract[]) {
    localStorage.setItem(CONTRACTS_KEY, JSON.stringify(list));
  },
};
