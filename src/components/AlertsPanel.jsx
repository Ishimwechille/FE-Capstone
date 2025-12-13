/**
 * Alerts Panel Component
 */

import { useEffect } from 'react';
import { useReportStore } from '../store/reportStore';

export default function AlertsPanel() {
  const { alerts, fetchAlerts } = useReportStore();

  useEffect(() => {
    fetchAlerts({ is_read: false });
  }, []);

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

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Alerts</h2>
      {alerts.length > 0 ? (
        <div className="space-y-3">
          {alerts.slice(0, 5).map((alert) => (
            <div
              key={alert.id}
              className={`border rounded-lg p-3 ${alertTypeColors[alert.alert_type] || alertTypeColors.info}`}
            >
              <div className="flex items-start gap-2">
                <span className="text-lg flex-shrink-0">
                  {alertIcons[alert.alert_type] || 'ℹ️'}
                </span>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{alert.title}</p>
                  <p className="text-xs mt-1 opacity-90">{alert.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center py-8">No alerts</p>
      )}
    </div>
  );
}
