// core/store/algorithm.store.ts
// Zustand store for managing active algorithm and input configuration.

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface AlgorithmState {
  activeAlgorithmId: string | null;
  currentInput: any;
}

interface AlgorithmActions {
  setAlgorithm: (id: string | null) => void;
  setInput: (input: any) => void;
}

export const useAlgorithmStore = create<AlgorithmState & AlgorithmActions>()(
  immer((set) => ({
    activeAlgorithmId: null,
    currentInput: null,

    setAlgorithm: (id) => {
      set((s) => {
        s.activeAlgorithmId = id;
      });
    },

    setInput: (input) => {
      set((s) => {
        s.currentInput = input;
      });
    },
  }))
);
