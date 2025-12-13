/**
 * Budgets Page
 * Create and manage budgets and spending limits
 */

import { useEffect, useState } from 'react';
import { useBudgetStore } from '../store/budgetStore';
import BudgetForm from '../components/BudgetForm';
import BudgetList from '../components/BudgetList';
import CategoryForm from '../components/CategoryForm';

export default function BudgetsPage() {
  const { budgets, categories, fetchBudgets, fetchCategories } = useBudgetStore();
  const [showBudgetForm, setShowBudgetForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [categoryType, setCategoryType] = useState('expense');

  useEffect(() => {
    const loadData = async () => {
      try {
        await Promise.all([
          fetchBudgets(),
          fetchCategories(),
        ]);
      } catch (error) {
        console.error('Error loading budgets:', error);
      }
    };

    loadData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Budgets</h1>
          <p className="text-gray-600 mt-2">Set spending limits for your categories</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setCategoryType('expense');
              setShowCategoryForm(true);
            }}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
          >
            + New Category
          </button>
          <button
            onClick={() => setShowBudgetForm(!showBudgetForm)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            {showBudgetForm ? 'Cancel' : '+ New Budget'}
          </button>
        </div>
      </div>

      {/* Forms */}
      {showCategoryForm && (
        <div className="bg-white rounded-lg shadow p-6">
          <CategoryForm
            type={categoryType}
            onSuccess={() => setShowCategoryForm(false)}
          />
        </div>
      )}

      {showBudgetForm && (
        <div className="bg-white rounded-lg shadow p-6">
          <BudgetForm
            categories={categories.filter((c) => c.type === 'expense')}
            onSuccess={() => setShowBudgetForm(false)}
          />
        </div>
      )}

      {/* Budgets List */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Active Budgets</h2>
        {budgets.length > 0 ? (
          <BudgetList budgets={budgets} categories={categories} />
        ) : (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600">No budgets yet. Create one to get started!</p>
          </div>
        )}
      </div>

      {/* Categories */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <div key={category.id} className="bg-white rounded-lg shadow p-4">
              <div className="text-3xl mb-2">{category.icon || '📁'}</div>
              <h3 className="font-semibold text-gray-900">{category.name}</h3>
              <p className="text-xs text-gray-600 mt-1">
                {category.type === 'income' ? '📈 Income' : '📉 Expense'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
