// algorithms/dsa/graphs/dfs.meta.ts
import type { AlgorithmMeta } from '../../../core/types/algorithm.types';

export const dfsMeta: AlgorithmMeta = {
  name: 'DFS (Depth First Search)',
  category: 'Graphs',
  domain: 'dsa',
  description: 'An algorithm for traversing or searching tree or graph data structures. It starts at the root and explores as far as possible along each branch before backtracking.',
  complexity: {
    time: { best: 'O(V + E)', average: 'O(V + E)', worst: 'O(V + E)' },
    space: { best: 'O(V)', average: 'O(V)', worst: 'O(V)' },
  },
  useCases: [
    'Pathfinding in mazes',
    'Detecting cycles in a graph',
    'Topological sorting',
    'Solving puzzles (e.g., Sudoku)'
  ],
  metrics: ['nodesVisited'],
};
