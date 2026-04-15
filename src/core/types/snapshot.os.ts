// core/types/snapshot.os.ts
// OS domain snapshot types

import type { BaseSnapshot } from './snapshot.base';
import type {
  TimelineHighlights,
  SlotHighlights,
  MatrixHighlights,
  ArrayHighlights,
} from './highlights.types';

// ─── CPU Scheduling ───

export interface Process {
  id: string;
  arrivalTime: number;
  burstTime: number;
  remainingTime: number;
  priority?: number;
}

export interface GanttBlock {
  processId: string;
  start: number;
  end: number;
}

export interface SchedulingState {
  time: number;
}

export type SchedulingSnapshot = BaseSnapshot<
  SchedulingState,
  TimelineHighlights
> & {
  ganttBlocks: GanttBlock[];
  readyQueue: Process[];
  runningProcess?: Process;
  quantumRemaining?: number;
  completedProcesses?: Process[];
};

// ─── Page Replacement ───

export interface PageFrameState {
  frameCount: number;
}

export type PageSnapshot = BaseSnapshot<PageFrameState, SlotHighlights> & {
  frames: (number | null)[];
  incomingPage: number;
  evictedPage?: number;
  isFault: boolean;
  lruOrder?: number[];
};

// ─── Banker's Algorithm (Resource Allocation) ───

export interface ResourceState {
  processes: number;
  resources: number;
}

export type ResourceSnapshot = BaseSnapshot<
  ResourceState,
  MatrixHighlights
> & {
  allocationMatrix: number[][];
  maxMatrix: number[][];
  needMatrix: number[][];
  availableVector: number[];
  safeSequence?: number[];
  safetyCheckStep: string;
};

// ─── Disk Scheduling ───

export interface DiskState {
  currentPos: number;
  queue: number[];
  visited: number[];
}

export type DiskSnapshot = BaseSnapshot<DiskState, ArrayHighlights> & {
  seekSequence: number[];
};

// ─── Synchronization ───

export interface Thread {
  id: string;
  state: 'waiting' | 'running' | 'blocked';
}

export type SynchronizationSnapshot = BaseSnapshot<
  Thread[],
  ArrayHighlights
> & {
  criticalSectionOwner?: string;
  waitingQueue?: string[];
  buffer?: number[];
  bufferSize?: number;
};
