import React from 'react';
import { ContractStatus } from '../types';

const mapColor: Record<ContractStatus, string> = {
  Created: 'bg-yellow-100 text-yellow-800',
  Approved: 'bg-blue-100 text-blue-800',
  Sent: 'bg-indigo-100 text-indigo-800',
  Signed: 'bg-green-100 text-green-800',
  Locked: 'bg-gray-200 text-gray-800',
  Revoked: 'bg-red-100 text-red-800',
};

export default function StatusBadge({ status }: { status: ContractStatus }) {
  return (
    <span
      className={`px-2 py-0.5 rounded text-sm font-medium ${mapColor[status]}`}
    >
      {status}
    </span>
  );
}
