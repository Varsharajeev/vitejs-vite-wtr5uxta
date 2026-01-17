import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { v4 as uuid } from 'uuid';
import { BlueprintField } from '../../types';
import { useNavigate } from 'react-router-dom';

function Canvas({
  fields,
  onClick,
}: {
  fields: BlueprintField[];
  onClick: (pos: { x: number; y: number }) => void;
}) {
  return (
    <div className="border rounded bg-white h-[420px] relative">
      <div className="absolute inset-0">
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <div
            className="w-full h-full"
            onClick={(e) => {
              const rect = (e.target as HTMLElement).getBoundingClientRect();
              const x = (((e as any).clientX - rect.left) / rect.width) * 100;
              const y = (((e as any).clientY - rect.top) / rect.height) * 100;
              onClick({
                x: Math.max(0, Math.min(100, x)),
                y: Math.max(0, Math.min(100, y)),
              });
            }}
          />
          {fields.map((f) => (
            <div
              key={f.id}
              style={{
                position: 'absolute',
                left: `${f.position.x}%`,
                top: `${f.position.y}%`,
                transform: 'translate(-0%, -0%)',
              }}
              className="bg-indigo-50 text-indigo-800 text-xs px-2 py-1 rounded border"
            >
              {f.label} ({f.type})
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function NewBlueprint() {
  const addBlueprint = useStore((s) => s.addBlueprint);
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [fields, setFields] = useState<BlueprintField[]>([]);
  const [addingAt, setAddingAt] = useState<{ x: number; y: number } | null>(
    null
  );
  const [fieldDraft, setFieldDraft] = useState<{ type: any; label: string }>({
    type: 'text',
    label: '',
  });

  function placeField(pos: { x: number; y: number }) {
    setAddingAt(pos);
    setFieldDraft({ type: 'text', label: '' });
  }

  function confirmAdd() {
    if (!addingAt) return;
    const f: BlueprintField = {
      id: uuid(),
      type: fieldDraft.type,
      label: fieldDraft.label || `Field ${fields.length + 1}`,
      position: addingAt,
    };
    setFields((s) => [...s, f]);
    setAddingAt(null);
  }

  function save() {
    if (!name) {
      alert('Please enter a blueprint name');
      return;
    }
    addBlueprint({ name, fields });
    navigate('/blueprints');
  }

  return (
    <div>
      <header className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Create Blueprint</h1>
          <p className="text-sm text-gray-500">
            Click on the canvas to place a field
          </p>
        </div>
      </header>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Blueprint name"
            className="w-full p-2 rounded border mb-3"
          />
          <Canvas fields={fields} onClick={placeField} />
          {addingAt && (
            <div className="mt-3 p-3 bg-white border rounded">
              <div className="text-sm font-medium mb-2">Place Field</div>
              <div className="flex gap-2">
                <select
                  value={fieldDraft.type}
                  onChange={(e) =>
                    setFieldDraft({ ...fieldDraft, type: e.target.value })
                  }
                  className="p-2 border rounded"
                >
                  <option value="text">Text</option>
                  <option value="date">Date</option>
                  <option value="signature">Signature</option>
                  <option value="checkbox">Checkbox</option>
                </select>
                <input
                  value={fieldDraft.label}
                  onChange={(e) =>
                    setFieldDraft({ ...fieldDraft, label: e.target.value })
                  }
                  placeholder="Label"
                  className="p-2 border rounded"
                />
                <button
                  onClick={confirmAdd}
                  className="px-3 py-1 rounded bg-indigo-600 text-white"
                >
                  Add
                </button>
                <button
                  onClick={() => setAddingAt(null)}
                  className="px-3 py-1 rounded bg-gray-100"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        <aside className="bg-white p-4 rounded shadow-sm">
          <div className="text-sm text-gray-500 mb-2">Fields</div>
          <div className="space-y-2">
            {fields.map((f) => (
              <div
                key={f.id}
                className="p-2 border rounded text-sm flex justify-between items-center"
              >
                <div>
                  <div className="font-medium">{f.label}</div>
                  <div className="text-xs text-gray-400">{f.type}</div>
                </div>
              </div>
            ))}
            {fields.length === 0 && (
              <div className="text-sm text-gray-400">
                No fields yet. Click on canvas to add.
              </div>
            )}
          </div>

          <div className="mt-4 flex gap-2">
            <button
              onClick={save}
              className="px-3 py-1 rounded bg-green-600 text-white"
            >
              Save Blueprint
            </button>
            <button
              onClick={() => window.history.back()}
              className="px-3 py-1 rounded bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
