export function DataFlowDiagram() {
  return (
    <div className="flex flex-col gap-6 items-center">

      <div className="diagram-box">User Interface (React)</div>
      <div className="arrow">↓ Input</div>

      <div className="diagram-box">State Management (Zustand)</div>
      <div className="arrow">↓ CRUD</div>

      <div className="diagram-box">Firebase / Supabase DB</div>

      <div className="grid md:grid-cols-4 gap-6 mt-6">
        <div className="diagram-box">Dashboard Summary</div>
        <div className="diagram-box">Budget Checker (80% Alert)</div>
        <div className="diagram-box">Reports (Charts)</div>
        <div className="diagram-box">Tips Engine</div>
      </div>

    </div>
  );
}
