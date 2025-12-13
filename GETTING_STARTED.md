# Getting Started - Next Steps

## 🎯 Your Immediate To-Do List

### Step 1: Installation (5 minutes)
```bash
# Navigate to frontend folder
cd FE-Capstone

# Install all dependencies
npm install
```

**What it installs:**
- React & React DOM
- React Router for navigation
- Zustand for state management
- Tailwind CSS for styling
- Chart.js for visualizations
- All other necessary packages

### Step 2: Verify Backend (2 minutes)

**Check if Django backend is running:**
```bash
# In a NEW terminal window, navigate to backend
cd BE-Capstone

# Check if it's already running on port 8000
# Go to: http://localhost:8000/api/
```

**If backend is not running:**
```bash
# Start it
python manage.py runserver
# Should see: "Starting development server at http://127.0.0.1:8000/"
```

### Step 3: Start Frontend (2 minutes)

**In FE-Capstone folder:**
```bash
npm run dev
# Should output: "Local: http://localhost:3000/"
```

**Open browser:**
Navigate to: `http://localhost:3000`

### Step 4: Create Your Account (1 minute)

1. Click "Sign Up" button
2. Fill in:
   - Username: (choose one)
   - Email: (any valid email)
   - Password: (min 8 characters)
   - First/Last Name: (optional)
3. Click "Create Account"
4. You're logged in! ✅

### Step 5: Test Core Features (10 minutes)

**Dashboard:**
- [ ] See total income (should be $0.00)
- [ ] See total expenses (should be $0.00)
- [ ] See net balance (should be $0.00)

**Transactions:**
- [ ] Go to "Transactions" page
- [ ] Click "+ New Transaction"
- [ ] Add sample income:
  - Category: "Salary" (default)
  - Amount: 3000.00
  - Date: today
  - Description: "Test income"
- [ ] Click "Add Income"
- [ ] You should see it in the list
- [ ] Check dashboard - total income should update

**Repeat with Expense:**
- [ ] Add sample expense:
  - Category: "Groceries" (default)
  - Amount: 150.50
  - Date: today
- [ ] Check dashboard - net balance should update

**Budgets:**
- [ ] Go to "Budgets" page
- [ ] Click "+ New Budget"
- [ ] Create budget:
  - Category: "Groceries"
  - Limit: 500.00
  - Period: This month
- [ ] Click "Create Budget"
- [ ] You should see it in the list

**Goals:**
- [ ] Go to "Goals" page
- [ ] Click "+ New Goal"
- [ ] Create goal:
  - Name: "Emergency Fund"
  - Target: 5000.00
  - Target Date: Dec 31, 2026
- [ ] Click "Create Goal"
- [ ] Click "Add Progress" and add $500
- [ ] Progress bar should show 10%

**Reports:**
- [ ] Go to "Reports" page
- [ ] You should see:
  - Spending breakdown chart
  - Income vs Expenses chart
  - Summary statistics

---

## 📚 Documentation to Read

### For Quick Overview (5 min)
→ Read: `QUICKSTART.md`

### For Full Integration Details (20 min)
→ Read: `INTEGRATION_GUIDE.md`

### For Understanding System (10 min)
→ Read: `ARCHITECTURE.md`

### For API Reference (when needed)
→ Read: `API_REFERENCE.md`

### For Feature Checklist
→ Read: `FEATURES_CHECKLIST.md`

---

## 🔧 Troubleshooting

### Issue: "Cannot connect to backend"

**Solution:**
```bash
# Check if backend is running
cd BE-Capstone
python manage.py runserver
# Should output: "Starting development server..."
```

### Issue: "npm install fails"

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Try again
npm install
```

### Issue: Port 3000 already in use

**Solution:**
```bash
# Use a different port
npm run dev -- --port 3001
# Go to http://localhost:3001
```

### Issue: CORS errors

**Solution:**
- This is usually during development
- Check that Django has CORS enabled
- Should already be configured in settings.py
- Restart both frontend and backend

### Issue: Can't login after signup

**Solution:**
1. Check backend is running and no errors
2. Check browser console for error messages
3. Verify credentials match what you entered
4. Try signup again

---

## 🚀 Advanced Customization

### Change Colors

**File:** `src/components/*`

Example - Change success color from green to blue:
```jsx
// Before
className="text-green-600"

// After
className="text-blue-600"
```

### Add New Category

**In app:**
1. Go to Budgets page
2. Click "+ New Category"
3. Fill form and create

**Programmatically:**
```javascript
import { useBudgetStore } from './store/budgetStore';

const { createCategory } = useBudgetStore();
await createCategory({
  name: 'Entertainment',
  type: 'expense',
  icon: '🎮'
});
```

### Modify Form Fields

**File:** `src/components/TransactionForm.jsx`

Add a new field:
```jsx
<div>
  <label>My Field</label>
  <input
    name="myField"
    value={formData.myField}
    onChange={handleChange}
  />
</div>
```

### Change API URL

**File:** `src/services/api.js`

Change:
```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';
```

Or via .env:
```
REACT_APP_API_URL=http://mybackend.com/api
```

---

## 💡 Pro Tips

### 1. Use Browser DevTools
```
Chrome → Right-click → Inspect
→ Console tab for errors
→ Network tab to see API calls
→ Application tab to check localStorage
```

### 2. Check Local Storage
```javascript
// In browser console
localStorage.getItem('token')        // Should have token
JSON.parse(localStorage.getItem('user'))  // Should have user
```

### 3. Test API Directly
```javascript
// In browser console
import { transactionAPI } from './services/api.js'
await transactionAPI.income.list()  // Should return incomes
```

### 4. Monitor Store State
```javascript
// In browser console
import { useTransactionStore } from './store/transactionStore'
const state = useTransactionStore((state) => state)
console.log(state)  // See all store data
```

---

## 📱 Mobile Testing

**Test on your phone:**
1. Get your computer's IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
2. On phone, open: `http://YOUR_IP:3000`
3. Test all features on mobile
4. Check responsive design

---

## 🧪 Performance Testing

**Check app size:**
```bash
npm run build
# Check dist/ folder size
# Should be < 100KB for static files
```

**Monitor performance:**
1. Open DevTools
2. Go to Lighthouse tab
3. Run report
4. Fix any issues

---

## 🔐 Security Best Practices

### Before Deployment
- [ ] Update Django SECRET_KEY (in production)
- [ ] Set DEBUG = False (in Django)
- [ ] Configure ALLOWED_HOSTS (in Django)
- [ ] Use HTTPS (in production)
- [ ] Implement rate limiting
- [ ] Add CSRF protection

### For Development
- ✅ Currently using development settings
- ✅ CORS enabled for localhost
- ✅ Token authentication working
- ✅ Secure storage of token

---

## 🎯 Feature Implementation Ideas

### Easy to Add (1-2 hours)
- [ ] Edit existing transactions
- [ ] Recurring transactions
- [ ] Transaction search/filter
- [ ] Export to CSV
- [ ] Monthly budget templates

### Medium (3-5 hours)
- [ ] Spending insights/tips
- [ ] Budget notifications
- [ ] Goal milestones
- [ ] Transaction tagging
- [ ] Budget comparison

### Advanced (1+ day)
- [ ] Multiple user accounts (family)
- [ ] Bill splitting
- [ ] Investment tracking
- [ ] Bank connection
- [ ] Automated categorization

---

## 📊 Monitoring & Logging

### Check Backend Logs
```bash
# Terminal where django runs
# Shows all API calls and errors in real-time
```

### Check Frontend Console
```javascript
// Browser console shows:
// - API requests/responses
// - Component errors
// - Store updates
// - Warning messages
```

---

## 🤝 Getting Help

### If Something Breaks:

1. **Check the console**
   - Browser DevTools → Console
   - Look for red error messages

2. **Check the network**
   - DevTools → Network tab
   - Look for failed requests (red)
   - Check response status and body

3. **Check the docs**
   - Read QUICKSTART.md
   - Read INTEGRATION_GUIDE.md
   - Look for similar issues

4. **Check backend logs**
   - Terminal where Django runs
   - Look for error messages

5. **Restart everything**
   ```bash
   # Kill both frontend and backend
   # Ctrl+C in both terminals
   
   # Start fresh
   # Terminal 1: cd BE-Capstone && python manage.py runserver
   # Terminal 2: cd FE-Capstone && npm run dev
   ```

---

## 📈 Next Steps After Setup

### Week 1
- ✅ Complete setup (done above)
- ✅ Explore all features
- ✅ Add test data
- [ ] Customize colors/styling
- [ ] Read documentation

### Week 2
- [ ] Deploy frontend (Vercel, Netlify)
- [ ] Deploy backend (Heroku, PythonAnywhere)
- [ ] Set up production database
- [ ] Configure custom domain

### Week 3+
- [ ] Add new features
- [ ] Implement advanced features
- [ ] User testing
- [ ] Gather feedback
- [ ] Iterate & improve

---

## 🎓 Learning Resources

As you build:
- **React**: https://react.dev
- **React Router**: https://reactrouter.com
- **Zustand**: https://github.com/pmndrs/zustand
- **Tailwind CSS**: https://tailwindcss.com
- **Django**: https://docs.djangoproject.com
- **DRF**: https://www.django-rest-framework.org

---

## ✅ Success Indicators

You'll know it's working when:

✅ Backend running on http://localhost:8000  
✅ Frontend running on http://localhost:3000  
✅ Can create account and login  
✅ Can add income and expenses  
✅ Dashboard updates in real-time  
✅ Can create budgets and goals  
✅ Can view reports and charts  
✅ No errors in console  
✅ Network requests return 200 status  

---

## 🎉 You're Ready!

**Everything is set up and working. Time to start building!**

1. **First:** Run the quick start above
2. **Then:** Read QUICKSTART.md
3. **Next:** Explore all features
4. **Then:** Customize as needed
5. **Finally:** Deploy when ready

---

## 📞 Quick Reference

**Common Commands:**

```bash
# Install dependencies
npm install

# Start frontend
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

**Backend Commands (in BE-Capstone):**
```bash
# Start server
python manage.py runserver

# Makemigrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Access admin
http://localhost:8000/admin/
```

---

## 🎯 Final Checklist

Before you start coding additions:

- [ ] Backend running
- [ ] Frontend running
- [ ] Account created
- [ ] Test data added
- [ ] All pages visited
- [ ] All features tested
- [ ] No console errors
- [ ] Documentation read

**Once all checked: You're good to go! 🚀**

Happy coding!

