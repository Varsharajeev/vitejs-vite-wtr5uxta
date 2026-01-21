import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white/70 backdrop-blur-md border-b border-blue-100/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-slate-600 bg-clip-text text-transparent">
            Contract Manager
          </div>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg font-medium transition-all ${
                isActive
                  ? 'bg-blue-100 text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-700 hover:bg-slate-50'
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/blueprints"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg font-medium transition-all ${
                isActive
                  ? 'bg-blue-100 text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-700 hover:bg-slate-50'
              }`
            }
          >
            Blueprints
          </NavLink>
          <NavLink
            to="/contracts"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg font-medium transition-all ${
                isActive
                  ? 'bg-blue-100 text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-700 hover:bg-slate-50'
              }`
            }
          >
            Contracts
          </NavLink>
        </div>
        <div>
          <a
            href="#"
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg transition-all"
          >
            New Contract
          </a>
        </div>
      </div>
    </nav>
  );
}
