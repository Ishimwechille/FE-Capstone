/**
 * Notification Center Component
 * Displays real-time notifications with dismissal and actions
 */

import { useEffect, useState } from 'react';
import { useReportStore } from '../store/reportStore';

export default function NotificationCenter() {
  const { unreadAlerts, fetchUnreadAlerts, markAlertAsRead } = useReportStore();
  const [visibleNotifications, setVisibleNotifications] = useState([]);

  useEffect(() => {
    const loadAlerts = async () => {
      try {
        await fetchUnreadAlerts();
      } catch (error) {
        console.error('Error fetching alerts:', error);
      }
    };

    loadAlerts();
    // Refresh every 20 seconds
    const interval = setInterval(loadAlerts, 20000);
    return () => clearInterval(interval);
  }, [fetchUnreadAlerts]);

  // Show new alerts as notifications
  useEffect(() => {
    const newAlerts = unreadAlerts.filter(
      (alert) => !visibleNotifications.find((n) => n.id === alert.id)
    );

    if (newAlerts.length > 0) {
      setVisibleNotifications((prev) => [...prev, ...newAlerts]);

      // Auto-dismiss after 5 seconds
      newAlerts.forEach((alert) => {
        setTimeout(() => {
          dismissNotification(alert.id);
        }, 5000);
      });
    }
  }, [unreadAlerts]);

  const dismissNotification = async (id) => {
    setVisibleNotifications((prev) => prev.filter((n) => n.id !== id));
    try {
      await markAlertAsRead(id);
    } catch (error) {
      console.error('Error dismissing notification:', error);
    }
  };

  const alertColors = {
    danger: 'bg-red-500',
    success: 'bg-green-500',
    tip: 'bg-blue-500',
    info: 'bg-yellow-500',
  };

  const alertIcons = {
    danger: '🔴',
    success: '✅',
    tip: '💡',
    info: 'ℹ️',
  };

  if (visibleNotifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 max-w-sm">
      {visibleNotifications.map((notification) => (
        <div
          key={notification.id}
          className={`${alertColors[notification.alert_type] || alertColors.info} text-white rounded-lg shadow-lg p-4 animate-in fade-in slide-in-from-top-4 duration-300`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <span className="text-xl flex-shrink-0 mt-0.5">
                {alertIcons[notification.alert_type] || 'ℹ️'}
              </span>
              <div>
                <p className="font-semibold text-sm">{notification.title}</p>
                <p className="text-xs opacity-90 mt-1">{notification.message}</p>
              </div>
            </div>
            <button
              onClick={() => dismissNotification(notification.id)}
              className="flex-shrink-0 text-white/70 hover:text-white ml-2"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
