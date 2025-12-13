/**
 * Recent Transactions Component
 */

export default function RecentTransactions({ incomes, expenses }) {
  const allTransactions = [
    ...incomes.map((inc) => ({ ...inc, type: 'income' })),
    ...expenses.map((exp) => ({ ...exp, type: 'expense' })),
  ]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 10);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Transactions</h2>
      {allTransactions.length > 0 ? (
        <div className="space-y-3">
          {allTransactions.map((transaction) => (
            <div
              key={`${transaction.type}-${transaction.id}`}
              className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                  }`}
                >
                  {transaction.type === 'income' ? '📈' : '📉'}
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {transaction.category_name || 'Uncategorized'}
                  </p>
                  <p className="text-sm text-gray-500">{transaction.date}</p>
                </div>
              </div>
              <p
                className={`font-semibold ${
                  transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center py-8">No transactions yet</p>
      )}
    </div>
  );
}
