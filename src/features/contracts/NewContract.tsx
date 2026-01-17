import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { useNavigate } from 'react-router-dom';

export default function NewContract() {
  const { blueprints, createContractFromBlueprint } = useStore((s) => ({
    blueprints: s.blueprints,
    createContractFromBlueprint: s.createContractFromBlueprint,
  }));
  const [blueprintId, setBlueprintId] = useState<string | null>(
    blueprints[0]?.id ?? null
  );
  const [name, setName] = useState('');
  const navigate = useNavigate();

  function create() {
    if (!blueprintId) {
      alert('Select a blueprint');
      return;
    }
    if (!name) {
      alert('Enter contract name');
      return;
    }
    const c = createContractFromBlueprint(blueprintId, name);
    if (c) navigate(`/contracts/${c.id}`);
  }

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">Create Contract</h1>
        <p className="text-sm text-gray-500">
          Generate a contract from a blueprint
        </p>
      </header>

      <div className="bg-white p-4 rounded shadow-sm max-w-xl">
        <div className="mb-3">
          <label className="text-sm block mb-1">Blueprint</label>
          <select
            value={blueprintId ?? ''}
            onChange={(e) => setBlueprintId(e.target.value)}
            className="w-full p-2 border rounded"
          >
            {blueprints.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="text-sm block mb-1">Contract name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={create}
            className="px-3 py-1 rounded bg-indigo-600 text-white"
          >
            Create
          </button>
          <button
            onClick={() => navigate('/contracts')}
            className="px-3 py-1 rounded bg-gray-100"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
