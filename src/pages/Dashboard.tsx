import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import StatusBadge from '../components/StatusBadge';

export default function Dashboard() {
  const { contracts } = useStore((s) => ({ contracts: s.contracts }));
  const total = contracts.length;
  const byStatus = contracts.reduce<Record<string, number>>((acc, c) => {
    acc[c.status] = (acc[c.status] || 0) + 1;
    return acc;
  }, {});
  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-gray-600">
          Overview of contracts and blueprints
        </p>
      </header>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow-sm">
          <div className="text-sm text-gray-500">Total Contracts</div>
          <div className="text-2xl font-bold">{total}</div>
        </div>
        <div className="bg-white p-4 rounded shadow-sm">
          <div className="text-sm text-gray-500">Statuses</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {Object.entries(byStatus).map(([k, v]) => (
              <div key={k} className="flex items-center gap-2">
                <StatusBadge status={k as any} />
                <span className="text-sm">{v}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white p-4 rounded shadow-sm">
          <div className="text-sm text-gray-500">Quick Actions</div>
          <div className="mt-3 flex gap-2">
            <Link
              to="/blueprints/new"
              className="px-3 py-1 rounded bg-indigo-600 text-white"
            >
              New Blueprint
            </Link>
            <Link
              to="/contracts/new"
              className="px-3 py-1 rounded bg-green-600 text-white"
            >
              New Contract
            </Link>
          </div>
        </div>
      </div>

      <section className="bg-white p-4 rounded shadow-sm">
        <h2 className="font-medium mb-3">Recent Contracts</h2>
        {contracts.length === 0 ? (
          <div className="text-sm text-gray-500">No contracts yet</div>
        ) : (
          <ul className="space-y-2">
            {contracts
              .slice()
              .reverse()
              .slice(0, 5)
              .map((c) => (
                <li key={c.id} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{c.name}</div>
                    <div className="text-sm text-gray-500">
                      {c.blueprintName}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <StatusBadge status={c.status} />
                    <Link to={`/contracts/${c.id}`} className="text-indigo-600">
                      View
                    </Link>
                  </div>
                </li>
              ))}
          </ul>
        )}
      </section>
    </div>
  );
}
