// core/types/snapshot.dsa.ts
// DSA domain snapshot types

import type { BaseSnapshot } from './snapshot.base';
import type {
  ArrayHighlights,
  GraphHighlights,
  TreeHighlights,
  MatrixHighlights,
} from './highlights.types';

// ─── Sorting ───

export type SortSnapshot = BaseSnapshot<number[], ArrayHighlights> & {
  auxiliaryArray?: number[];
  pivotIndex?: number;
  partitionRange?: [number, number];
};

// ─── Trees ───

export interface TreeNode {
  id: string;
  value: number;
  left?: TreeNode;
  right?: TreeNode;
}

export type TreeSnapshot = BaseSnapshot<TreeNode, TreeHighlights> & {
  balanceFactors?: Record<string, number>;
  rotationType?: 'LL' | 'RR' | 'LR' | 'RL';
  nodeLabels?: Record<string, string>;
};

// ─── Graphs ───

export interface GraphNode {
  id: string;
  x: number;
  y: number;
  label: string;
}

export interface GraphEdge {
  from: string;
  to: string;
  weight?: number;
}

export interface GraphStructure {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export type GraphSnapshot = BaseSnapshot<GraphStructure, GraphHighlights> & {
  distanceMap?: Record<string, number>;
  parentMap?: Record<string, string>;
  nodeLabels?: Record<string, string>;
};

// ─── Dynamic Programming (Matrix) ───

export type MatrixSnapshot = BaseSnapshot<number[][], MatrixHighlights> & {
  rowLabels?: string[];
  colLabels?: string[];
  lookbackCells?: [number, number][];
};

// ─── Linked Lists ───

export interface LinkedListNode {
  id: string;
  value: number;
  next: string | null;
}

export type LinkedListSnapshot = BaseSnapshot<
  LinkedListNode[],
  ArrayHighlights
> & {
  pointers: {
    prev?: string | null;
    curr?: string | null;
    next?: string | null;
    tempLinks: [string, string][];
  };
};

// ─── Expression Evaluation ───

export interface ExpressionState {
  input: string[];
  stack: string[];
  output: string[];
  currentIndex: number;
  topOfStack: string | null;
}

export type ExpressionSnapshot = BaseSnapshot<
  ExpressionState,
  ArrayHighlights
> & {
  action: 'push' | 'pop' | 'toOutput' | 'skip';
  precedenceCheck?: {
    incoming: string;
    stackTop: string;
    result: string;
  };
};
// ─── String Matching ───

export type StringSnapshot = BaseSnapshot<string, ArrayHighlights> & {
  pattern: string;
  currentShift: number;
  matchLength: number;
  results: number[];
};
