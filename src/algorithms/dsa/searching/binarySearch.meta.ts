// algorithms/dsa/searching/binarySearch.meta.ts
import type { AlgorithmMeta } from '../../../core/types/algorithm.types';

export const binarySearchMeta: AlgorithmMeta = {
  name: 'Binary Search',
  category: 'Searching',
  domain: 'dsa',
  description: 'An efficient algorithm for finding an item from a sorted list of items. It works by repeatedly dividing in half the portion of the list that could contain the item, until you have narrowed down the possible locations to just one.',
  complexity: {
    time: { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)' },
    space: { best: 'O(1)', average: 'O(1)', worst: 'O(1)' },
  },
  useCases: [
    'Searching in sorted arrays',
    'Finding boundary conditions in monotonic functions',
    'Efficient database indexing'
  ],
  metrics: ['comparisons'],
};
