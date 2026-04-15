// core/engine/MetricsTracker.ts
// Tracks comparisons, swaps, and other metrics across algorithm steps.

import type { Metrics } from '../types/snapshot.base';

export function createInitialMetrics(
  extras?: Record<string, number>
): Metrics {
  return {
    comparisons: 0,
    swaps: 0,
    ...extras,
  };
}

export function incrementMetric(
  metrics: Metrics,
  key: keyof Metrics | string,
  amount = 1
): void {
  const current = (metrics[key] as number | undefined) ?? 0;
  (metrics as Record<string, number | undefined>)[key] = current + amount;
}

export function cloneMetrics(metrics: Metrics): Metrics {
  return { ...metrics };
}
