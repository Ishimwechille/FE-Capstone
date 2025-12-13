/**
 * API Service Layer
 * Handles all HTTP requests to the Django backend
 * Base URL: http://localhost:8000/api/
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

/**
 * Fetch wrapper with token authentication
 */
const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('access_token');
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
    console.log(`🔐 Sending token with ${options.method || 'GET'} ${endpoint}`);
    console.log(`   Token: ${token.substring(0, 20)}...`);
  } else if (options.method !== 'GET' || endpoint !== '/auth/login/' && endpoint !== '/auth/register/') {
    // Only log if it's not a login/register request
    console.warn(`⚠️ No access token found for ${options.method || 'GET'} ${endpoint}`);
  }

  console.log(`📤 API Request: ${options.method || 'GET'} ${API_BASE_URL}${endpoint}`);
  console.log(`   Headers:`, headers);

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  console.log(`📥 API Response: ${response.status} ${response.statusText}`);

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    console.error(`❌ API Error:`, error);
    throw {
      status: response.status,
      message: error.detail || error.message || 'An error occurred',
      data: error,
    };
  }

  return response.json();
};

// ==================== AUTH ENDPOINTS ====================

export const authAPI = {
  // Register new user
  register: async (userData) => {
    return apiCall('/auth/register/', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // Login user
  login: async (credentials) => {
    return apiCall('/auth/login/', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  // Get user profile
  getProfile: async () => {
    return apiCall('/auth/profile/');
  },

  // Logout
  logout: async () => {
    return apiCall('/auth/logout/', {
      method: 'POST',
    });
  },

  // Update profile
  updateProfile: async (profileData) => {
    return apiCall('/auth/profile/', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },
};

// ==================== TRANSACTION ENDPOINTS ====================

export const transactionAPI = {
  // Income endpoints
  income: {
    list: async (params = {}) => {
      const queryString = new URLSearchParams(params).toString();
      return apiCall(`/transactions/income/?${queryString}`);
    },

    create: async (incomeData) => {
      return apiCall('/transactions/income/', {
        method: 'POST',
        body: JSON.stringify(incomeData),
      });
    },

    update: async (id, incomeData) => {
      return apiCall(`/transactions/income/${id}/`, {
        method: 'PUT',
        body: JSON.stringify(incomeData),
      });
    },

    delete: async (id) => {
      return apiCall(`/transactions/income/${id}/`, {
        method: 'DELETE',
      });
    },
  },

  // Expense endpoints
  expenses: {
    list: async (params = {}) => {
      const queryString = new URLSearchParams(params).toString();
      return apiCall(`/transactions/expenses/?${queryString}`);
    },

    create: async (expenseData) => {
      return apiCall('/transactions/expenses/', {
        method: 'POST',
        body: JSON.stringify(expenseData),
      });
    },

    update: async (id, expenseData) => {
      return apiCall(`/transactions/expenses/${id}/`, {
        method: 'PUT',
        body: JSON.stringify(expenseData),
      });
    },

    delete: async (id) => {
      return apiCall(`/transactions/expenses/${id}/`, {
        method: 'DELETE',
      });
    },
  },
};

// ==================== BUDGET ENDPOINTS ====================

export const budgetAPI = {
  // Categories
  categories: {
    list: async (params = {}) => {
      const queryString = new URLSearchParams(params).toString();
      return apiCall(`/budgets/categories/?${queryString}`);
    },

    create: async (categoryData) => {
      return apiCall('/budgets/categories/', {
        method: 'POST',
        body: JSON.stringify(categoryData),
      });
    },

    update: async (id, categoryData) => {
      return apiCall(`/budgets/categories/${id}/`, {
        method: 'PUT',
        body: JSON.stringify(categoryData),
      });
    },

    delete: async (id) => {
      return apiCall(`/budgets/categories/${id}/`, {
        method: 'DELETE',
      });
    },
  },

  // Budgets
  budgets: {
    list: async (params = {}) => {
      const queryString = new URLSearchParams(params).toString();
      return apiCall(`/budgets/budgets/?${queryString}`);
    },

    create: async (budgetData) => {
      return apiCall('/budgets/budgets/', {
        method: 'POST',
        body: JSON.stringify(budgetData),
      });
    },

    update: async (id, budgetData) => {
      return apiCall(`/budgets/budgets/${id}/`, {
        method: 'PUT',
        body: JSON.stringify(budgetData),
      });
    },

    delete: async (id) => {
      return apiCall(`/budgets/budgets/${id}/`, {
        method: 'DELETE',
      });
    },
  },

  // Goals
  goals: {
    list: async (params = {}) => {
      const queryString = new URLSearchParams(params).toString();
      return apiCall(`/budgets/goals/?${queryString}`);
    },

    create: async (goalData) => {
      return apiCall('/budgets/goals/', {
        method: 'POST',
        body: JSON.stringify(goalData),
      });
    },

    update: async (id, goalData) => {
      return apiCall(`/budgets/goals/${id}/`, {
        method: 'PUT',
        body: JSON.stringify(goalData),
      });
    },

    delete: async (id) => {
      return apiCall(`/budgets/goals/${id}/`, {
        method: 'DELETE',
      });
    },
  },
};

// ==================== REPORT ENDPOINTS ====================

export const reportAPI = {
  // Alerts
  alerts: {
    list: async (params = {}) => {
      const queryString = new URLSearchParams(params).toString();
      return apiCall(`/reports/alerts/?${queryString}`);
    },

    markAsRead: async (id) => {
      return apiCall(`/reports/alerts/${id}/`, {
        method: 'PATCH',
        body: JSON.stringify({ is_read: true }),
      });
    },
  },

  // Dashboard summary
  summary: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`/reports/summary/?${queryString}`);
  },

  // Monthly report
  monthlyReport: async (year, month) => {
    return apiCall(`/reports/monthly/${year}/${month}/`);
  },
};

export default {
  authAPI,
  transactionAPI,
  budgetAPI,
  reportAPI,
};
