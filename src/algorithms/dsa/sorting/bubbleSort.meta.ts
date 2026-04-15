// algorithms/dsa/sorting/bubbleSort.meta.ts
import type { AlgorithmMeta } from '../../../core/types/algorithm.types';

export const bubbleSortMeta: AlgorithmMeta = {
  name: 'Bubble Sort',
  category: 'Sorting',
  domain: 'dsa',
  description: 'A simple comparison-based sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
  complexity: {
    time: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    space: { best: 'O(1)', average: 'O(1)', worst: 'O(1)' },
  },
  useCases: [
    'Educational purposes (intro to sorting)',
    'Small datasets where simplicity is preferred',
    'Detecting already sorted arrays efficiently (O(n) best case)'
  ],
  metrics: ['comparisons', 'swaps'],
};
