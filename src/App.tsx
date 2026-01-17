import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import BlueprintsPage from './pages/BlueprintsPage';
import ContractsPage from './pages/ContractsPage';
import NewBlueprint from './features/blueprints/NewBlueprint';
import NewContract from './features/contracts/NewContract';
import ContractView from './features/contracts/ContractView';
import { useInitSeed } from './store/initSeed';
import Navbar from './components/Navbar';

export default function App() {
  useInitSeed();

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/blueprints" element={<BlueprintsPage />} />
          <Route path="/blueprints/new" element={<NewBlueprint />} />
          <Route path="/contracts" element={<ContractsPage />} />
          <Route path="/contracts/new" element={<NewContract />} />
          <Route path="/contracts/:id" element={<ContractView />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </div>
    </div>
  );
}
