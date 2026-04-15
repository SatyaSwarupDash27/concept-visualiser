// algorithms/dsa/sorting/mergeSort.meta.ts
import type { AlgorithmMeta } from '../../../core/types/algorithm.types';

export const mergeSortMeta: AlgorithmMeta = {
  name: 'Merge Sort',
  category: 'Sorting',
  domain: 'dsa',
  description: 'A divide-and-conquer algorithm that works by recursively breaking down a list into several sublists until each sublist consists of a single element and merging those sublists in a manner that results into a sorted list.',
  complexity: {
    time: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
    space: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
  },
  useCases: [
    'Sorting large datasets',
    'External sorting (where data does not fit in RAM)',
    'Stable sorting requirements'
  ],
  metrics: ['comparisons', 'swaps'],
};
