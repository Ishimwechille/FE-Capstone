export function SystemDiagram() {
  return (
    <div className="flex flex-col items-center gap-6">

      <div className="diagram-box">Frontend (React / Vite)</div>
      <div className="arrow">↓ API Calls</div>

      <div className="diagram-box">Backend (Firebase / Supabase)</div>

      <div className="flex gap-10 mt-6">
        <div className="diagram-box">Auth System</div>
        <div className="diagram-box">Database</div>
        <div className="diagram-box">Storage</div>
      </div>

      <p className="text-gray-600 mt-6 text-center">
        Stores: User Profiles, Transactions, Budgets and Goals
      </p>
    </div>
  );
}
