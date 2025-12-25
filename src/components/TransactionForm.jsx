/**
 * Transaction Form Component
 * Handles adding income and expenses with validation
 */

import { useState } from 'react';
import { useTransactionStore } from '../store/transactionStore';

export default function TransactionForm({ type = 'expense', balance = 0, categories, onSuccess }) {
  const { createIncome, createExpense } = useTransactionStore();
  const [formData, setFormData] = useState({
    category: categories[0]?.id || '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    currency: 'USD',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const validateForm = () => {
    if (!formData.category) {
      setError('Please select a category');
      return false;
    }

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      setError('Please enter a valid amount greater than 0');
      return false;
    }

    if (type === 'expense' && parseFloat(formData.amount) > balance) {
      setError(`Insufficient balance! You have $${balance.toFixed(2)} available, but trying to spend $${parseFloat(formData.amount).toFixed(2)}`);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const categoryObj = categories.find(c => c.id === parseInt(formData.category));
      const categoryName = categoryObj?.name || 'Unknown';
      const amount = parseFloat(formData.amount);
      
      if (type === 'income') {
        await createIncome(formData);
        setSuccess('Income recorded successfully!');
      } else {
        await createExpense(formData);
        setSuccess('Expense recorded successfully!');
      }
      
      setTimeout(() => {
        onSuccess?.(amount, categoryName);
        setSuccess('');
      }, 1500);

      setFormData({
        category: categories[0]?.id || '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        description: '',
        currency: 'USD',
      });
    } catch (error) {
      setError(error.message || `Failed to create ${type}`);
    } finally {
      setLoading(false);
    }
  };

  const selectedCategory = categories.find(c => c.id === parseInt(formData.category));
  const amountNum = parseFloat(formData.amount) || 0;
  const remainingBalance = type === 'expense' ? balance - amountNum : balance + amountNum;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Error Message */}
      {error && (
        <div className={`p-4 rounded-lg border-l-4 ${
          type === 'income'
            ? 'bg-green-50 border-green-500 text-green-700'
            : 'bg-red-50 border-red-500 text-red-700'
        }`}>
          <div className="flex items-start gap-3">
            <span className="text-xl">⚠️</span>
            <div>
              <p className="font-semibold">Error</p>
              <p className="text-sm mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className={`p-4 rounded-lg border-l-4 ${
          type === 'income'
            ? 'bg-green-50 border-green-500 text-green-700'
            : 'bg-blue-50 border-blue-500 text-blue-700'
        }`}>
          <div className="flex items-center gap-3">
            <span className="text-xl">✅</span>
            <p className="font-semibold">{success}</p>
          </div>
        </div>
      )}

      {/* Category Selection */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          <span className="text-lg mr-1">📂</span>Category *
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
        >
          <option value="">-- Select a category --</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.icon} {cat.name}
            </option>
          ))}
        </select>
        {selectedCategory && (
          <p className="text-xs text-gray-500 mt-2">
            Selected: {selectedCategory.icon} {selectedCategory.name}
          </p>
        )}
      </div>

      {/* Amount and Currency */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <span className="text-lg mr-1">💵</span>Amount *
          </label>
          <div className="relative">
            <span className="absolute left-4 top-3 text-gray-500 font-semibold">$</span>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              step="0.01"
              min="0"
              className="w-full pl-7 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              placeholder="0.00"
            />
          </div>
          {amountNum > 0 && type === 'expense' && (
            <p className={`text-xs mt-2 font-semibold ${amountNum > balance ? 'text-red-600' : 'text-green-600'}`}>
              {amountNum > balance 
                ? `❌ Exceeds balance by $${(amountNum - balance).toFixed(2)}`
                : `✅ Within balance`
              }
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <span className="text-lg mr-1">🌍</span>Currency
          </label>
          <select
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
          >
            <option value="USD">USD - US Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound</option>
            <option value="KES">KES - Kenyan Shilling</option>
            <option value="JPY">JPY - Japanese Yen</option>
            <option value="INR">INR - Indian Rupee</option>
          </select>
        </div>
      </div>

      {/* Date */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          <span className="text-lg mr-1">📅</span>Date *
        </label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          <span className="text-lg mr-1">📝</span>Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="2"
          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition resize-none"
          placeholder="Add notes or details (optional)"
        />
      </div>

      {/* Balance Summary */}
      <div className={`p-4 rounded-lg border-2 ${
        type === 'income'
          ? 'bg-green-50 border-green-300'
          : remainingBalance >= 0
          ? 'bg-blue-50 border-blue-300'
          : 'bg-orange-50 border-orange-300'
      }`}>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Current Balance</p>
            <p className="text-xl font-bold text-gray-900">${balance.toFixed(2)}</p>
          </div>
          <div>
            <p className={`text-gray-600 ${type === 'income' ? 'text-green-700' : 'text-red-700'}`}>
              Balance After {type === 'income' ? 'Income' : 'Expense'}
            </p>
            <p className={`text-xl font-bold ${
              type === 'income'
                ? 'text-green-900'
                : remainingBalance >= 0
                ? 'text-blue-900'
                : 'text-orange-900'
            }`}>
              ${remainingBalance.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition flex items-center justify-center gap-2 ${
          type === 'income'
            ? 'bg-green-600 hover:bg-green-700 disabled:bg-green-400'
            : 'bg-red-600 hover:bg-red-700 disabled:bg-red-400'
        } ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
      >
        {loading ? (
          <>
            <span className="animate-spin">⏳</span>
            Processing...
          </>
        ) : (
          <>
            <span className="text-lg">{type === 'income' ? '➕' : '➖'}</span>
            {type === 'income' ? 'Record Income' : 'Record Expense'}
          </>
        )}
      </button>
    </form>
  );
}
