import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';

export default function BlueprintsPage() {
  const { blueprints, deleteBlueprint } = useStore((s) => ({
    blueprints: s.blueprints,
    deleteBlueprint: s.deleteBlueprint,
  }));

  return (
    <div>
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Blueprints</h1>
          <p className="text-sm text-gray-500">Reusable contract templates</p>
        </div>
        <Link
          to="/blueprints/new"
          className="px-3 py-1 rounded bg-indigo-600 text-white"
        >
          New Blueprint
        </Link>
      </header>

      <div className="grid grid-cols-2 gap-4">
        {blueprints.map((bp) => (
          <div key={bp.id} className="bg-white p-4 rounded shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-medium">{bp.name}</div>
                <div className="text-sm text-gray-500">
                  Fields: {bp.fields.length}
                </div>
                <div className="text-xs text-gray-400 mt-2">
                  Created: {new Date(bp.createdAt).toLocaleString()}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  className="px-2 py-1 rounded bg-red-50 text-red-700"
                  onClick={() => deleteBlueprint(bp.id)}
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="mt-4 p-2 border rounded">
              <div className="text-sm font-medium mb-2">Preview</div>
              <div className="bg-gray-50 p-4 rounded">
                {bp.fields.map((f) => (
                  <div key={f.id} className="text-sm text-gray-600">
                    • {f.label}{' '}
                    <span className="text-xs text-gray-400">({f.type})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
        {blueprints.length === 0 && (
          <div className="col-span-2 text-gray-500">
            No blueprints yet. Create one to get started.
          </div>
        )}
      </div>
    </div>
  );
}
