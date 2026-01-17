import React from 'react';
import ContractList from '../features/contracts/ContractList';

export default function ContractsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <header>
        <h1 className="text-2xl font-semibold text-slate-900">
          Contracts
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          View and manage all your contracts in one place
        </p>
      </header>

      {/* Contracts List */}
      <section className="bg-white rounded-xl border border-slate-200 p-5">
        <ContractList />
      </section>
    </div>
  );
}

