/**
 * Budget List Component
 */

import { useBudgetStore } from '../store/budgetStore';

export default function BudgetList({ budgets, categories }) {
  const { deleteBudget } = useBudgetStore();

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this budget?')) return;
    try {
      await deleteBudget(id);
    } catch (error) {
      console.error('Error deleting budget:', error);
    }
  };

  const getCategoryName = (categoryId) => {
    return categories.find((c) => c.id === categoryId)?.name || 'Unknown';
  };

  return (
    <div className="space-y-4">
      {budgets.map((budget) => {
        const daysLeft = Math.ceil(
          (new Date(budget.end_date) - new Date()) / (1000 * 60 * 60 * 24)
        );
        const isActive = daysLeft > 0;

        return (
          <div
            key={budget.id}
            className={`border rounded-lg p-4 ${
              isActive ? 'bg-white border-gray-200' : 'bg-gray-50 border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">
                {getCategoryName(budget.category)}
              </h3>
              <button
                onClick={() => handleDelete(budget.id)}
                className="text-red-600 hover:text-red-900 text-sm font-medium"
              >
                Delete
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Period</span>
                <span className="text-gray-900">
                  {budget.start_date} to {budget.end_date}
                  {isActive && ` (${daysLeft} days left)`}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Limit</span>
                <span className="text-gray-900 font-semibold">
                  ${parseFloat(budget.limit_amount).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
