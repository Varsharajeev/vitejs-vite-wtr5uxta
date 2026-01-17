import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="text-xl font-semibold">Contract Manager</div>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-3 py-1 rounded ${
                isActive
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/blueprints"
            className={({ isActive }) =>
              `px-3 py-1 rounded ${
                isActive
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`
            }
          >
            Blueprints
          </NavLink>
          <NavLink
            to="/contracts"
            className={({ isActive }) =>
              `px-3 py-1 rounded ${
                isActive
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`
            }
          >
            Contracts
          </NavLink>
        </div>
        <div>
          <a
            href="#"
            className="px-3 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-700"
          >
            New Contract
          </a>
        </div>
      </div>
    </nav>
  );
}
