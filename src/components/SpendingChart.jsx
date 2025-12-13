/**
 * Spending Chart Component
 * Shows pie chart of spending by category
 */

export default function SpendingChart({ expenses }) {
  // Group expenses by category
  const categorySpending = {};
  expenses.forEach((expense) => {
    const category = expense.category_name || 'Uncategorized';
    categorySpending[category] = (categorySpending[category] || 0) + parseFloat(expense.amount || 0);
  });

  const categories = Object.keys(categorySpending);
  const amounts = Object.values(categorySpending);
  const total = amounts.reduce((sum, a) => sum + a, 0);

  return (
    <div>
      {amounts.length > 0 ? (
        <div className="space-y-4">
          {categories.map((category, index) => {
            const percentage = (categorySpending[category] / total) * 100;
            const colors = [
              'bg-red-500',
              'bg-blue-500',
              'bg-green-500',
              'bg-yellow-500',
              'bg-purple-500',
              'bg-pink-500',
            ];
            const color = colors[index % colors.length];

            return (
              <div key={category}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-900 font-medium">{category}</span>
                  <span className="text-gray-600">
                    ${categorySpending[category].toFixed(2)} ({percentage.toFixed(0)}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className={`h-3 rounded-full ${color}`} style={{ width: `${percentage}%` }} />
                </div>
              </div>
            );
          })}

          <div className="mt-4 p-3 bg-gray-50 rounded text-sm">
            <p className="text-gray-900 font-semibold">Total: ${total.toFixed(2)}</p>
          </div>
        </div>
      ) : (
        <p className="text-gray-600 text-center py-8">No expense data available</p>
      )}
    </div>
  );
}
