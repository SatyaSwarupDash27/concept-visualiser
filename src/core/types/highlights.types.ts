// core/types/highlights.types.ts
// Typed highlight contracts — bridge between algorithm state and visual representation.

export type ElementState =
  | 'default'
  | 'comparing'
  | 'swapping'
  | 'sorted'
  | 'pivot'
  | 'current'
  | 'visited'
  | 'path'
  | 'inStack'
  | 'inQueue'
  | 'highlighted'
  | 'deadlocked'
  | 'waiting'
  | 'running'
  | 'done'
  | 'evicted'
  | 'hit'
  | 'fault'
  | 'safe'
  | 'unsafe';

// ─── Array Highlights (sorting, stacks, queues, linked lists) ───

export interface ArrayHighlights {
  indices: Record<string, ElementState>;
  ranges?: {
    start: number;
    end: number;
    state: ElementState;
  }[];
}

// ─── Graph Highlights (BFS, DFS, Dijkstra) ───

export interface GraphHighlights {
  nodes: Record<string, ElementState>;
  edges: Record<string, ElementState>; // key format: "from→to"
}

// ─── Tree Highlights (BST, AVL, Heap) ───

export interface TreeHighlights {
  nodes: Record<string, ElementState>;
  edges: Record<string, ElementState>;
  pointers?: {
    label: string;
    nodeId: string;
  }[];
}

// ─── Matrix Highlights (DP, Banker's Algorithm) ───

export interface MatrixHighlights {
  cells: Record<string, ElementState>; // key format: "row,col"
  rows?: Record<string, ElementState>;
  cols?: Record<string, ElementState>;
}

// ─── Timeline Highlights (CPU Scheduling) ───

export interface TimelineHighlights {
  processSlots: Record<string, ElementState>;
  timeMarkers?: number[];
}

// ─── Slot Highlights (Page Replacement) ───

export interface SlotHighlights {
  slots: Record<string, ElementState>;
}
