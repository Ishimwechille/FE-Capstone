/**
 * Dashboard Page
 * Main dashboard showing summary and recent transactions with alerts
 */

import { useEffect } from 'react';
import { useTransactionStore } from '../store/transactionStore';
import { useReportStore } from '../store/reportStore';
import { useBudgetStore } from '../store/budgetStore';
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

  const { 
    fetchUnreadAlerts, 
    fetchSummary,
    fetchBreakdown,
    fetchBudgetStatus,
    unreadAlerts 
  } = useReportStore();

  const { fetchGoals, goals } = useBudgetStore();

  useEffect(() => {
    // Fetch all data on mount
    const loadData = async () => {
      try {
        await Promise.all([
          fetchIncomes(),
          fetchExpenses(),
          fetchUnreadAlerts(),
          fetchSummary(),
          fetchBreakdown(),
          fetchBudgetStatus(),
          fetchGoals(),
        ]);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      }
    };

    loadData();
  }, [
    fetchIncomes,
    fetchExpenses,
    fetchUnreadAlerts,
    fetchSummary,
    fetchBreakdown,
    fetchBudgetStatus,
    fetchGoals,
  ]);

  const currentMonth = new Date().toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  const activeGoalsCount = goals.filter((g) => !g.is_completed).length;
  const completedGoalsCount = goals.filter((g) => g.is_completed).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Home</h1>
        <p className="text-gray-600 mt-2">Financial overview for {currentMonth}</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
        <DashboardSummaryCard
          title="Active Goals"
          amount={activeGoalsCount}
          icon="🎯"
          color="purple"
          subtitle={`${completedGoalsCount} completed`}
        />
      </div>

      {/* Unread Alerts Indicator */}
      {unreadAlerts.length > 0 && (
        <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
          <div className="flex items-center gap-2">
            <span className="text-blue-600 font-semibold">
              🔔 You have {unreadAlerts.length} new notification{unreadAlerts.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      )}

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions - Takes 2 columns */}
        <div className="lg:col-span-2">
          <RecentTransactions incomes={incomes.slice(0, 5)} expenses={expenses.slice(0, 5)} />
        </div>

        {/* Alerts */}
        <div className="lg:col-span-1">
          <AlertsPanel />
        </div>
      </div>
    </div>
  );
}
