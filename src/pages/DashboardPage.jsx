/**
 * Dashboard Page
 * Main dashboard showing summary and recent transactions
 */

import { useEffect } from 'react';
import { useTransactionStore } from '../store/transactionStore';
import { useReportStore } from '../store/reportStore';
import DashboardSummaryCard from '../components/DashboardSummaryCard';
import RecentTransactions from '../components/RecentTransactions';
import AlertsPanel from '../components/AlertsPanel';

export default function DashboardPage() {
  const {
    incomes,
    expenses,
    fetchIncomes,
    fetchExpenses,
    getTotalIncome,
    getTotalExpenses,
    getNetBalance,
  } = useTransactionStore();

  const { fetchAlerts, fetchSummary } = useReportStore();

  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchIncomes();
        await fetchExpenses();
        await fetchAlerts();
        await fetchSummary();
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      }
    };

    loadData();
  }, []);

  const currentMonth = new Date().toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Dashboard
        </h1>
        <p className="text-gray-600 mt-2 text-lg">
          Financial overview for <span className="font-semibold">{currentMonth}</span>
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardSummaryCard
          title="Total Income"
          amount={getTotalIncome()}
          icon="💚"
          color="green"
        />
        <DashboardSummaryCard
          title="Total Expenses"
          amount={getTotalExpenses()}
          icon="❤️"
          color="red"
        />
        <DashboardSummaryCard
          title="Net Balance"
          amount={getNetBalance()}
          icon="💙"
          color={getNetBalance() >= 0 ? 'blue' : 'red'}
        />
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Recent Transactions */}
        <div className="lg:col-span-2 bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
          <RecentTransactions incomes={incomes.slice(0, 5)} expenses={expenses.slice(0, 5)} />
        </div>

        {/* Alerts */}
        <div className="lg:col-span-1 bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
          <AlertsPanel />
        </div>
      </div>
    </div>
  );
}
