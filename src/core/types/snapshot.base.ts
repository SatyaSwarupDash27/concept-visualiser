// core/types/snapshot.base.ts
// Base snapshot contract — all domain snapshots extend this.

export interface Metrics {
  comparisons: number;
  swaps: number;
  pageFaults?: number;
  contextSwitches?: number;
  cacheHits?: number;
  [extra: string]: number | undefined;
}

export interface BaseSnapshot<TStructure, THighlights> {
  /** Full data state at this step */
  structure: TStructure;
  /** Visual emphasis (typed per domain) */
  highlights: THighlights;
  /** Quantitative tracking */
  metrics: Metrics;
  /** Human-readable explanation of current step */
  message: string;
  /** Machine-readable stage label */
  phase: string;
}

/** Create a fresh metrics object */
export function createMetrics(overrides?: Partial<Metrics>): Metrics {
  return {
    comparisons: 0,
    swaps: 0,
    ...overrides,
  };
}

/** Clone metrics safely */
export function cloneMetrics(m: Metrics): Metrics {
  return { ...m };
}
