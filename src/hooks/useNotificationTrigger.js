/**
 * Notification Utility
 * Creates notifications for all user actions
 */

import { useReportStore } from '../store/reportStore';

export function useNotificationTrigger() {
  const { createAlert } = useReportStore();

  const notify = async (title, message, type = 'info') => {
    try {
      await createAlert({
        title,
        message,
        alert_type: type,
      });
    } catch (error) {
      console.error('Error creating notification:', error);
    }
  };

  // Specific notification types
  const notifySuccess = (title, message) => notify(title, message, 'success');
  const notifyError = (title, message) => notify(title, message, 'danger');
  const notifyInfo = (title, message) => notify(title, message, 'info');
  const notifyTip = (title, message) => notify(title, message, 'tip');

  // Goal-specific notifications
  const notifyGoalCreated = (goalName) =>
    notifySuccess('Goal Created! 🎯', `You've created the goal "${goalName}"`);

  const notifyGoalProgressUpdated = (goalName, amount) =>
    notifySuccess('Progress Updated! 📈', `Added $${amount.toFixed(2)} to "${goalName}"`);

  const notifyGoalCompleted = (goalName) =>
    notifySuccess('Goal Completed! 🎉', `Congratulations! You've completed "${goalName}"`);

  const notifyGoalDeleted = (goalName) =>
    notifyInfo('Goal Deleted', `The goal "${goalName}" has been removed`);

  // Alert-specific notifications
  const notifyAlertMarkedRead = () =>
    notifyInfo('Alert Marked', 'Alert marked as read');

  const notifyAllAlertsMarkedRead = (count) =>
    notifyInfo('Alerts Cleared', `${count} alerts marked as read`);

  // Transaction notifications
  const notifyIncomeAdded = (amount, category) =>
    notifySuccess('Income Added! 💰', `+$${amount.toFixed(2)} from ${category}`);

  const notifyExpenseAdded = (amount, category) =>
    notifySuccess('Expense Recorded! 💸', `-$${amount.toFixed(2)} in ${category}`);

  const notifyBudgetWarning = (category, percentage) =>
    notifyTip('Budget Alert ⚠️', `${category} is at ${percentage}% of budget`);

  const notifyBudgetExceeded = (category, amount) =>
    notifyError('Budget Exceeded! 🚨', `${category} exceeded by $${amount.toFixed(2)}`);

  return {
    notify,
    notifySuccess,
    notifyError,
    notifyInfo,
    notifyTip,
    notifyGoalCreated,
    notifyGoalProgressUpdated,
    notifyGoalCompleted,
    notifyGoalDeleted,
    notifyAlertMarkedRead,
    notifyAllAlertsMarkedRead,
    notifyIncomeAdded,
    notifyExpenseAdded,
    notifyBudgetWarning,
    notifyBudgetExceeded,
  };
}
