import React from 'react';
import SignaturePad from './SignaturePad';
import { ContractField } from '../types';

export default function FieldRenderer({
  field,
  onChange,
  readOnly,
}: {
  field: ContractField;
  onChange: (value: any) => void;
  readOnly?: boolean;
}) {
  const baseClass = 'p-2 border rounded bg-white';
  switch (field.type) {
    case 'text':
      return (
        <input
          value={String(field.value ?? '')}
          onChange={(e) => onChange(e.target.value)}
          className={baseClass}
          disabled={readOnly}
        />
      );
    case 'date':
      return (
        <input
          type="date"
          value={String(field.value ?? '')}
          onChange={(e) => onChange(e.target.value)}
          className={baseClass}
          disabled={readOnly}
        />
      );
    case 'checkbox':
      return (
        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            checked={Boolean(field.value)}
            onChange={(e) => onChange(e.target.checked)}
            disabled={readOnly}
          />
          <span>{field.label}</span>
        </label>
      );
    case 'signature':
      if (readOnly) {
        return field.value ? (
          // render image
          // eslint-disable-next-line jsx-a11y/img-redundant-alt
          <img src={String(field.value)} alt="signature" className="max-h-24" />
        ) : (
          <div className="italic text-gray-400">No signature</div>
        );
      }
      return (
        <SignaturePad
          value={typeof field.value === 'string' ? field.value : undefined}
          onChange={(dataUrl) => {
            onChange(dataUrl ?? '');
          }}
        />
      );
    default:
      return null;
  }
}
