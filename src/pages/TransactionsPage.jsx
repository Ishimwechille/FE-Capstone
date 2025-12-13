/**
 * Transactions Page
 * View and manage all income and expense transactions
 */

import { useState, useEffect } from 'react';
import { useTransactionStore } from '../store/transactionStore';
import { useBudgetStore } from '../store/budgetStore';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';

export default function TransactionsPage() {
  const { incomes, expenses, fetchIncomes, fetchExpenses, getTotalIncome, getTotalExpenses, getNetBalance } = useTransactionStore();
  const { categories, fetchCategories } = useBudgetStore();
  const [tab, setTab] = useState('all'); // 'all', 'income', 'expense'
  const [activeForm, setActiveForm] = useState(null); // 'income', 'expense', or null

  useEffect(() => {
    const loadData = async () => {
      try {
        await Promise.all([
          fetchIncomes(),
          fetchExpenses(),
          fetchCategories(),
        ]);
      } catch (error) {
        console.error('Error loading transactions:', error);
      }
    };

    loadData();
  }, []);

  const allTransactions = [
    ...incomes.map((inc) => ({ ...inc, type: 'income' })),
    ...expenses.map((exp) => ({ ...exp, type: 'expense' })),
  ].sort((a, b) => new Date(b.date) - new Date(a.date));

  const filteredTransactions = tab === 'all'
    ? allTransactions
    : tab === 'income'
    ? incomes.map((inc) => ({ ...inc, type: 'income' }))
    : expenses.map((exp) => ({ ...exp, type: 'expense' }));

  const totalIncome = getTotalIncome();
  const totalExpenses = getTotalExpenses();
  const balance = getNetBalance();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
        <p className="text-gray-600 mt-2">Track and manage your income and expenses</p>
      </div>

      {/* Balance Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
          <p className="text-green-700 text-sm font-medium">Total Income</p>
          <p className="text-3xl font-bold text-green-900 mt-2">${totalIncome.toFixed(2)}</p>
          <p className="text-green-600 text-xs mt-2">{incomes.length} transactions</p>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-6 border border-red-200">
          <p className="text-red-700 text-sm font-medium">Total Expenses</p>
          <p className="text-3xl font-bold text-red-900 mt-2">${totalExpenses.toFixed(2)}</p>
          <p className="text-red-600 text-xs mt-2">{expenses.length} transactions</p>
        </div>

        <div className={`bg-gradient-to-br rounded-lg p-6 border ${
          balance >= 0 
            ? 'from-blue-50 to-blue-100 border-blue-200' 
            : 'from-orange-50 to-orange-100 border-orange-200'
        }`}>
          <p className={`text-sm font-medium ${balance >= 0 ? 'text-blue-700' : 'text-orange-700'}`}>
            Available Balance
          </p>
          <p className={`text-3xl font-bold mt-2 ${balance >= 0 ? 'text-blue-900' : 'text-orange-900'}`}>
            ${balance.toFixed(2)}
          </p>
          <p className={`text-xs mt-2 ${balance >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>
            {balance >= 0 ? 'You can spend up to this amount' : 'Balance is negative'}
          </p>
        </div>
      </div>

      {/* Add Transaction Buttons */}
      <div className="flex gap-3">
        <button
          onClick={() => setActiveForm(activeForm === 'income' ? null : 'income')}
          className={`flex-1 px-6 py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
            activeForm === 'income'
              ? 'bg-green-600 text-white shadow-lg'
              : 'bg-green-50 text-green-700 border-2 border-green-300 hover:bg-green-100'
          }`}
        >
          <span className="text-xl">➕</span>
          Add Income
        </button>
        <button
          onClick={() => setActiveForm(activeForm === 'expense' ? null : 'expense')}
          className={`flex-1 px-6 py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
            activeForm === 'expense'
              ? 'bg-red-600 text-white shadow-lg'
              : 'bg-red-50 text-red-700 border-2 border-red-300 hover:bg-red-100'
          }`}
        >
          <span className="text-xl">➖</span>
          Add Expense
        </button>
      </div>

      {/* Forms - Income Form */}
      {activeForm === 'income' && (
        <div className="bg-gradient-to-br from-green-50 to-white rounded-lg shadow-lg border-2 border-green-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">💰</span>
            <h2 className="text-2xl font-bold text-green-900">Record Income</h2>
          </div>
          <p className="text-green-700 mb-6">Add money you've earned or received</p>
          <TransactionForm
            type="income"
            balance={balance}
            categories={categories.filter((c) => c.type === 'income')}
            onSuccess={() => {
              setActiveForm(null);
              fetchIncomes();
              fetchExpenses();
            }}
          />
        </div>
      )}

      {/* Forms - Expense Form */}
      {activeForm === 'expense' && (
        <div className="bg-gradient-to-br from-red-50 to-white rounded-lg shadow-lg border-2 border-red-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">💸</span>
            <h2 className="text-2xl font-bold text-red-900">Record Expense</h2>
          </div>
          <p className="text-red-700 mb-6">Log money you've spent (max: ${balance.toFixed(2)})</p>
          <TransactionForm
            type="expense"
            balance={balance}
            categories={categories.filter((c) => c.type === 'expense')}
            onSuccess={() => {
              setActiveForm(null);
              fetchIncomes();
              fetchExpenses();
            }}
          />
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-300">
        {[
          { value: 'all', label: 'All Transactions', icon: '📋' },
          { value: 'income', label: 'Income', icon: '📈' },
          { value: 'expense', label: 'Expenses', icon: '📉' },
        ].map((tabItem) => (
          <button
            key={tabItem.value}
            onClick={() => setTab(tabItem.value)}
            className={`px-4 py-3 border-b-2 font-medium transition flex items-center gap-2 ${
              tab === tabItem.value
                ? 'border-blue-600 text-blue-600 bg-blue-50'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <span>{tabItem.icon}</span>
            {tabItem.label}
          </button>
        ))}
      </div>

      {/* Transaction List */}
      {filteredTransactions.length > 0 ? (
        <TransactionList transactions={filteredTransactions} />
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg">No transactions found</p>
          <p className="text-gray-400 text-sm mt-1">
            {tab === 'income' ? 'Start by adding your first income' : tab === 'expense' ? 'No expenses yet' : 'Add your first transaction'}
          </p>
        </div>
      )}
    </div>
  );
}
