/**
 * Goals Page
 * Create and track savings goals with notifications
 */

import { useEffect, useState } from 'react';
import { useBudgetStore } from '../store/budgetStore';
import { useNotificationTrigger } from '../hooks/useNotificationTrigger';
import GoalForm from '../components/GoalForm';
import GoalCard from '../components/GoalCard';

export default function GoalsPage() {
  const { goals, categories, fetchGoals, fetchCategories, isLoading, error, clearError } = useBudgetStore();
  const { notifyGoalCreated } = useNotificationTrigger();
  const [showForm, setShowForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

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
  }, [fetchGoals, fetchCategories]);

  const handleFormSuccess = async (goalName) => {
    setShowForm(false);
    setSuccessMessage('Goal created successfully! 🎉');
    setTimeout(() => setSuccessMessage(''), 3000);
    
    // Trigger notification for goal creation
    try {
      await notifyGoalCreated(goalName);
    } catch (err) {
      console.error('Error creating notification:', err);
    }
  };

  const completedGoals = goals.filter((g) => g.is_completed);
  const activeGoals = goals.filter((g) => !g.is_completed);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Savings Goals</h1>
          <p className="text-gray-600 mt-2">Track your financial targets and save for what matters</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {showForm ? 'Cancel' : '+ New Goal'}
        </button>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
          {successMessage}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 flex justify-between items-center">
          <span>{error}</span>
          <button
            onClick={clearError}
            className="text-red-600 hover:text-red-900 font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow p-6">
          <GoalForm
            categories={categories.filter((c) => c.type === 'expense')}
            onSuccess={handleFormSuccess}
          />
        </div>
      )}

      {/* Loading State */}
      {isLoading && goals.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">Loading your goals...</p>
        </div>
      )}

      {/* Active Goals */}
      {!isLoading && (
        <>
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
                <p className="text-gray-600 mb-4">No active goals yet. Create one to get started!</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Create Your First Goal
                </button>
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
        </>
      )}
    </div>
  );
}
