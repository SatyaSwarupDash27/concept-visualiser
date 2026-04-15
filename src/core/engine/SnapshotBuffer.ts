// core/engine/SnapshotBuffer.ts
// Windowed snapshot cache with ring buffer support.

import type { BufferConfig } from '../types/common.types';

export class SnapshotBuffer<T> {
  private data = new Map<number, T>();
  public head = 0;
  private config: BufferConfig;

  constructor(config: BufferConfig) {
    this.config = config;
  }

  push(snapshot: T): void {
    this.data.set(this.head, snapshot);
    this.head++;

    // Ring buffer eviction
    if (this.config.ringMode && this.data.size > this.config.capacity) {
      const oldest = this.head - this.config.capacity - 1;
      if (this.data.has(oldest)) {
        this.data.delete(oldest);
      }
    }
  }

  get(step: number): T {
    const snap = this.data.get(step);
    if (!snap) {
      throw new Error(`Snapshot at step ${step} not found in buffer`);
    }
    return snap;
  }

  has(step: number): boolean {
    return this.data.has(step);
  }

  get size(): number {
    return this.data.size;
  }

  clear(): void {
    this.data.clear();
    this.head = 0;
  }
}
