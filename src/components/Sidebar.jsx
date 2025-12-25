/**
 * Sidebar Component
 * Navigation menu for app sections
 */

import { Link, useLocation } from 'react-router-dom';

const menuItems = [
  { name: 'Home', path: '/dashboard', icon: '📊' },
  { name: 'Transactions', path: '/transactions', icon: '💳' },
  { name: 'Budgets', path: '/budgets', icon: '💰' },
  { name: 'Goals', path: '/goals', icon: '🎯' },
  { name: 'Reports', path: '/reports', icon: '📈' },
];

export default function Sidebar({ isOpen }) {
  const location = useLocation();

  return (
    <aside
      className={`${
        isOpen ? 'w-64' : 'w-20'
      } bg-gray-800 text-white transition-all duration-300 overflow-y-auto`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-gray-700">
        <span className="text-2xl">{isOpen ? '🚀 AFN' : '🚀'}</span>
      </div>

      {/* Navigation */}
      <nav className="mt-8 space-y-2 px-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-3 rounded transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              <span className="text-xl flex-shrink-0">{item.icon}</span>
              {isOpen && <span className="text-sm font-medium">{item.name}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
