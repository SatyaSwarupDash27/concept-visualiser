// algorithms/dsa/linear/stack.meta.ts
import type { AlgorithmMeta } from '../../../core/types/algorithm.types';

export const stackMeta: AlgorithmMeta = {
  name: 'Stack (LIFO)',
  category: 'Linear Structures',
  domain: 'dsa',
  description: 'A Last-In-First-Out data structure where elements are added and removed from the same end (the top).',
  complexity: {
    time: { best: 'O(1)', average: 'O(1)', worst: 'O(1)' },
    space: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
  },
  useCases: [
    'Function call management (Call Stack)',
    'Undo/Redo operations',
    'Expression evaluation and syntax parsing'
  ],
  metrics: ['operations'],
};
