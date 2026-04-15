// workers/workerBridge.ts
// Typed message protocol between main thread and worker.

export type WorkerInbound =
  | { type: 'START'; algorithmId: string; input: unknown }
  | { type: 'PAUSE' }
  | { type: 'RESUME' }
  | { type: 'REQUEST_CHUNK'; fromStep: number; count: number };

export type WorkerOutbound =
  | { type: 'CHUNK'; startStep: number; snapshots: unknown[] }
  | { type: 'DONE'; totalSteps: number }
  | { type: 'PROGRESS'; computed: number }
  | { type: 'ERROR'; message: string };
