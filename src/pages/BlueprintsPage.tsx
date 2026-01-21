import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';

export default function BlueprintsPage() {
  const { blueprints, deleteBlueprint } = useStore((s) => ({
    blueprints: s.blueprints,
    deleteBlueprint: s.deleteBlueprint,
  }));

  return (
    <div className="space-y-8 py-2">
      {/* Page Header */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            Blueprints
          </h1>
          <p className="text-base text-slate-500 mt-2">
            Reusable contract templates
          </p>
        </div>

        <Link
          to="/blueprints/new"
          className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg transition-all"
        >
          New Blueprint
        </Link>
      </header>

      {/* Blueprints Grid */}
      {blueprints.length === 0 ? (
        <div className="bg-white/80 backdrop-blur rounded-2xl border border-blue-100/50 p-12 text-center shadow-sm">
          <div className="text-slate-500 text-lg">
            No blueprints yet — create one to start generating contracts.
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blueprints.map((bp) => (
            <div
              key={bp.id}
              className="bg-white/80 backdrop-blur rounded-2xl border border-blue-100/50 p-6 hover:shadow-lg hover:border-blue-200/50 transition-all duration-300"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="font-bold text-lg text-slate-800">
                    {bp.name}
                  </div>
                  <div className="text-sm text-slate-500 mt-1">
                    {bp.fields.length} field{bp.fields.length !== 1 ? 's' : ''}
                  </div>
                  <div className="text-xs text-slate-400 mt-2">
                    Created {new Date(bp.createdAt).toLocaleDateString()}
                  </div>
                </div>

                <button
                  onClick={() => deleteBlueprint(bp.id)}
                  className="text-sm font-medium text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1 rounded-lg transition-colors"
                >
                  Delete
                </button>
              </div>

              {/* Preview */}
              <div className="border border-blue-100 rounded-xl p-4 bg-gradient-to-br from-blue-50 to-white">
                <div className="text-sm font-semibold text-slate-700 mb-3">
                  Preview
                </div>

                <div className="space-y-2">
                  {bp.fields.length === 0 ? (
                    <div className="text-sm text-slate-400 italic">No fields</div>
                  ) : (
                    bp.fields.map((f) => (
                      <div
                        key={f.id}
                        className="text-sm text-slate-600 flex items-center gap-2"
                      >
                        <span className="text-blue-400">•</span>
                        <span>{f.label}</span>
                        <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                          {f.type}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

