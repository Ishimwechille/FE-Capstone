/**
 * Goal Card Component
 */

import { useBudgetStore } from '../store/budgetStore';

export default function GoalCard({ goal, completed = false }) {
  const { deleteGoal, updateGoal } = useBudgetStore();
  const progress = (goal.current_amount / goal.target_amount) * 100;
  const daysLeft = Math.ceil((new Date(goal.target_date) - new Date()) / (1000 * 60 * 60 * 24));

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this goal?')) return;
    try {
      await deleteGoal(goal.id);
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
  };

  const handleAddProgress = async () => {
    const amount = prompt('Add amount to goal:', '0');
    if (amount === null) return;
    try {
      await updateGoal(goal.id, {
        current_amount: parseFloat(goal.current_amount) + parseFloat(amount),
      });
    } catch (error) {
      console.error('Error updating goal:', error);
    }
  };

  return (
    <div className={`border rounded-lg p-4 ${completed ? 'bg-green-50 border-green-200' : 'bg-white'}`}>
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-gray-900">{goal.name}</h3>
        <button
          onClick={handleDelete}
          className="text-red-600 hover:text-red-900 text-sm font-medium"
        >
          ✕
        </button>
      </div>

      <p className="text-sm text-gray-600 mb-3">{goal.description}</p>

      {/* Progress Bar */}
      <div className="mb-3">
        <div className="flex justify-between text-xs text-gray-600 mb-1">
          <span>${parseFloat(goal.current_amount).toFixed(2)}</span>
          <span>${parseFloat(goal.target_amount).toFixed(2)}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all ${
              completed ? 'bg-green-600' : 'bg-blue-600'
            }`}
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <p className="text-xs text-gray-600 mt-1">{progress.toFixed(0)}% Complete</p>
      </div>

      {/* Meta Info */}
      <div className="flex items-center justify-between text-xs text-gray-600 mb-3">
        <span>Target: {goal.target_date}</span>
        {!completed && daysLeft > 0 && <span>{daysLeft} days left</span>}
        {completed && <span className="text-green-600 font-semibold">✓ Completed</span>}
      </div>

      {/* Action Button */}
      {!completed && (
        <button
          onClick={handleAddProgress}
          className="w-full py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
        >
          Add Progress
        </button>
      )}
    </div>
  );
}
