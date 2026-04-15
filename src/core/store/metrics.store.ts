// core/store/metrics.store.ts
// Zustand store for real-time metrics display.

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { Metrics } from '../types/snapshot.base';

interface MetricsState {
  currentMetrics: Metrics | null;
}

interface MetricsActions {
  setMetrics: (metrics: Metrics | null) => void;
}

export const useMetricsStore = create<MetricsState & MetricsActions>()(
  immer((set) => ({
    currentMetrics: null,

    setMetrics: (metrics) => {
      set((s) => {
        s.currentMetrics = metrics;
      });
    },
  }))
);
