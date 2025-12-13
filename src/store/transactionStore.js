/**
 * Transaction Store
 * Manages transaction state (income and expenses)
 */

import { create } from 'zustand';
import { transactionAPI } from '../services/api';

export const useTransactionStore = create((set, get) => ({
  incomes: [],
  expenses: [],
  isLoading: false,
  error: null,

  // Fetch all income records
  fetchIncomes: async (params = {}) => {
    set({ isLoading: true, error: null });
    try {
      const response = await transactionAPI.income.list(params);
      set({
        incomes: response.results || response,
        isLoading: false,
      });
      return response;
    } catch (error) {
      set({
        error: error.message,
        isLoading: false,
      });
      throw error;
    }
  },

  // Create income record
  createIncome: async (incomeData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await transactionAPI.income.create(incomeData);
      const { incomes } = get();
      set({
        incomes: [response, ...incomes],
        isLoading: false,
      });
      return response;
    } catch (error) {
      set({
        error: error.message,
        isLoading: false,
      });
      throw error;
    }
  },

  // Update income record
  updateIncome: async (id, incomeData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await transactionAPI.income.update(id, incomeData);
      const { incomes } = get();
      set({
        incomes: incomes.map((income) => (income.id === id ? response : income)),
        isLoading: false,
      });
      return response;
    } catch (error) {
      set({
        error: error.message,
        isLoading: false,
      });
      throw error;
    }
  },

  // Delete income record
  deleteIncome: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await transactionAPI.income.delete(id);
      const { incomes } = get();
      set({
        incomes: incomes.filter((income) => income.id !== id),
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.message,
        isLoading: false,
      });
      throw error;
    }
  },

  // Fetch all expenses
  fetchExpenses: async (params = {}) => {
    set({ isLoading: true, error: null });
    try {
      const response = await transactionAPI.expenses.list(params);
      set({
        expenses: response.results || response,
        isLoading: false,
      });
      return response;
    } catch (error) {
      set({
        error: error.message,
        isLoading: false,
      });
      throw error;
    }
  },

  // Create expense record
  createExpense: async (expenseData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await transactionAPI.expenses.create(expenseData);
      const { expenses } = get();
      set({
        expenses: [response, ...expenses],
        isLoading: false,
      });
      return response;
    } catch (error) {
      set({
        error: error.message,
        isLoading: false,
      });
      throw error;
    }
  },

  // Update expense record
  updateExpense: async (id, expenseData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await transactionAPI.expenses.update(id, expenseData);
      const { expenses } = get();
      set({
        expenses: expenses.map((expense) => (expense.id === id ? response : expense)),
        isLoading: false,
      });
      return response;
    } catch (error) {
      set({
        error: error.message,
        isLoading: false,
      });
      throw error;
    }
  },

  // Delete expense record
  deleteExpense: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await transactionAPI.expenses.delete(id);
      const { expenses } = get();
      set({
        expenses: expenses.filter((expense) => expense.id !== id),
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.message,
        isLoading: false,
      });
      throw error;
    }
  },

  // Clear error
  clearError: () => {
    set({ error: null });
  },

  // Get total income
  getTotalIncome: () => {
    const { incomes } = get();
    return incomes.reduce((sum, income) => sum + parseFloat(income.amount || 0), 0);
  },

  // Get total expenses
  getTotalExpenses: () => {
    const { expenses } = get();
    return expenses.reduce((sum, expense) => sum + parseFloat(expense.amount || 0), 0);
  },

  // Get net balance
  getNetBalance: () => {
    const { getTotalIncome, getTotalExpenses } = get();
    return getTotalIncome() - getTotalExpenses();
  },
}));
