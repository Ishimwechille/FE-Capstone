/**
 * Goal Card Component
 * Triggers notifications on every user action
 */

import { useState } from 'react';
import { useBudgetStore } from '../store/budgetStore';
import { useNotificationTrigger } from '../hooks/useNotificationTrigger';

export default function GoalCard({ goal, completed = false }) {
  const { deleteGoal, updateGoalProgress, markGoalCompleted } = useBudgetStore();
  const { notifyGoalDeleted, notifyGoalProgressUpdated, notifyGoalCompleted } = useNotificationTrigger();
  const [isLoading, setIsLoading] = useState(false);
  const [showProgressForm, setShowProgressForm] = useState(false);
  const [progressAmount, setProgressAmount] = useState('');

  const progress = (goal.current_amount / goal.target_amount) * 100;
  const daysLeft = Math.ceil((new Date(goal.target_date) - new Date()) / (1000 * 60 * 60 * 24));

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this goal?')) return;
    setIsLoading(true);
    try {
      await deleteGoal(goal.id);
      await notifyGoalDeleted(goal.name);
    } catch (error) {
      console.error('Error deleting goal:', error);
      alert('Failed to delete goal');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddProgress = async () => {
    if (!progressAmount || parseFloat(progressAmount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    setIsLoading(true);
    try {
      const amount = parseFloat(progressAmount);
      const newAmount = parseFloat(goal.current_amount) + amount;
      await updateGoalProgress(goal.id, newAmount);
      await notifyGoalProgressUpdated(goal.name, amount);
      setShowProgressForm(false);
      setProgressAmount('');
    } catch (error) {
      console.error('Error updating goal:', error);
      alert('Failed to update goal progress');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkCompleted = async () => {
    if (!window.confirm('Mark this goal as completed?')) return;
    setIsLoading(true);
    try {
      await markGoalCompleted(goal.id);
      await notifyGoalCompleted(goal.name);
    } catch (error) {
      console.error('Error completing goal:', error);
      alert('Failed to mark goal as completed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`border rounded-lg p-4 ${completed ? 'bg-green-50 border-green-200' : 'bg-white'}`}>
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-gray-900">{goal.name}</h3>
        <button
          onClick={handleDelete}
          disabled={isLoading}
          className="text-red-600 hover:text-red-900 text-sm font-medium disabled:opacity-50"
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

      {/* Progress Form */}
      {showProgressForm && !completed && (
        <div className="mb-3 p-3 bg-gray-50 rounded border border-gray-200">
          <input
            type="number"
            value={progressAmount}
            onChange={(e) => setProgressAmount(e.target.value)}
            placeholder="Amount to add"
            min="0"
            step="0.01"
            disabled={isLoading}
            className="w-full px-2 py-1 border border-gray-300 rounded text-sm mb-2"
          />
          <div className="flex gap-2">
            <button
              onClick={handleAddProgress}
              disabled={isLoading}
              className="flex-1 px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : 'Add'}
            </button>
            <button
              onClick={() => {
                setShowProgressForm(false);
                setProgressAmount('');
              }}
              disabled={isLoading}
              className="flex-1 px-3 py-1 bg-gray-300 text-gray-700 text-xs rounded hover:bg-gray-400 disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {!completed && (
        <div className="flex gap-2">
          <button
            onClick={() => setShowProgressForm(!showProgressForm)}
            disabled={isLoading}
            className="flex-1 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition disabled:opacity-50"
          >
            {showProgressForm ? 'Cancel' : 'Add Progress'}
          </button>
          <button
            onClick={handleMarkCompleted}
            disabled={isLoading}
            className="flex-1 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition disabled:opacity-50"
          >
            Complete
          </button>
        </div>
      )}
    </div>
  );
}
