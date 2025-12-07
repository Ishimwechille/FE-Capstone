export function ComponentDiagram() {
  return (
    <div className="grid md:grid-cols-3 gap-6 text-sm">

      <div className="diagram-box">
        App
        <ul className="ml-4 list-disc">
          <li>Header</li>
          <li>Sidebar</li>
          <li>Router</li>
        </ul>
      </div>

      <div className="diagram-box">
        Dashboard
        <ul className="ml-4 list-disc">
          <li>SummaryCard</li>
          <li>NetBalance</li>
        </ul>
      </div>

      <div className="diagram-box">
        Transactions
        <ul className="ml-4 list-disc">
          <li>Form</li>
          <li>List</li>
          <li>Item</li>
        </ul>
      </div>

      <div className="diagram-box">
        Budgets & Goals
        <ul className="ml-4 list-disc">
          <li>Budget Setup</li>
          <li>Goal Tracker</li>
          <li>Planning List</li>
        </ul>
      </div>

      <div className="diagram-box">
        Reports
        <ul className="ml-4 list-disc">
          <li>Pie Chart</li>
          <li>Bar Chart</li>
        </ul>
      </div>

      <div className="diagram-box">
        Alerts
        <ul className="ml-4 list-disc">
          <li>Notifications</li>
          <li>Tips</li>
        </ul>
      </div>

    </div>
  );
}
