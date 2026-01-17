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
    <div className="space-y-8">
      {/* Header */}
      <header>
        <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">
          Overview of contracts and blueprints
        </p>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Contracts */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 hover:shadow-md transition">
          <div className="text-sm text-slate-500">Total Contracts</div>
          <div className="text-3xl font-semibold mt-2">{total}</div>
        </div>

        {/* Statuses */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 hover:shadow-md transition">
          <div className="text-sm text-slate-500 mb-3">Statuses</div>
          <div className="flex flex-wrap gap-3">
            {Object.entries(byStatus).length === 0 ? (
              <span className="text-sm text-slate-400">No data yet</span>
            ) : (
              Object.entries(byStatus).map(([k, v]) => (
                <div key={k} className="flex items-center gap-2">
                  <StatusBadge status={k as any} />
                  <span className="text-sm font-medium">{v}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 hover:shadow-md transition">
          <div className="text-sm text-slate-500 mb-3">Quick Actions</div>
          <div className="flex gap-3">
            <Link
              to="/blueprints/new"
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition"
            >
              New Blueprint
            </Link>
            <Link
              to="/contracts/new"
              className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition"
            >
              New Contract
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Contracts */}
      <section className="bg-white rounded-xl p-5 border border-slate-200">
        <h2 className="font-semibold text-slate-900 mb-4">
          Recent Contracts
        </h2>

        {contracts.length === 0 ? (
          <div className="text-sm text-slate-500">
            No contracts yet — create your first contract to get started.
          </div>
        ) : (
          <ul className="divide-y divide-slate-100">
            {contracts
              .slice()
              .reverse()
              .slice(0, 5)
              .map((c) => (
                <li
                  key={c.id}
                  className="py-3 flex items-center justify-between"
                >
                  <div>
                    <div className="font-medium text-slate-900">
                      {c.name}
                    </div>
                    <div className="text-sm text-slate-500">
                      {c.blueprintName}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <StatusBadge status={c.status} />
                    <Link
                      to={`/contracts/${c.id}`}
                      className="text-sm font-medium text-indigo-600 hover:underline"
                    >
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

