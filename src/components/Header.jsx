/**
 * Header Component
 * Top navigation bar with user menu and notifications
 */

import { useAuthStore } from '../store/authStore';
import { useReportStore } from '../store/reportStore';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Header({ onMenuClick }) {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { alerts, fetchAlerts, getUnreadCount } = useReportStore();

  useEffect(() => {
    fetchAlerts({ is_read: false });
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const unreadCount = getUnreadCount();

  return (
    <header className="bg-white shadow h-16 flex items-center justify-between px-6">
      {/* Left side - Menu & Title */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="text-gray-600 hover:text-gray-900 focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 className="text-xl font-bold text-gray-900">Advanced Financial Navigator</h1>
      </div>

      {/* Right side - Notifications & User Menu */}
      <div className="flex items-center gap-6">
        {/* Notifications */}
        <div className="relative">
          <button className="relative p-2 text-gray-600 hover:text-gray-900">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                {unreadCount}
              </span>
            )}
          </button>
        </div>

        {/* User Menu */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">{user?.username || 'User'}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
