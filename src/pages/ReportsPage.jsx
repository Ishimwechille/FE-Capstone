/**
 * Reports Page
 * View spending trends and financial reports
 */

import { useEffect, useState } from 'react';
import { useReportStore } from '../store/reportStore';
import { useTransactionStore } from '../store/transactionStore';
import SpendingChart from '../components/SpendingChart';
import IncomeVsExpensesChart from '../components/IncomeVsExpensesChart';

export default function ReportsPage() {
  const { fetchSummary, summary } = useReportStore();
  const { incomes, expenses, fetchIncomes, fetchExpenses } = useTransactionStore();
  const [timeframe, setTimeframe] = useState('month'); // 'month', '3months', 'year'

  useEffect(() => {
    const loadData = async () => {
      try {
        await Promise.all([
          fetchIncomes(),
          fetchExpenses(),
          fetchSummary(),
        ]);
      } catch (error) {
        console.error('Error loading reports:', error);
      }
    };

    loadData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Financial Reports</h1>
          <p className="text-gray-600 mt-2">Analyze your spending and income patterns</p>
        </div>
        <div className="flex gap-2">
          {[
            { value: 'month', label: 'This Month' },
            { value: '3months', label: 'Last 3 Months' },
            { value: 'year', label: 'This Year' },
          ].map((item) => (
            <button
              key={item.value}
              onClick={() => setTimeframe(item.value)}
              className={`px-4 py-2 rounded-lg transition ${
                timeframe === item.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spending by Category */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Spending by Category</h2>
          <SpendingChart expenses={expenses} />
        </div>

        {/* Income vs Expenses */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Income vs Expenses</h2>
          <IncomeVsExpensesChart incomes={incomes} expenses={expenses} />
        </div>
      </div>

      {/* Summary Stats */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-gray-600 text-sm font-medium">Total Income</p>
            <p className="text-2xl font-bold text-green-600 mt-2">
              ${incomes.reduce((sum, i) => sum + parseFloat(i.amount || 0), 0).toFixed(2)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-600 text-sm font-medium">Total Expenses</p>
            <p className="text-2xl font-bold text-red-600 mt-2">
              ${expenses.reduce((sum, e) => sum + parseFloat(e.amount || 0), 0).toFixed(2)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-600 text-sm font-medium">Net Balance</p>
            <p className="text-2xl font-bold text-blue-600 mt-2">
              ${(incomes.reduce((sum, i) => sum + parseFloat(i.amount || 0), 0) - 
                expenses.reduce((sum, e) => sum + parseFloat(e.amount || 0), 0)).toFixed(2)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-600 text-sm font-medium">Transactions</p>
            <p className="text-2xl font-bold text-purple-600 mt-2">
              {incomes.length + expenses.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
