// algorithms/dsa/trees/avl.meta.ts
import type { AlgorithmMeta } from '../../../core/types/algorithm.types';

export const avlMeta: AlgorithmMeta = {
  name: 'AVL Tree (Self-Balancing)',
  category: 'Trees',
  domain: 'dsa',
  description: 'A self-balancing Binary Search Tree where the height difference between left and right subtrees (Balance Factor) of any node is at most 1.',
  complexity: {
    time: { best: 'O(log n)', average: 'O(log n)', worst: 'O(log n)' },
    space: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
  },
  useCases: [
    'Highly optimized search operations',
    'Database indexing',
    'Memory-efficient tree structures'
  ],
  metrics: ['comparisons', 'swaps'], // Using "swaps" here as rotations
};
