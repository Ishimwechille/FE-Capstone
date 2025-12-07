import { create } from "zustand";

export const useDiagramStore = create((set) => ({
  activeDiagram: "system",
  setDiagram: (diagram) => set({ activeDiagram: diagram }),
}));
