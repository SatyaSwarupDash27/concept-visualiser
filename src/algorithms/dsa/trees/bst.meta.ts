// algorithms/dsa/trees/bst.meta.ts
import type { AlgorithmMeta } from '../../../core/types/algorithm.types';

export const bstMeta: AlgorithmMeta = {
  name: 'Binary Search Tree (BST)',
  category: 'Trees',
  domain: 'dsa',
  description: 'A hierarchical data structure where each node has at most two children. For every node, all elements in the left subtree are smaller, and all in the right subtree are larger.',
  complexity: {
    time: { best: 'O(log n)', average: 'O(log n)', worst: 'O(n)' },
    space: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
  },
  useCases: [
    'Efficient searching and sorting',
    'Self-balancing versions (AVL, Read-Black) used in databases',
    'Set and Map implementations'
  ],
  metrics: ['comparisons'],
};
