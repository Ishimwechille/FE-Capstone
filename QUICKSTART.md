# Advanced Financial Navigator (AFN) - Quick Start Guide

## 🚀 Project Status

Your React frontend is now **fully integrated** with your Django backend and ready to use!

---

## 📋 What's Been Created

### Services Layer
✅ Complete API service layer (`src/services/api.js`)
- Auth endpoints (login, register, logout, profile)
- Transaction endpoints (income, expenses)
- Budget endpoints (categories, budgets, goals)
- Report endpoints (alerts, summary, monthly reports)

### State Management (Zustand)
✅ **authStore.js** - User authentication state
✅ **transactionStore.js** - Income/expense data
✅ **budgetStore.js** - Categories, budgets, goals
✅ **reportStore.js** - Alerts and reports

### Pages & Components

**Pages:**
- ✅ LoginPage - User authentication
- ✅ SignupPage - New user registration
- ✅ DashboardPage - Financial overview
- ✅ TransactionsPage - Manage income/expenses
- ✅ BudgetsPage - Set spending limits & categories
- ✅ GoalsPage - Track savings goals
- ✅ ReportsPage - View financial reports

**Components:**
- ✅ Layout - Main app wrapper
- ✅ Header - Top navigation
- ✅ Sidebar - Left menu
- ✅ PrivateRoute - Protected routes
- ✅ DashboardSummaryCard - Financial cards
- ✅ TransactionForm - Add transactions
- ✅ TransactionList - View transactions
- ✅ BudgetForm - Create budgets
- ✅ BudgetList - View budgets
- ✅ CategoryForm - Manage categories
- ✅ GoalForm - Create goals
- ✅ GoalCard - Display goals
- ✅ SpendingChart - Pie chart visualization
- ✅ IncomeVsExpensesChart - Bar chart
- ✅ AlertsPanel - Notifications
- ✅ RecentTransactions - Latest activity

---

## ⚡ Quick Start

### Step 1: Install Dependencies

```bash
cd FE-Capstone
npm install
```

This installs all required packages:
- react & react-dom
- react-router-dom (for routing)
- zustand (state management)
- tailwindcss (styling)
- chart.js & react-chartjs-2 (charts)
- axios (HTTP client)

### Step 2: Start Backend

```bash
cd BE-Capstone
python manage.py runserver
```

Backend runs on: `http://localhost:8000`

**API Documentation:** `http://localhost:8000/api/docs/`

### Step 3: Start Frontend

```bash
cd FE-Capstone
npm run dev
```

Frontend runs on: `http://localhost:3000`

### Step 4: Login

Navigate to `http://localhost:3000` and login with:

- **Username:** (Create a new account or use test data)
- **Password:** (Set when creating account)

---

## 📊 Feature Walkthrough

### Dashboard
- View total income, expenses, net balance
- See recent transactions
- Check unread alerts

### Transactions
- Add income and expenses
- Filter by type or category
- View transaction history

### Budgets
- Create spending limits for categories
- Track spending against budgets
- Create custom categories

### Goals
- Set savings targets
- Track progress to goals
- Get notifications when goals completed

### Reports
- View spending breakdown by category
- Compare income vs expenses
- Analyze financial trends

---

## 🔧 Configuration

### Environment Variables

Create `.env` file (copy from `.env.example`):

```env
REACT_APP_API_URL=http://localhost:8000/api
```

For production, update this to your production backend URL.

---

## 📱 Backend Integration Reference

### How Data Flows

```
User Action → React Component
    ↓
    → Zustand Store (useTransactionStore, etc.)
    ↓
    → API Service Layer (api.js)
    ↓
    → HTTP Request with Token Auth
    ↓
    → Django Backend (DRF Endpoint)
    ↓
    → Database
    ↓
    → Response → Store Updates → Component Re-renders
```

### Key API Endpoints

**Auth:**
- `POST /auth/register/` - Sign up
- `POST /auth/login/` - Sign in
- `GET /auth/profile/` - Get user info

**Transactions:**
- `GET /transactions/income/` - List income
- `POST /transactions/income/` - Create income
- `GET /transactions/expenses/` - List expenses
- `POST /transactions/expenses/` - Create expense

**Budgets:**
- `GET /budgets/categories/` - List categories
- `POST /budgets/budgets/` - Create budget
- `GET /budgets/goals/` - List goals
- `POST /budgets/goals/` - Create goal

**Reports:**
- `GET /reports/alerts/` - Get alerts
- `GET /reports/summary/` - Get dashboard summary

---

## 🎨 Styling

The app uses **Tailwind CSS** with:
- Responsive grid layouts
- Color-coded sections (green for income, red for expenses, blue for balance)
- Smooth transitions and hover effects
- Mobile-first design

To customize styles, edit component className or tailwind.config.js.

---

## 🔐 Authentication

### How It Works

1. User enters credentials
2. Backend validates and returns token
3. Token stored in localStorage
4. Token automatically sent with every API request
5. Backend validates token, returns data
6. User session persists on page refresh

### Token Management

```javascript
// Automatic in useAuthStore
localStorage.getItem('token')      // Get token
localStorage.setItem('token', ...)  // Save token
localStorage.removeItem('token')    // Clear on logout
```

---

## 🚨 Troubleshooting

### "Cannot connect to backend"

✗ Backend not running on port 8000
✓ Check: `python manage.py runserver`

### "Login fails with 401"

✗ Invalid credentials or token expired
✓ Create new account via signup page
✓ Check backend logs for errors

### "CORS errors"

✗ Backend doesn't allow frontend origin
✓ Check Django `CORS_ALLOWED_ORIGINS` setting
✓ Should include `http://localhost:3000`

### "Transactions not loading"

✗ API not returning data
✓ Check Network tab in DevTools
✓ Verify token is being sent
✓ Check backend database has data

### "Styles not applying"

✗ Tailwind CSS not compiled
✓ Run: `npm run dev` (rebuilds CSS)
✓ Clear browser cache (Ctrl+Shift+Delete)

---

## 📚 Project Structure Details

```
src/
├── services/
│   └── api.js                  # All API calls
│
├── store/                      # Zustand stores
│   ├── authStore.js           # Auth state & actions
│   ├── transactionStore.js    # Transaction state
│   ├── budgetStore.js         # Budget state
│   └── reportStore.js         # Report state
│
├── pages/                      # Page components
│   ├── LoginPage.jsx
│   ├── SignupPage.jsx
│   ├── DashboardPage.jsx
│   ├── TransactionsPage.jsx
│   ├── BudgetsPage.jsx
│   ├── GoalsPage.jsx
│   └── ReportsPage.jsx
│
├── components/                 # Reusable components
│   ├── Layout.jsx             # Main wrapper
│   ├── Header.jsx             # Top nav
│   ├── Sidebar.jsx            # Side menu
│   ├── PrivateRoute.jsx       # Route protection
│   ├── DashboardSummaryCard.jsx
│   ├── TransactionForm.jsx
│   ├── TransactionList.jsx
│   ├── BudgetForm.jsx
│   ├── BudgetList.jsx
│   ├── CategoryForm.jsx
│   ├── GoalForm.jsx
│   ├── GoalCard.jsx
│   ├── SpendingChart.jsx
│   ├── IncomeVsExpensesChart.jsx
│   ├── AlertsPanel.jsx
│   └── RecentTransactions.jsx
│
├── App.jsx                     # Main app router
├── main.jsx                    # Entry point
└── index.css                   # Global styles
```

---

## 🎯 Using the Store Hooks

### In Any Component

```javascript
import { useTransactionStore } from '../store/transactionStore';

export default function MyComponent() {
  const { expenses, fetchExpenses, createExpense } = useTransactionStore();
  
  // Load data on mount
  useEffect(() => {
    fetchExpenses();
  }, []);
  
  // Use in JSX
  return (
    <div>
      {expenses.map(expense => (
        <div key={expense.id}>{expense.description}</div>
      ))}
    </div>
  );
}
```

---

## 📝 Next Steps

1. **Test Login:**
   - Create new account via signup
   - Login and explore dashboard

2. **Add Test Data:**
   - Go to Transactions page
   - Add sample income and expenses
   - Create budgets and goals

3. **Explore Features:**
   - View Dashboard summary
   - Check Reports section
   - Test Alerts

4. **Customize:**
   - Modify colors in components
   - Add more fields to forms
   - Expand features as needed

5. **Deploy (Optional):**
   - Build: `npm run build`
   - Deploy to hosting (Vercel, Netlify, etc.)
   - Update backend API URL in .env

---

## 🤝 Support & Resources

**Frontend:**
- React: https://react.dev
- React Router: https://reactrouter.com
- Zustand: https://github.com/pmndrs/zustand
- Tailwind CSS: https://tailwindcss.com

**Backend:**
- Django: https://www.djangoproject.com
- DRF: https://www.django-rest-framework.org
- API Docs: `http://localhost:8000/api/docs/`

**Debugging:**
- Check Network tab in DevTools
- Review API responses
- Check browser console for errors
- Check Django logs

---

## ✅ Verification Checklist

Before going live:

- [ ] Backend running on localhost:8000
- [ ] Frontend running on localhost:3000
- [ ] Can register new account
- [ ] Can login successfully
- [ ] Can add transaction
- [ ] Can create budget
- [ ] Can set goal
- [ ] Dashboard shows correct data
- [ ] Transactions display correctly
- [ ] No console errors
- [ ] Network requests show 200 status

---

**You're all set! Happy coding! 🚀**

For detailed integration information, see: `INTEGRATION_GUIDE.md`

