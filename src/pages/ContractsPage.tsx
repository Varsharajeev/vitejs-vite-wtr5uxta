import React from 'react';
import ContractList from '../features/contracts/ContractList';

export default function ContractsPage() {
  return (
    <div className="space-y-8 py-2">
      {/* Page Header */}
      <header>
        <h1 className="text-4xl font-bold text-slate-800">
          Contracts
        </h1>
        <p className="text-base text-slate-500 mt-2">
          View and manage all your contracts in one place
        </p>
      </header>

      {/* Contracts List */}
      <section className="bg-white/80 backdrop-blur rounded-2xl border border-blue-100/50 p-6 shadow-sm hover:shadow-md transition-all">
        <ContractList />
      </section>
    </div>
  );
}

