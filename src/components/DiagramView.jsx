import { useDiagramStore } from "../store/diagramStore";

export default function DiagramView() {
  const { activeDiagram, setDiagram } = useDiagramStore();

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">
        FE-Capstone – System Diagrams
      </h1>

      {/* Buttons */}
      <div className="flex justify-center gap-4 mb-10">
        <button
          onClick={() => setDiagram("system")}
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          System Architecture
        </button>

        <button
          onClick={() => setDiagram("component")}
          className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
        >
          Component Architecture
        </button>

        <button
          onClick={() => setDiagram("data")}
          className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700"
        >
          Data Flow
        </button>
      </div>

      {/* Diagram Area */}
      <div className="border border-gray-300 rounded-lg p-6 bg-gray-50">
        {activeDiagram === "system" && <SystemDiagram />}
        {activeDiagram === "component" && <ComponentDiagram />}
        {activeDiagram === "data" && <DataFlowDiagram />}
      </div>
    </div>
  );
}
