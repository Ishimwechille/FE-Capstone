/**
 * Report Store
 * Manages alerts and dashboard reports
 */

import { create } from 'zustand';
import { reportAPI } from '../services/api';

export const useReportStore = create((set, get) => ({
  alerts: [],
  unreadAlerts: [],
  summary: null,
  breakdown: null,
  budgetStatus: null,
  isLoading: false,
  error: null,

  // Fetch alerts
  fetchAlerts: async (params = {}) => {
    set({ isLoading: true, error: null });
    try {
      const response = await reportAPI.alerts.list(params);
      set({
        alerts: response.results || response,
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

  // Fetch unread alerts
  fetchUnreadAlerts: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await reportAPI.alerts.unread();
      set({
        unreadAlerts: response.alerts || [],
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

  // Mark alert as read
  markAlertAsRead: async (id) => {
    try {
      const response = await reportAPI.alerts.markAsRead(id);
      const { alerts, unreadAlerts } = get();
      set({
        alerts: alerts.map((alert) => (alert.id === id ? response : alert)),
        unreadAlerts: unreadAlerts.filter((alert) => alert.id !== id),
      });
      return response;
    } catch (error) {
      set({
        error: error.message,
      });
      throw error;
    }
  },

  // Mark all alerts as read
  markAllAlertsAsRead: async () => {
    try {
      await reportAPI.alerts.markAllAsRead();
      const { alerts } = get();
      set({
        alerts: alerts.map((alert) => ({ ...alert, is_read: true })),
        unreadAlerts: [],
      });
    } catch (error) {
      set({
        error: error.message,
      });
      throw error;
    }
  },

  // Create new alert
  createAlert: async (alertData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await reportAPI.alerts.create(alertData);
      const { alerts } = get();
      set({
        alerts: [response, ...alerts],
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

  // Fetch dashboard summary
  fetchSummary: async (params = {}) => {
    set({ isLoading: true, error: null });
    try {
      const response = await reportAPI.summary(params);
      set({
        summary: response,
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

  // Fetch category breakdown
  fetchBreakdown: async (params = {}) => {
    set({ isLoading: true, error: null });
    try {
      const response = await reportAPI.breakdown(params);
      set({
        breakdown: response,
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

  // Fetch budget status
  fetchBudgetStatus: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await reportAPI.budgetStatus();
      set({
        budgetStatus: response,
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

  // Fetch monthly report
  fetchMonthlyReport: async (year, month) => {
    set({ isLoading: true, error: null });
    try {
      const response = await reportAPI.monthlyReport(year, month);
      set({ isLoading: false });
      return response;
    } catch (error) {
      set({
        error: error.message,
        isLoading: false,
      });
      throw error;
    }
  },

  // Get unread alerts count
  getUnreadCount: () => {
    const { alerts } = get();
    return alerts.filter((alert) => !alert.is_read).length;
  },

  // Get alerts by type
  getAlertsByType: (type) => {
    const { alerts } = get();
    return alerts.filter((alert) => alert.alert_type === type);
  },

  // Clear error
  clearError: () => {
    set({ error: null });
  },
}));
