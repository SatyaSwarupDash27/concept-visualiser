// core/engine/DeltaEncoder.ts
// Delta encoding for memory-efficient snapshot storage.
// Stores full keyframes every KEYFRAME_INTERVAL steps, deltas in between.

import type { Metrics } from '../types/snapshot.base';

const KEYFRAME_INTERVAL = 50;

export interface SnapshotDelta {
  baseStep: number;
  metricsDiff?: Partial<Metrics>;
  highlightsDiff?: Record<string, unknown>;
  messageDiff?: string;
  phaseDiff?: string;
  structurePatch?: unknown;
}

export function isKeyframeStep(step: number): boolean {
  return step % KEYFRAME_INTERVAL === 0;
}

/**
 * Create a shallow delta between two snapshots.
 * For V1, we use full replacement rather than JSON Patch for simplicity.
 */
export function createDelta(
  prevStep: number,
  prev: Record<string, unknown>,
  curr: Record<string, unknown>
): SnapshotDelta {
  const delta: SnapshotDelta = { baseStep: prevStep };

  if (curr['message'] !== prev['message']) {
    delta.messageDiff = curr['message'] as string;
  }
  if (curr['phase'] !== prev['phase']) {
    delta.phaseDiff = curr['phase'] as string;
  }

  // For V1, always store full highlights + metrics in delta
  delta.highlightsDiff = curr['highlights'] as Record<string, unknown>;
  delta.metricsDiff = curr['metrics'] as Partial<Metrics>;
  delta.structurePatch = curr['structure'];

  return delta;
}

/**
 * Apply delta to a base snapshot to reconstruct.
 */
export function applyDelta(
  base: Record<string, unknown>,
  delta: SnapshotDelta
): Record<string, unknown> {
  const result = structuredClone(base);

  if (delta.messageDiff !== undefined) result['message'] = delta.messageDiff;
  if (delta.phaseDiff !== undefined) result['phase'] = delta.phaseDiff;
  if (delta.highlightsDiff !== undefined) result['highlights'] = delta.highlightsDiff;
  if (delta.metricsDiff !== undefined) result['metrics'] = { ...result['metrics'] as object, ...delta.metricsDiff };
  if (delta.structurePatch !== undefined) result['structure'] = delta.structurePatch;

  return result;
}
