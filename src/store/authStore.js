/**
 * Authentication Store
 * Manages user authentication state across the application
 */

import { create } from 'zustand';
import { authAPI } from '../services/api';

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isLoading: false,
  error: null,

  // Initialize from localStorage
  initialize: () => {
    const token = localStorage.getItem('access_token');
    const user = localStorage.getItem('user');
    if (token && user) {
      set({ token, user: JSON.parse(user) });
    }
  },

  // Register user
  register: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authAPI.register(userData);
      localStorage.setItem('access_token', response.access);
      localStorage.setItem('refresh_token', response.refresh);
      localStorage.setItem('user', JSON.stringify(response.user));
      set({
        token: response.access,
        user: response.user,
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

  // Login user
  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authAPI.login(credentials);
      localStorage.setItem('access_token', response.access);
      localStorage.setItem('refresh_token', response.refresh);
      localStorage.setItem('user', JSON.stringify(response.user));
      set({
        token: response.access,
        user: response.user,
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

  // Logout user
  logout: async () => {
    set({ isLoading: true });
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    set({
      user: null,
      token: null,
      isLoading: false,
      error: null,
    });
  },

  // Get current profile
  getProfile: async () => {
    set({ isLoading: true });
    try {
      const response = await authAPI.getProfile();
      localStorage.setItem('user', JSON.stringify(response));
      set({
        user: response,
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

  // Update profile
  updateProfile: async (profileData) => {
    set({ isLoading: true });
    try {
      const response = await authAPI.updateProfile(profileData);
      localStorage.setItem('user', JSON.stringify(response));
      set({
        user: response,
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

  // Check if user is authenticated
  isAuthenticated: () => !!localStorage.getItem('access_token'),
}));
