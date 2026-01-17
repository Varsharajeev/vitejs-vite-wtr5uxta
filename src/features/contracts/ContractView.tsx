import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import FieldRenderer from '../../components/FieldRenderer';
import StatusBadge from '../../components/StatusBadge';
import { allowedNextStatuses } from '../../state/stateMachine';

export default function ContractView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { contracts, updateContractField, transitionContract } = useStore(
    (s) => ({
      contracts: s.contracts,
      updateContractField: s.updateContractField,
      transitionContract: s.transitionContract,
    })
  );
  const contract = contracts.find((c) => c.id === id);
  if (!contract) return <div>Contract not found</div>;

  const nextStatuses = allowedNextStatuses(contract.status);

  function onAction(target: any) {
    if (target === 'Revoked') {
      if (
        !confirm(
          'Are you sure you want to revoke this contract? This cannot be undone.'
        )
      )
        return;
    }
    const ok = transitionContract(contract.id, target);
    if (!ok) alert('Invalid transition');
  }

  return (
    <div>
      <header className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{contract.name}</h1>
          <div className="text-sm text-gray-500">{contract.blueprintName}</div>
        </div>
        <div className="flex items-center gap-4">
          <StatusBadge status={contract.status} />
          <button
            onClick={() => navigate('/contracts')}
            className="px-3 py-1 rounded bg-gray-100"
          >
            Back
          </button>
        </div>
      </header>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 bg-white p-4 rounded shadow-sm">
          <div className="mb-3 text-sm text-gray-500">Fill fields</div>
          <div className="space-y-4">
            {contract.fields.map((f) => (
              <div key={f.id} className="p-3 border rounded">
                <div className="mb-2 font-medium">{f.label}</div>
                <FieldRenderer
                  field={f}
                  onChange={(v) => updateContractField(contract.id, f.id, v)}
                  readOnly={
                    contract.status === 'Locked' ||
                    contract.status === 'Revoked'
                  }
                />
              </div>
            ))}
          </div>
        </div>

        <aside className="bg-white p-4 rounded shadow-sm">
          <div className="text-sm text-gray-500 mb-3">Lifecycle</div>

          <div className="space-y-2 mb-4">
            <div className="text-xs text-gray-400">Created:</div>
            <div className="text-sm">
              {new Date(contract.createdAt).toLocaleString()}
            </div>
            {contract.signedAt && (
              <>
                <div className="text-xs text-gray-400 mt-2">Signed At:</div>
                <div className="text-sm">
                  {new Date(contract.signedAt).toLocaleString()}
                </div>
              </>
            )}
            {contract.revokedAt && (
              <>
                <div className="text-xs text-gray-400 mt-2">Revoked At:</div>
                <div className="text-sm">
                  {new Date(contract.revokedAt).toLocaleString()}
                </div>
              </>
            )}
          </div>

          <div className="text-sm text-gray-600 mb-2">Available actions</div>
          <div className="flex flex-col gap-2">
            {nextStatuses.length === 0 && (
              <div className="text-sm text-gray-500">No actions available</div>
            )}
            {nextStatuses.map((ns) => (
              <button
                key={ns}
                onClick={() => onAction(ns)}
                className="px-3 py-1 rounded bg-indigo-600 text-white"
              >
                Mark as {ns}
              </button>
            ))}
            {/* allow revoke when applicable */}
            {(['Created', 'Sent'] as const).includes(contract.status) && (
              <button
                onClick={() => onAction('Revoked')}
                className="px-3 py-1 rounded bg-red-600 text-white"
              >
                Revoke
              </button>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
