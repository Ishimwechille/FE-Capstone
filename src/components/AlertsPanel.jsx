/**
 * Alerts Panel Component
 * Displays unread alerts with ability to mark as read
 * Triggers notifications on every action
 */

import { useEffect, useState } from 'react';
import { useReportStore } from '../store/reportStore';
import { useNotificationTrigger } from '../hooks/useNotificationTrigger';

export default function AlertsPanel() {
  const { unreadAlerts, fetchUnreadAlerts, markAlertAsRead, markAllAlertsAsRead, isLoading } = useReportStore();
  const { notifyAlertMarkedRead, notifyAllAlertsMarkedRead } = useNotificationTrigger();
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const loadAlerts = async () => {
      try {
        await fetchUnreadAlerts();
      } catch (error) {
        console.error('Error loading alerts:', error);
      }
    };

    loadAlerts();
    // Refresh alerts every 30 seconds
    const interval = setInterval(loadAlerts, 30000);
    return () => clearInterval(interval);
  }, [fetchUnreadAlerts]);

  const handleMarkAsRead = async (id, e) => {
    e.stopPropagation();
    try {
      await markAlertAsRead(id);
      await notifyAlertMarkedRead();
    } catch (error) {
      console.error('Error marking alert as read:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    if (!window.confirm('Mark all alerts as read?')) return;
    try {
      const count = unreadAlerts.length;
      await markAllAlertsAsRead();
      await notifyAllAlertsMarkedRead(count);
    } catch (error) {
      console.error('Error marking all alerts as read:', error);
    }
  };

  const alertTypeColors = {
    danger: 'bg-red-50 border-red-200 text-red-800',
    success: 'bg-green-50 border-green-200 text-green-800',
    tip: 'bg-blue-50 border-blue-200 text-blue-800',
    info: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  };

  const alertIcons = {
    danger: '🔴',
    success: '🟢',
    tip: '💡',
    info: 'ℹ️',
  };

  const displayedAlerts = showAll ? unreadAlerts : unreadAlerts.slice(0, 5);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Alerts</h2>
          {unreadAlerts.length > 0 && (
            <p className="text-sm text-gray-600">{unreadAlerts.length} new notification{unreadAlerts.length !== 1 ? 's' : ''}</p>
          )}
        </div>
        {unreadAlerts.length > 0 && (
          <button
            onClick={handleMarkAllAsRead}
            disabled={isLoading}
            className="text-xs font-medium text-blue-600 hover:text-blue-900 disabled:opacity-50"
          >
            Mark all as read
          </button>
        )}
      </div>

      {unreadAlerts.length > 0 ? (
        <>
          <div className="space-y-3">
            {displayedAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`border rounded-lg p-3 cursor-pointer hover:shadow transition ${alertTypeColors[alert.alert_type] || alertTypeColors.info}`}
                onClick={(e) => handleMarkAsRead(alert.id, e)}
              >
                <div className="flex items-start gap-3">
                  <span className="text-lg flex-shrink-0 mt-0.5">
                    {alertIcons[alert.alert_type] || 'ℹ️'}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm leading-tight">{alert.title}</p>
                    <p className="text-xs mt-1 opacity-90 break-words">{alert.message}</p>
                    <p className="text-xs opacity-75 mt-1">
                      {new Date(alert.created_at).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={(e) => handleMarkAsRead(alert.id, e)}
                    disabled={isLoading}
                    className="flex-shrink-0 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                    title="Mark as read"
                  >
                    ✓
                  </button>
                </div>
              </div>
            ))}
          </div>

          {unreadAlerts.length > 5 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="mt-3 text-sm font-medium text-blue-600 hover:text-blue-900"
            >
              {showAll ? 'Show less' : `Show ${unreadAlerts.length - 5} more`}
            </button>
          )}
        </>
      ) : (
        <p className="text-gray-600 text-center py-8">No alerts - You're all caught up! 🎉</p>
      )}
    </div>
  );
}
