/**
 * Budget Store
 * Manages budgets, categories, and goals state
 */

import { create } from 'zustand';
import { budgetAPI } from '../services/api';

export const useBudgetStore = create((set, get) => ({
  categories: [],
  budgets: [],
  goals: [],
  isLoading: false,
  error: null,

  // ==================== CATEGORIES ====================

  // Fetch all categories
  fetchCategories: async (params = {}) => {
    set({ isLoading: true, error: null });
    try {
      const response = await budgetAPI.categories.list(params);
      set({
        categories: response.results || response,
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

  // Create category
  createCategory: async (categoryData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await budgetAPI.categories.create(categoryData);
      const { categories } = get();
      set({
        categories: [response, ...categories],
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

  // Update category
  updateCategory: async (id, categoryData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await budgetAPI.categories.update(id, categoryData);
      const { categories } = get();
      set({
        categories: categories.map((cat) => (cat.id === id ? response : cat)),
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

  // Delete category
  deleteCategory: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await budgetAPI.categories.delete(id);
      const { categories } = get();
      set({
        categories: categories.filter((cat) => cat.id !== id),
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

  // ==================== BUDGETS ====================

  // Fetch all budgets
  fetchBudgets: async (params = {}) => {
    set({ isLoading: true, error: null });
    try {
      const response = await budgetAPI.budgets.list(params);
      set({
        budgets: response.results || response,
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

  // Create budget
  createBudget: async (budgetData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await budgetAPI.budgets.create(budgetData);
      const { budgets } = get();
      set({
        budgets: [response, ...budgets],
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

  // Update budget
  updateBudget: async (id, budgetData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await budgetAPI.budgets.update(id, budgetData);
      const { budgets } = get();
      set({
        budgets: budgets.map((budget) => (budget.id === id ? response : budget)),
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

  // Delete budget
  deleteBudget: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await budgetAPI.budgets.delete(id);
      const { budgets } = get();
      set({
        budgets: budgets.filter((budget) => budget.id !== id),
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

  // ==================== GOALS ====================

  // Fetch all goals
  fetchGoals: async (params = {}) => {
    set({ isLoading: true, error: null });
    try {
      const response = await budgetAPI.goals.list(params);
      set({
        goals: response.results || response,
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

  // Create goal
  createGoal: async (goalData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await budgetAPI.goals.create(goalData);
      const { goals } = get();
      set({
        goals: [response, ...goals],
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

  // Update goal
  updateGoal: async (id, goalData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await budgetAPI.goals.update(id, goalData);
      const { goals } = get();
      set({
        goals: goals.map((goal) => (goal.id === id ? response : goal)),
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

  // Delete goal
  deleteGoal: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await budgetAPI.goals.delete(id);
      const { goals } = get();
      set({
        goals: goals.filter((goal) => goal.id !== id),
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

  // Mark goal as completed
  markGoalCompleted: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await budgetAPI.goals.markCompleted(id);
      const { goals } = get();
      set({
        goals: goals.map((goal) => (goal.id === id ? response : goal)),
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

  // Update goal progress
  updateGoalProgress: async (id, current_amount) => {
    set({ isLoading: true, error: null });
    try {
      const response = await budgetAPI.goals.updateProgress(id, current_amount);
      const { goals } = get();
      set({
        goals: goals.map((goal) => (goal.id === id ? response : goal)),
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

  // Clear error
  clearError: () => {
    set({ error: null });
  },

  // Get category by ID
  getCategoryById: (id) => {
    const { categories } = get();
    return categories.find((cat) => cat.id === id);
  },

  // Get categories by type
  getCategoriesByType: (type) => {
    const { categories } = get();
    return categories.filter((cat) => cat.type === type);
  },
}));
