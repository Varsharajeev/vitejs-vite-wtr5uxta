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
    <div className="space-y-8 py-2">
      {/* Header */}
      <header>
        <h1 className="text-4xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-base text-slate-500 mt-2">
          Overview of contracts and blueprints
        </p>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Contracts */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-6 border border-blue-200/50 hover:shadow-lg transition-all duration-300">
          <div className="text-sm font-medium text-blue-600">Total Contracts</div>
          <div className="text-4xl font-bold mt-3 text-slate-800">{total}</div>
          <div className="mt-4 h-1 w-12 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full"></div>
        </div>

        {/* Statuses */}
        <div className="bg-gradient-to-br from-teal-50 to-teal-100/50 rounded-2xl p-6 border border-teal-200/50 hover:shadow-lg transition-all duration-300">
          <div className="text-sm font-medium text-teal-600 mb-3">Statuses</div>
          <div className="flex flex-wrap gap-3">
            {Object.entries(byStatus).length === 0 ? (
              <span className="text-sm text-slate-500">No data yet</span>
            ) : (
              Object.entries(byStatus).map(([k, v]) => (
                <div key={k} className="flex items-center gap-2">
                  <StatusBadge status={k as any} />
                  <span className="text-sm font-semibold text-slate-700">{v}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-br from-rose-50 to-rose-100/50 rounded-2xl p-6 border border-rose-200/50 hover:shadow-lg transition-all duration-300">
          <div className="text-sm font-medium text-rose-600 mb-3">Quick Actions</div>
          <div className="flex flex-col gap-2">
            <Link
              to="/blueprints/new"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg transition-all text-center"
            >
              New Blueprint
            </Link>
            <Link
              to="/contracts/new"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-teal-500 to-teal-600 text-white text-sm font-medium hover:from-teal-600 hover:to-teal-700 shadow-md hover:shadow-lg transition-all text-center"
            >
              New Contract
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Contracts */}
      <section className="bg-white/80 backdrop-blur rounded-2xl p-6 border border-blue-100/50 shadow-sm hover:shadow-md transition-all">
        <h2 className="text-2xl font-bold text-slate-800 mb-5">
          Recent Contracts
        </h2>

        {contracts.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-base text-slate-500">
              No contracts yet — create your first contract to get started.
            </div>
          </div>
        ) : (
          <ul className="divide-y divide-blue-50">
            {contracts
              .slice()
              .reverse()
              .slice(0, 5)
              .map((c) => (
                <li
                  key={c.id}
                  className="py-4 flex items-center justify-between hover:bg-blue-50/50 px-3 rounded-lg transition-colors"
                >
                  <div>
                    <div className="font-semibold text-slate-800">
                      {c.name}
                    </div>
                    <div className="text-sm text-slate-500 mt-1">
                      {c.blueprintName}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <StatusBadge status={c.status} />
                    <Link
                      to={`/contracts/${c.id}`}
                      className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline transition-colors"
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

