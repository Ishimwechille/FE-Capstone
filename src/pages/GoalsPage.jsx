/**
 * Goals Page
 * Create and track savings goals
 */

import { useEffect, useState } from 'react';
import { useBudgetStore } from '../store/budgetStore';
import GoalForm from '../components/GoalForm';
import GoalCard from '../components/GoalCard';

export default function GoalsPage() {
  const { goals, categories, fetchGoals, fetchCategories } = useBudgetStore();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        await Promise.all([
          fetchGoals(),
          fetchCategories(),
        ]);
      } catch (error) {
        console.error('Error loading goals:', error);
      }
    };

    loadData();
  }, []);

  const completedGoals = goals.filter((g) => g.is_completed);
  const activeGoals = goals.filter((g) => !g.is_completed);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Savings Goals</h1>
          <p className="text-gray-600 mt-2">Track your financial targets</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {showForm ? 'Cancel' : '+ New Goal'}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow p-6">
          <GoalForm
            categories={categories.filter((c) => c.type === 'expense')}
            onSuccess={() => setShowForm(false)}
          />
        </div>
      )}

      {/* Active Goals */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Active Goals ({activeGoals.length})
        </h2>
        {activeGoals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeGoals.map((goal) => (
              <GoalCard key={goal.id} goal={goal} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600">No active goals. Set one to get started!</p>
          </div>
        )}
      </div>

      {/* Completed Goals */}
      {completedGoals.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Completed Goals ({completedGoals.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {completedGoals.map((goal) => (
              <GoalCard key={goal.id} goal={goal} completed={true} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
