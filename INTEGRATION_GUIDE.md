# Frontend-Backend Integration Guide

## Project Overview

This is the **Advanced Financial Navigator (AFN)** - a sophisticated React-based financial management application that connects to a Django REST API backend.

### Architecture

```
┌─────────────────────────────────────────────────────────────┐
│              React Frontend (Vite + Zustand)                │
├─────────────────────────────────────────────────────────────┤
│  Pages (Auth, Dashboard, Transactions, Budgets, Goals)     │
│  Components (Forms, Charts, Lists, Cards)                  │
│  Stores (Auth, Transaction, Budget, Report - Zustand)      │
│  Services (API layer)                                      │
├─────────────────────────────────────────────────────────────┤
│              REST API (Django + DRF)                        │
├─────────────────────────────────────────────────────────────┤
│  Database (SQLite)                                          │
└─────────────────────────────────────────────────────────────┘
```

---

## Setup Instructions

### 1. Backend Setup

The backend is already set up at `BE-Capstone/`

**Start the Django server:**
```bash
cd BE-Capstone
python manage.py runserver
```

The API will be available at: `http://localhost:8000/api/`

### 2. Frontend Setup

**Install dependencies:**
```bash
cd FE-Capstone
npm install
```

**Create .env file (optional):**
```bash
cp .env.example .env
```

**Start the development server:**
```bash
npm run dev
```

The app will be available at: `http://localhost:3000`

---

## API Integration Points

### Authentication (`authAPI`)

**Endpoints:**
- `POST /auth/register/` - Register new user
- `POST /auth/login/` - Login user
- `GET /auth/profile/` - Get user profile
- `PUT /auth/profile/` - Update profile
- `POST /auth/logout/` - Logout

**Store:** `src/store/authStore.js`

### Transactions (`transactionAPI`)

**Endpoints:**
- `GET /transactions/income/` - List income
- `POST /transactions/income/` - Create income
- `PUT /transactions/income/{id}/` - Update income
- `DELETE /transactions/income/{id}/` - Delete income
- `GET /transactions/expenses/` - List expenses
- `POST /transactions/expenses/` - Create expense
- `PUT /transactions/expenses/{id}/` - Update expense
- `DELETE /transactions/expenses/{id}/` - Delete expense

**Store:** `src/store/transactionStore.js`

**Key Methods:**
- `fetchIncomes()` - Load all income records
- `createIncome(data)` - Add new income
- `getTotalIncome()` - Calculate sum of income
- `getTotalExpenses()` - Calculate sum of expenses
- `getNetBalance()` - Get income - expenses

### Budgets (`budgetAPI`)

**Endpoints:**
- `GET/POST /budgets/categories/` - Manage categories
- `GET/POST /budgets/budgets/` - Manage budgets
- `GET/POST /budgets/goals/` - Manage goals

**Store:** `src/store/budgetStore.js`

**Key Methods:**
- `fetchCategories()` - Load all categories
- `createBudget(data)` - Create spending limit
- `fetchGoals()` - Load savings goals
- `updateGoal(id, data)` - Update goal progress

### Reports (`reportAPI`)

**Endpoints:**
- `GET /reports/alerts/` - Get alerts
- `PATCH /reports/alerts/{id}/` - Mark alert as read
- `GET /reports/summary/` - Get dashboard summary
- `GET /reports/monthly/{year}/{month}/` - Monthly report

**Store:** `src/store/reportStore.js`

---

## Project Structure

```
FE-Capstone/
├── src/
│   ├── services/
│   │   └── api.js              # API service layer
│   ├── store/
│   │   ├── authStore.js        # Auth state (Zustand)
│   │   ├── transactionStore.js # Transaction state
│   │   ├── budgetStore.js      # Budget state
│   │   └── reportStore.js      # Report state
│   ├── pages/
│   │   ├── LoginPage.jsx
│   │   ├── SignupPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── TransactionsPage.jsx
│   │   ├── BudgetsPage.jsx
│   │   ├── GoalsPage.jsx
│   │   └── ReportsPage.jsx
│   ├── components/
│   │   ├── Layout.jsx          # Main layout
│   │   ├── Header.jsx          # Top navigation
│   │   ├── Sidebar.jsx         # Left menu
│   │   ├── PrivateRoute.jsx    # Protected routes
│   │   ├── DashboardSummaryCard.jsx
│   │   ├── RecentTransactions.jsx
│   │   ├── AlertsPanel.jsx
│   │   ├── TransactionForm.jsx
│   │   ├── TransactionList.jsx
│   │   ├── BudgetForm.jsx
│   │   ├── BudgetList.jsx
│   │   ├── CategoryForm.jsx
│   │   ├── GoalForm.jsx
│   │   ├── GoalCard.jsx
│   │   ├── SpendingChart.jsx
│   │   └── IncomeVsExpensesChart.jsx
│   ├── App.jsx                 # Main app component
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles
├── index.html                  # HTML template
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind CSS config
├── package.json                # Dependencies
└── .env.example                # Environment template
```

---

## State Management (Zustand)

The app uses **Zustand** for state management. Each store handles a specific domain:

### Auth Store

```javascript
import { useAuthStore } from './store/authStore';

const { user, token, login, logout, register } = useAuthStore();
```

### Transaction Store

```javascript
import { useTransactionStore } from './store/transactionStore';

const { 
  incomes, 
  expenses, 
  fetchIncomes, 
  createExpense,
  getTotalIncome,
  getNetBalance 
} = useTransactionStore();
```

### Budget Store

```javascript
import { useBudgetStore } from './store/budgetStore';

const { 
  categories, 
  budgets, 
  goals, 
  fetchCategories,
  createBudget,
  fetchGoals 
} = useBudgetStore();
```

### Report Store

```javascript
import { useReportStore } from './store/reportStore';

const { 
  alerts, 
  fetchAlerts, 
  fetchSummary,
  getUnreadCount 
} = useReportStore();
```

---

## Authentication Flow

### Login Process

1. User enters credentials
2. `authStore.login()` calls `authAPI.login()`
3. Backend returns `token` and `user` data
4. Token stored in localStorage
5. User redirected to dashboard

### Protected Routes

- `PrivateRoute` component checks authentication
- Redirects to `/login` if not authenticated
- Token automatically included in API requests via headers

### Token Header

All authenticated requests include:
```
Authorization: Token <your_token_here>
```

---

## Key Features Implementation

### 1. Dashboard Summary

- Real-time calculation of income, expenses, net balance
- Uses `useTransactionStore()` for data
- Updates on component mount with `useEffect()`

### 2. Recent Transactions

- Sorts transactions by date (newest first)
- Combines income and expenses into single list
- Shows category, description, and amount

### 3. Budget Tracking

- Create monthly budgets per category
- Track spending against limits
- Alert when reaching 80% threshold (backend calculates)

### 4. Savings Goals

- Set target amount and date
- Track progress with visual progress bar
- Mark completed goals

### 5. Smart Alerts

- Danger alert: 80%+ of budget spent
- Success alert: Goal completed
- Tips: Contextual advice based on spending

### 6. Financial Reports

- Spending by category visualization
- Income vs expenses comparison
- Monthly/quarterly trends

---

## Common Tasks

### Fetch Data on Page Load

```javascript
useEffect(() => {
  const loadData = async () => {
    try {
      await fetchIncomes();
      await fetchExpenses();
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };
  loadData();
}, []);
```

### Create a Transaction

```javascript
const { createExpense } = useTransactionStore();

const handleAddExpense = async (formData) => {
  try {
    await createExpense({
      category: 2,
      amount: '75.50',
      date: '2025-12-12',
      description: 'Weekly groceries',
    });
  } catch (error) {
    console.error('Error:', error);
  }
};
```

### Update Store Data

```javascript
const { incomes, updateIncome } = useTransactionStore();

// Incomes automatically update after API call
// UI re-renders thanks to Zustand reactivity
await updateIncome(id, { amount: '6000.00' });
```

---

## Backend API Documentation

For detailed API documentation, visit:
- **Swagger UI:** `http://localhost:8000/api/docs/`
- **ReDoc:** `http://localhost:8000/api/redoc/`
- **API File:** `BE-Capstone/API_DOCUMENTATION.md`

---

## Error Handling

### API Errors

All API calls in services/api.js throw errors with:
```javascript
{
  status: 401,
  message: "Unauthorized",
  data: { detail: "Invalid credentials" }
}
```

### Store Error Handling

Each store has an `error` state:
```javascript
const { error, clearError } = useBudgetStore();

// Display error in UI
{error && <div className="error">{error}</div>}

// Clear error after handling
clearError();
```

---

## Development Tips

### 1. Testing API Integration

Open browser console and test:
```javascript
import { authAPI } from './services/api';
await authAPI.login({ username: 'demo', password: 'demo123456' });
```

### 2. Check State

```javascript
import { useAuthStore } from './store/authStore';
const state = useAuthStore((state) => state);
console.log(state); // See full store state
```

### 3. LocalStorage Data

```javascript
// Check saved token
localStorage.getItem('token');
// Check saved user
JSON.parse(localStorage.getItem('user'));
```

### 4. Network Debugging

- Open DevTools → Network tab
- Monitor API requests/responses
- Check Authorization headers

---

## Deployment Checklist

- [ ] Update `REACT_APP_API_URL` in `.env` for production backend
- [ ] Build: `npm run build`
- [ ] Test production build: `npm run preview`
- [ ] Check CORS settings in Django (`ALLOWED_HOSTS`, `CORS_ALLOWED_ORIGINS`)
- [ ] Update Django `SECRET_KEY` for production
- [ ] Enable HTTPS in production
- [ ] Set `DEBUG = False` in Django

---

## Troubleshooting

### Issue: "Cannot read property 'results' of undefined"

**Solution:** API might return data directly or wrapped in pagination:
```javascript
const data = response.results || response;
```

### Issue: CORS errors

**Solution:** Ensure Django has CORS enabled:
```python
INSTALLED_APPS = [
    'corsheaders',
]
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
]
CORS_ALLOWED_ORIGINS = ['http://localhost:3000']
```

### Issue: Token not sent to backend

**Solution:** Token must be in localStorage under key `token`:
```javascript
const token = localStorage.getItem('token');
// Should not be null after login
```

### Issue: Login redirect loop

**Solution:** Check `useAuthStore().isAuthenticated()` logic:
```javascript
const isAuthenticated = !!localStorage.getItem('token');
```

---

## Next Steps

1. **Install dependencies:** `npm install`
2. **Start backend:** `python manage.py runserver` (in BE-Capstone/)
3. **Start frontend:** `npm run dev` (in FE-Capstone/)
4. **Login** with test credentials (create in backend first)
5. **Add test data** via API or frontend UI
6. **Test features:** Try creating transactions, budgets, goals

---

## Resources

- [React Documentation](https://react.dev)
- [React Router](https://reactrouter.com)
- [Zustand](https://github.com/pmndrs/zustand)
- [Tailwind CSS](https://tailwindcss.com)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [Vite](https://vitejs.dev)

---

## Support

For issues or questions:
1. Check the backend API documentation at `/api/docs/`
2. Review network requests in DevTools
3. Check console for error messages
4. Verify backend is running on `localhost:8000`
5. Ensure `.env` has correct API URL

