# API Reference for React Frontend

This document details how to use the API service layer to interact with your Django backend.

---

## API Service Structure

Location: `src/services/api.js`

The service layer provides four main API modules:

```javascript
import { authAPI, transactionAPI, budgetAPI, reportAPI } from './services/api';
```

---

## Authentication API

### authAPI.register(userData)

Register a new user account.

**Parameters:**
```javascript
{
  username: string (required),
  email: string (required),
  password: string (required, min 8 chars),
  password2: string (required, must match password),
  first_name: string (optional),
  last_name: string (optional)
}
```

**Returns:**
```javascript
{
  user: { id, username, email, first_name, last_name, profile: {...} },
  token: "abc123..."
}
```

**Usage:**
```javascript
const { register } = useAuthStore();
await register({
  username: 'john_doe',
  email: 'john@example.com',
  password: 'securepass123',
  password2: 'securepass123',
  first_name: 'John'
});
```

---

### authAPI.login(credentials)

Authenticate user and get token.

**Parameters:**
```javascript
{
  username: string (required),
  password: string (required)
}
```

**Returns:**
```javascript
{
  user: { id, username, email, first_name, last_name, profile: {...} },
  token: "abc123..."
}
```

**Usage:**
```javascript
const { login } = useAuthStore();
await login({
  username: 'john_doe',
  password: 'securepass123'
});
```

---

### authAPI.getProfile()

Get current user's profile information.

**Returns:**
```javascript
{
  id: 1,
  username: "john_doe",
  email: "john@example.com",
  first_name: "John",
  last_name: "Doe",
  profile: {
    id: 1,
    bio: "Finance enthusiast",
    phone_number: "+1234567890",
    base_currency: "USD",
    created_at: "2025-12-13T10:00:00Z",
    updated_at: "2025-12-13T10:00:00Z"
  }
}
```

**Usage:**
```javascript
const { getProfile } = useAuthStore();
const profile = await getProfile();
```

---

### authAPI.updateProfile(profileData)

Update user profile information.

**Parameters:**
```javascript
{
  first_name: string,
  last_name: string,
  bio: string,
  phone_number: string,
  base_currency: string
}
```

**Returns:** Updated profile object

**Usage:**
```javascript
const { updateProfile } = useAuthStore();
await updateProfile({
  bio: 'New bio',
  phone_number: '+1234567890'
});
```

---

### authAPI.logout()

Logout current user.

**Returns:**
```javascript
{ message: "Successfully logged out" }
```

**Usage:**
```javascript
const { logout } = useAuthStore();
await logout();
```

---

## Transaction API

### transactionAPI.income.list(params)

Fetch all income records for current user.

**Parameters (Query):**
```javascript
{
  category: number,        // Filter by category ID
  date: string,           // Filter by date (YYYY-MM-DD)
  search: string,         // Search in description
  ordering: string,       // Order by: date, amount, created_at
  page: number            // Pagination page
}
```

**Returns:**
```javascript
{
  count: 5,
  next: null,
  previous: null,
  results: [
    {
      id: 1,
      user: 1,
      category: 1,
      category_name: "Salary",
      amount: "5000.00",
      date: "2025-12-01",
      description: "Monthly salary",
      created_at: "2025-12-01T10:00:00Z",
      updated_at: "2025-12-01T10:00:00Z"
    }
  ]
}
```

**Usage:**
```javascript
const { fetchIncomes } = useTransactionStore();
// Fetch all
await fetchIncomes();
// With filters
await fetchIncomes({ category: 1, ordering: '-date' });
```

---

### transactionAPI.income.create(incomeData)

Create a new income record.

**Parameters:**
```javascript
{
  category: number (required),
  amount: string (required),     // "1000.00"
  date: string (required),       // "2025-12-01"
  description: string (optional)
}
```

**Returns:** Created income object with ID

**Usage:**
```javascript
const { createIncome } = useTransactionStore();
await createIncome({
  category: 1,
  amount: '5000.00',
  date: '2025-12-01',
  description: 'Monthly salary'
});
```

---

### transactionAPI.income.update(id, incomeData)

Update an income record.

**Parameters:**
```javascript
id: number,
incomeData: { category, amount, date, description }
```

**Returns:** Updated income object

**Usage:**
```javascript
const { updateIncome } = useTransactionStore();
await updateIncome(1, {
  amount: '5500.00',
  description: 'Updated salary'
});
```

---

### transactionAPI.income.delete(id)

Delete an income record.

**Returns:** No content (204)

**Usage:**
```javascript
const { deleteIncome } = useTransactionStore();
await deleteIncome(1);
```

---

### transactionAPI.expenses.list(params)

Fetch all expense records.

**Parameters (Query):**
```javascript
{
  category: number,
  date: string,
  currency: string,
  search: string,
  ordering: string,
  page: number
}
```

**Returns:** Paginated list of expenses

```javascript
{
  results: [
    {
      id: 1,
      user: 1,
      category: 2,
      category_name: "Groceries",
      amount: "75.50",
      date: "2025-12-12",
      description: "Weekly groceries",
      currency: "USD",
      original_amount: "75.50",
      exchange_rate: "1.0000",
      created_at: "2025-12-12T15:30:00Z",
      updated_at: "2025-12-12T15:30:00Z"
    }
  ]
}
```

**Usage:**
```javascript
const { fetchExpenses } = useTransactionStore();
await fetchExpenses();
await fetchExpenses({ category: 2, ordering: '-date' });
```

---

### transactionAPI.expenses.create(expenseData)

Create a new expense record.

**Parameters:**
```javascript
{
  category: number (required),
  amount: string (required),
  date: string (required),
  description: string (optional),
  currency: string (default: "USD"),
  original_amount: string (optional),
  exchange_rate: string (default: "1.0")
}
```

**Returns:** Created expense object

**Usage:**
```javascript
const { createExpense } = useTransactionStore();
await createExpense({
  category: 2,
  amount: '75.50',
  date: '2025-12-12',
  description: 'Weekly groceries',
  currency: 'USD'
});
```

---

## Budget API

### budgetAPI.categories.list(params)

Fetch all spending categories.

**Parameters (Query):**
```javascript
{
  type: string,        // "income" or "expense"
  is_default: boolean, // Filter default categories
  search: string       // Search by name
}
```

**Returns:**
```javascript
{
  results: [
    {
      id: 1,
      user: null,           // null = default category
      name: "Salary",
      type: "income",
      description: "Income from employment",
      icon: "💰",
      is_default: true,
      created_at: "2025-12-13T10:00:00Z",
      updated_at: "2025-12-13T10:00:00Z"
    }
  ]
}
```

**Usage:**
```javascript
const { fetchCategories } = useBudgetStore();
// All categories
await fetchCategories();
// Only expense categories
await fetchCategories({ type: 'expense' });
// Only default categories
await fetchCategories({ is_default: true });
```

---

### budgetAPI.categories.create(categoryData)

Create a custom category.

**Parameters:**
```javascript
{
  name: string (required),
  type: string (required),      // "income" or "expense"
  description: string (optional),
  icon: string (optional)       // emoji or unicode
}
```

**Returns:** Created category object with ID

**Usage:**
```javascript
const { createCategory } = useBudgetStore();
await createCategory({
  name: 'Dining Out',
  type: 'expense',
  description: 'Restaurant and food expenses',
  icon: '🍽️'
});
```

---

### budgetAPI.budgets.list(params)

Fetch all budgets for current user.

**Parameters (Query):**
```javascript
{
  category: number,
  page: number
}
```

**Returns:**
```javascript
{
  results: [
    {
      id: 1,
      user: 1,
      category: 2,
      limit_amount: "500.00",
      start_date: "2025-12-01",
      end_date: "2025-12-31",
      created_at: "2025-12-01T10:00:00Z",
      updated_at: "2025-12-01T10:00:00Z"
    }
  ]
}
```

**Usage:**
```javascript
const { fetchBudgets } = useBudgetStore();
await fetchBudgets();
await fetchBudgets({ category: 2 });
```

---

### budgetAPI.budgets.create(budgetData)

Create a new budget with spending limit.

**Parameters:**
```javascript
{
  category: number (required),
  limit_amount: string (required),  // "500.00"
  start_date: string (required),    // "2025-12-01"
  end_date: string (required)       // "2025-12-31"
}
```

**Returns:** Created budget object

**Usage:**
```javascript
const { createBudget } = useBudgetStore();
await createBudget({
  category: 2,
  limit_amount: '500.00',
  start_date: '2025-12-01',
  end_date: '2025-12-31'
});
```

---

### budgetAPI.goals.list(params)

Fetch all savings goals.

**Parameters (Query):**
```javascript
{
  is_completed: boolean,
  page: number
}
```

**Returns:**
```javascript
{
  results: [
    {
      id: 1,
      user: 1,
      name: "Emergency Fund",
      description: "Save for emergencies",
      target_amount: "5000.00",
      current_amount: "1200.00",
      target_date: "2026-12-31",
      category: null,
      is_completed: false,
      progress_percentage: 24.0,
      created_at: "2025-12-01T10:00:00Z",
      updated_at: "2025-12-01T10:00:00Z"
    }
  ]
}
```

**Usage:**
```javascript
const { fetchGoals } = useBudgetStore();
await fetchGoals();
await fetchGoals({ is_completed: false });
```

---

### budgetAPI.goals.create(goalData)

Create a new savings goal.

**Parameters:**
```javascript
{
  name: string (required),
  target_amount: string (required),
  current_amount: string (default: "0"),
  target_date: string (required),   // "2026-12-31"
  description: string (optional),
  category: number (optional)
}
```

**Returns:** Created goal object

**Usage:**
```javascript
const { createGoal } = useBudgetStore();
await createGoal({
  name: 'Emergency Fund',
  target_amount: '5000.00',
  target_date: '2026-12-31',
  description: 'Save for emergencies'
});
```

---

### budgetAPI.goals.update(id, goalData)

Update a goal (e.g., add progress).

**Parameters:**
```javascript
id: number,
goalData: { current_amount, is_completed, ... }
```

**Returns:** Updated goal object

**Usage:**
```javascript
const { updateGoal } = useBudgetStore();
// Add $500 to goal progress
await updateGoal(1, {
  current_amount: '1700.00'
});
// Mark as completed
await updateGoal(1, {
  is_completed: true
});
```

---

## Report API

### reportAPI.alerts.list(params)

Fetch alerts for current user.

**Parameters (Query):**
```javascript
{
  alert_type: string,  // "danger", "success", "tip", "info"
  is_read: boolean,
  page: number
}
```

**Returns:**
```javascript
{
  results: [
    {
      id: 1,
      user: 1,
      title: "Budget Warning",
      message: "You've spent 80% of your Groceries budget",
      alert_type: "danger",
      is_read: false,
      related_category: "Groceries",
      created_at: "2025-12-13T10:00:00Z",
      updated_at: "2025-12-13T10:00:00Z"
    }
  ]
}
```

**Usage:**
```javascript
const { fetchAlerts } = useReportStore();
// All alerts
await fetchAlerts();
// Only unread
await fetchAlerts({ is_read: false });
// Only dangers
await fetchAlerts({ alert_type: 'danger' });
```

---

### reportAPI.alerts.markAsRead(id)

Mark an alert as read.

**Parameters:**
```javascript
id: number
```

**Returns:** Updated alert object

**Usage:**
```javascript
const { markAlertAsRead } = useReportStore();
await markAlertAsRead(1);
```

---

### reportAPI.summary(params)

Get dashboard summary data.

**Parameters (Query):**
```javascript
{
  year: number,
  month: number
}
```

**Returns:** Summary statistics

**Usage:**
```javascript
const { fetchSummary } = useReportStore();
const summary = await fetchSummary();
// With specific month
await fetchSummary({ year: 2025, month: 12 });
```

---

### reportAPI.monthlyReport(year, month)

Get detailed monthly report.

**Parameters:**
```javascript
year: number,  // 2025
month: number  // 12
```

**Returns:** Monthly financial report

**Usage:**
```javascript
const { fetchMonthlyReport } = useReportStore();
const report = await fetchMonthlyReport(2025, 12);
```

---

## Error Handling

All API calls can throw errors with this structure:

```javascript
{
  status: 400,
  message: "Validation error",
  data: {
    field_name: ["Error message"]
  }
}
```

### Example Error Handling

```javascript
try {
  await createIncome({ amount: 'invalid' });
} catch (error) {
  console.error('Status:', error.status);          // 400
  console.error('Message:', error.message);        // "Validation error"
  console.error('Details:', error.data);           // { amount: ["..."] }
}
```

### In Components

```javascript
const MyComponent = () => {
  const { createExpense, error, clearError } = useTransactionStore();
  
  return (
    <div>
      {error && (
        <div className="error-message">
          {error}
          <button onClick={clearError}>Dismiss</button>
        </div>
      )}
    </div>
  );
};
```

---

## Helper Functions in Stores

### useTransactionStore

```javascript
getTotalIncome()      // Sum of all income
getTotalExpenses()    // Sum of all expenses
getNetBalance()       // Income - Expenses
clearError()          // Clear error state
```

### useBudgetStore

```javascript
getCategoryById(id)           // Get category object by ID
getCategoriesByType(type)     // Get categories filtered by type
clearError()                  // Clear error state
```

### useReportStore

```javascript
getUnreadCount()      // Count of unread alerts
getAlertsByType(type) // Get alerts filtered by type
clearError()          // Clear error state
```

---

## Authentication Header

All authenticated requests automatically include:

```
Authorization: Token <user_token>
```

The token is managed automatically by the store system. No manual header management needed!

---

## Pagination

For list endpoints, responses include:

```javascript
{
  count: 100,           // Total items
  next: "...?page=2",  // Next page URL
  previous: null,       // Previous page URL
  results: [...]        // Items on this page
}
```

### Handling Pagination

```javascript
const response = await transactionAPI.income.list({ page: 2 });
console.log(response.count);      // 100 total items
console.log(response.results);    // Items on page 2
console.log(response.next);       // URL for page 3 (or null)
```

---

## Rate Limiting

No explicit rate limiting on development server. Production API may have limits.

---

## Data Types

### Amount Format

Always use strings for amounts (decimal):
```javascript
amount: "1000.00"      // ✅ Correct
amount: 1000.00        // ❌ Incorrect (can cause precision issues)
```

### Date Format

Dates use ISO 8601 format:
```javascript
date: "2025-12-13"     // ✅ Correct (YYYY-MM-DD)
date: "12/13/2025"     // ❌ Incorrect
```

### Currency Codes

Use 3-letter ISO codes:
```javascript
currency: "USD"        // ✅ Correct
currency: "dollars"    // ❌ Incorrect
```

---

## Common Patterns

### Loading Data on Mount

```javascript
useEffect(() => {
  const loadData = async () => {
    try {
      await fetchIncomes();
      await fetchExpenses();
    } catch (error) {
      console.error('Failed to load:', error);
    }
  };
  loadData();
}, []); // Empty dependency array = run once on mount
```

### Real-time Updates

After creating/updating data, the store automatically updates:

```javascript
// This automatically updates store state
await createExpense(data);

// Component re-renders automatically thanks to Zustand
// No manual state updates needed!
```

### Conditional Rendering Based on Loading

```javascript
const { isLoading } = useTransactionStore();

return isLoading ? <LoadingSpinner /> : <TransactionList />;
```

---

This API reference covers all available endpoints and how to use them from your React components!

