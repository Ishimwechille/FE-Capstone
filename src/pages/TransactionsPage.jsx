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
  const { incomes, expenses, fetchIncomes, fetchExpenses } = useTransactionStore();
  const { categories, fetchCategories } = useBudgetStore();
  const [tab, setTab] = useState('all'); // 'all', 'income', 'expense'
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState('expense'); // 'income' or 'expense'

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
          <p className="text-gray-600 mt-2">Manage your income and expenses</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {showForm ? 'Cancel' : '+ Add Transaction'}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow p-6">
          <TransactionForm
            type={formType}
            categories={categories.filter((c) => c.type === formType)}
            onSuccess={() => setShowForm(false)}
          />
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        {[
          { value: 'all', label: 'All Transactions' },
          { value: 'income', label: 'Income' },
          { value: 'expense', label: 'Expenses' },
        ].map((tabItem) => (
          <button
            key={tabItem.value}
            onClick={() => setTab(tabItem.value)}
            className={`px-4 py-2 border-b-2 font-medium transition ${
              tab === tabItem.value
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            {tabItem.label}
          </button>
        ))}
      </div>

      {/* Transaction List */}
      <TransactionList transactions={filteredTransactions} />
    </div>
  );
}
