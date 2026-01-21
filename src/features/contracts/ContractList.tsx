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
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Contracts</h3>
          <div className="text-sm text-slate-500 mt-1">List and manage contracts</div>
        </div>
        <Link
          to="/contracts/new"
          className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg transition-all"
        >
          New Contract
        </Link>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2 pb-2">
          {['All', 'Active', 'Pending', 'Signed'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === f
                  ? 'bg-blue-100 text-blue-700 border border-blue-300 shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {contracts.filter(matches).length === 0 ? (
          <div className="text-center py-12">
            <div className="text-slate-500">No contracts found</div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-blue-100 bg-blue-50/50">
                  <th className="px-4 py-3 font-semibold text-slate-700">Name</th>
                  <th className="px-4 py-3 font-semibold text-slate-700">Blueprint</th>
                  <th className="px-4 py-3 font-semibold text-slate-700">Status</th>
                  <th className="px-4 py-3 font-semibold text-slate-700">Created</th>
                  <th className="px-4 py-3 font-semibold text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {contracts.filter(matches).map((c) => (
                  <tr key={c.id} className="border-b border-blue-50 hover:bg-blue-50/50 transition-colors">
                    <td className="px-4 py-3">
                      <Link to={`/contracts/${c.id}`} className="text-blue-600 font-medium hover:text-blue-700 hover:underline">
                        {c.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{c.blueprintName}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={c.status} />
                    </td>
                    <td className="px-4 py-3 text-slate-600">{new Date(c.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      <Link
                        to={`/contracts/${c.id}`}
                        className="px-3 py-1 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 font-medium transition-colors text-xs"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
