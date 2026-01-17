import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';

export default function BlueprintsPage() {
  const { blueprints, deleteBlueprint } = useStore((s) => ({
    blueprints: s.blueprints,
    deleteBlueprint: s.deleteBlueprint,
  }));

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Blueprints
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Reusable contract templates
          </p>
        </div>

        <Link
          to="/blueprints/new"
          className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition"
        >
          New Blueprint
        </Link>
      </header>

      {/* Blueprints Grid */}
      {blueprints.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-6 text-sm text-slate-500">
          No blueprints yet — create one to start generating contracts.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blueprints.map((bp) => (
            <div
              key={bp.id}
              className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-medium text-slate-900">
                    {bp.name}
                  </div>
                  <div className="text-sm text-slate-500 mt-1">
                    {bp.fields.length} fields
                  </div>
                  <div className="text-xs text-slate-400 mt-2">
                    Created {new Date(bp.createdAt).toLocaleString()}
                  </div>
                </div>

                <button
                  onClick={() => deleteBlueprint(bp.id)}
                  className="text-sm font-medium text-red-600 hover:text-red-700"
                >
                  Delete
                </button>
              </div>

              {/* Preview */}
              <div className="mt-4 border border-slate-200 rounded-lg p-3">
                <div className="text-sm font-medium text-slate-700 mb-2">
                  Preview
                </div>

                <div className="bg-slate-50 rounded p-3 space-y-1">
                  {bp.fields.map((f) => (
                    <div
                      key={f.id}
                      className="text-sm text-slate-600"
                    >
                      • {f.label}{' '}
                      <span className="text-xs text-slate-400">
                        ({f.type})
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

