// algorithms/dsa/linkedList/reverse.meta.ts
import type { AlgorithmMeta } from '../../../core/types/algorithm.types';

export const reverseMeta: AlgorithmMeta = {
  name: 'Reverse Linked List',
  category: 'Linked Lists',
  domain: 'dsa',
  description: 'An algorithm to reverse the order of elements in a linked list by changing the pointers of each node to point to its predecessor instead of its successor.',
  complexity: {
    time: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
    space: { best: 'O(1)', average: 'O(1)', worst: 'O(1)' },
  },
  useCases: [
    'Reversing data sequences',
    'Part of complex algorithms like Palindrome detection',
    'Memory management / pointer manipulation practice'
  ],
  metrics: ['comparisons', 'swaps'], // Using "swaps" here as generic pointer changes
};
