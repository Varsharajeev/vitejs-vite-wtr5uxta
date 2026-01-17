import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Link } from 'react-router-dom';
import StatusBadge from '../../components/StatusBadge';

export default function ContractList() {
  const { contracts, transitionContract } = useStore((s) => ({
    contracts: s.contracts,
    transitionContract: s.transitionContract,
  }));
  const [filter, setFilter] = useState<'All' | 'Active' | 'Pending' | 'Signed'>(
    'All'
  );

  function matches(c: any) {
    if (filter === 'All') return true;
    if (filter === 'Active')
      return ['Created', 'Approved', 'Sent'].includes(c.status);
    if (filter === 'Pending')
      return (
        ['Created', 'Approved', 'Sent'].includes(c.status) &&
        !!c.updatedAt === false
      );
    if (filter === 'Signed')
      return c.status === 'Signed' || c.status === 'Locked';
    return true;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-semibold">Contracts</h1>
          <div className="text-sm text-gray-500">List and manage contracts</div>
        </div>
        <Link
          to="/contracts/new"
          className="px-3 py-1 rounded bg-indigo-600 text-white"
        >
          New Contract
        </Link>
      </div>

      <div className="bg-white p-4 rounded shadow-sm">
        <div className="mb-3 flex gap-2">
          <button
            onClick={() => setFilter('All')}
            className={`px-2 py-1 rounded ${
              filter === 'All' ? 'bg-indigo-50 text-indigo-600' : 'bg-gray-50'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('Active')}
            className={`px-2 py-1 rounded ${
              filter === 'Active'
                ? 'bg-indigo-50 text-indigo-600'
                : 'bg-gray-50'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('Pending')}
            className={`px-2 py-1 rounded ${
              filter === 'Pending'
                ? 'bg-indigo-50 text-indigo-600'
                : 'bg-gray-50'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter('Signed')}
            className={`px-2 py-1 rounded ${
              filter === 'Signed'
                ? 'bg-indigo-50 text-indigo-600'
                : 'bg-gray-50'
            }`}
          >
            Signed
          </button>
        </div>

        <table className="w-full text-left">
          <thead>
            <tr className="text-sm text-gray-500">
              <th className="py-2">Name</th>
              <th>Blueprint</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contracts.filter(matches).map((c) => (
              <tr key={c.id} className="border-t">
                <td className="py-2">
                  <Link to={`/contracts/${c.id}`} className="text-indigo-600">
                    {c.name}
                  </Link>
                </td>
                <td>{c.blueprintName}</td>
                <td>
                  <StatusBadge status={c.status} />
                </td>
                <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                <td>
                  <div className="flex gap-2">
                    <Link
                      to={`/contracts/${c.id}`}
                      className="px-2 py-1 rounded bg-gray-100"
                    >
                      View
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
            {contracts.filter(matches).length === 0 && (
              <tr>
                <td colSpan={5} className="py-4 text-gray-500">
                  No contracts
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
