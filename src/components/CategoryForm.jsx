/**
 * Category Form Component
 */

import { useState } from 'react';
import { useBudgetStore } from '../store/budgetStore';

const categoryEmojis = ['📁', '🍽️', '🚗', '🏠', '📱', '👕', '🎮', '📚', '✈️', '💊'];

export default function CategoryForm({ type = 'expense', onSuccess }) {
  const { createCategory } = useBudgetStore();
  const [formData, setFormData] = useState({
    name: '',
    type,
    description: '',
    icon: categoryEmojis[0],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await createCategory(formData);
      onSuccess?.();
      setFormData({
        name: '',
        type,
        description: '',
        icon: categoryEmojis[0],
      });
    } catch (error) {
      setError(error.message || 'Failed to create category');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Create New Category</h3>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="e.g., Groceries"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
          <select
            name="icon"
            value={formData.icon}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          >
            {categoryEmojis.map((emoji) => (
              <option key={emoji} value={emoji}>
                {emoji}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          rows="2"
          placeholder="Add a description..."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
      >
        {loading ? 'Creating...' : 'Create Category'}
      </button>
    </form>
  );
}
