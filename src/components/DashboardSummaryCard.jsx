/**
 * Dashboard Summary Card Component
 */

export default function DashboardSummaryCard({ title, amount, icon, color, subtitle }) {
  const colorClasses = {
    green: 'bg-green-50 border-green-200',
    red: 'bg-red-50 border-red-200',
    blue: 'bg-blue-50 border-blue-200',
    purple: 'bg-purple-50 border-purple-200',
  };

  const textColors = {
    green: 'text-green-600',
    red: 'text-red-600',
    blue: 'text-blue-600',
    purple: 'text-purple-600',
  };

  const isNumeric = typeof amount === 'number' && !Number.isNaN(amount);

  return (
    <div className={`${colorClasses[color] || colorClasses.blue} border rounded-lg p-6`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className={`text-3xl font-bold mt-2 ${textColors[color]}`}>
            {isNumeric ? `$${amount.toFixed(2)}` : amount}
          </p>
          {subtitle && <p className="text-gray-600 text-xs mt-1">{subtitle}</p>}
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </div>
  );
}
