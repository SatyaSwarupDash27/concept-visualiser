// algorithms/dsa/trees/heap.meta.ts
import type { AlgorithmMeta } from '../../../core/types/algorithm.types';

export const heapMeta: AlgorithmMeta = {
  name: 'Max-Heap',
  category: 'Trees',
  domain: 'dsa',
  description: 'A complete binary tree where the value of each node is greater than or equal to the values of its children. This is the foundation of Priority Queues and Heap Sort.',
  complexity: {
    time: { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)' }, // for parent access/insert
    space: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
  },
  useCases: [
    'Priority Queue implementation',
    'Heap Sort algorithm',
    'Efficiently finding the maximum/minimum element'
  ],
  metrics: ['comparisons', 'swaps'],
};
