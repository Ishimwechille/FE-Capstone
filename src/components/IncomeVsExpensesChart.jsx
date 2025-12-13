/**
 * Income vs Expenses Chart Component
 */

export default function IncomeVsExpensesChart({ incomes, expenses }) {
  const totalIncome = incomes.reduce((sum, i) => sum + parseFloat(i.amount || 0), 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + parseFloat(e.amount || 0), 0);
  const maxAmount = Math.max(totalIncome, totalExpenses) * 1.1 || 100;

  const incomePercent = (totalIncome / maxAmount) * 100;
  const expensePercent = (totalExpenses / maxAmount) * 100;

  return (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-900 font-medium">Income</span>
          <span className="text-green-600 font-semibold">${totalIncome.toFixed(2)}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="h-4 bg-green-500 rounded-full transition-all"
            style={{ width: `${incomePercent}%` }}
          />
        </div>
      </div>

      <div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-900 font-medium">Expenses</span>
          <span className="text-red-600 font-semibold">${totalExpenses.toFixed(2)}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="h-4 bg-red-500 rounded-full transition-all"
            style={{ width: `${expensePercent}%` }}
          />
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <div className="flex justify-between text-sm">
          <span className="text-gray-900 font-medium">Net Balance</span>
          <span
            className={`font-semibold ${
              totalIncome - totalExpenses >= 0 ? 'text-blue-600' : 'text-red-600'
            }`}
          >
            ${(totalIncome - totalExpenses).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
