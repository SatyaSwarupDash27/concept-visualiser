// core/engine/AlgorithmRunner.ts
// Execution engine — consumes generators, manages snapshot storage, selects execution mode.

import { SnapshotBuffer } from './SnapshotBuffer';
import { freezeSnapshot } from './freeze';
import type { RunnerMode } from '../types/common.types';

export class AlgorithmRunner<T extends object> {
  private buffer!: SnapshotBuffer<T>;
  private generator: Generator<T> | null = null;
  private mode: RunnerMode = 'eager';
  private _totalSteps = 0;
  private _done = false;

  get totalSteps(): number {
    return this._totalSteps;
  }

  get isDone(): boolean {
    return this._done;
  }

  /**
   * Execute a generator and populate the snapshot buffer.
   */
  run(generator: Generator<T>, stepHint: number): void {
    this.generator = generator;
    this._done = false;
    this._totalSteps = 0;

    // Mode selection based on estimated steps
    this.mode =
      stepHint < 500
        ? 'eager'
        : stepHint < 5000
          ? 'chunked'
          : 'lazy';

    if (this.mode === 'eager') {
      this.runEager();
    } else if (this.mode === 'chunked') {
      // For V1, fall back to eager for chunked mode
      // Worker streaming will be activated in future phases
      this.runEager();
    } else {
      this.runLazy();
    }
  }

  /**
   * EAGER mode — precompute all snapshots.
   */
  private runEager(): void {
    this.buffer = new SnapshotBuffer<T>({ capacity: Infinity });

    for (const snap of this.generator!) {
      this.buffer.push(freezeSnapshot(snap));
      this._totalSteps++;
    }

    this._done = true;
  }

  /**
   * LAZY mode — generate on demand with window caching.
   */
  private runLazy(): void {
    this.buffer = new SnapshotBuffer<T>({
      capacity: 200,
      ringMode: true,
    });

    this.fillWindow(0);
  }

  /**
   * Fill the buffer window around a target step.
   */
  private fillWindow(targetCenter: number): void {
    if (!this.generator || this._done) return;

    const target = targetCenter + 100;

    while (this.buffer.head < target) {
      const { value, done } = this.generator.next();
      if (done) {
        this._done = true;
        break;
      }

      this.buffer.push(freezeSnapshot(value));
      this._totalSteps++;
    }
  }

  /**
   * Get a snapshot at a specific step.
   */
  getSnapshot(step: number): T {
    if (this.mode === 'lazy' && !this.buffer.has(step)) {
      this.fillWindow(step);
    }
    return this.buffer.get(step);
  }

  /**
   * Reset the runner for a new execution.
   */
  reset(): void {
    this.generator = null;
    this._totalSteps = 0;
    this._done = false;
    if (this.buffer) {
      this.buffer.clear();
    }
  }
}
