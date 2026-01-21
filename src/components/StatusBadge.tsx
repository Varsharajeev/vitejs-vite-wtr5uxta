import React from 'react';
import { ContractStatus } from '../types';

const mapColor: Record<ContractStatus, string> = {
  Created: 'bg-amber-100 text-amber-700 border border-amber-200',
  Approved: 'bg-blue-100 text-blue-700 border border-blue-200',
  Sent: 'bg-sky-100 text-sky-700 border border-sky-200',
  Signed: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
  Locked: 'bg-slate-100 text-slate-700 border border-slate-200',
  Revoked: 'bg-rose-100 text-rose-700 border border-rose-200',
};

export default function StatusBadge({ status }: { status: ContractStatus }) {
  return (
    <span
      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${mapColor[status]}`}
    >
      {status}
    </span>
  );
}
