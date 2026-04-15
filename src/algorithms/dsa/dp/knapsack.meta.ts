// algorithms/dsa/dp/knapsack.meta.ts
import type { AlgorithmMeta } from '../../../core/types/algorithm.types';

export const knapsackMeta: AlgorithmMeta = {
  name: '0/1 Knapsack Problem',
  category: 'Dynamic Programming',
  domain: 'dsa',
  description: 'Given items with weights and values, determine the maximum value that can be fit into a knapsack of fixed capacity. Every item can be either taken (1) or left (0).',
  complexity: {
    time: { best: 'O(n*W)', average: 'O(n*W)', worst: 'O(n*W)' }, // n=items, W=capacity
    space: { best: 'O(n*W)', average: 'O(n*W)', worst: 'O(n*W)' },
  },
  useCases: [
    'Resource allocation under budget',
    'Selecting optimal combinations of stocks',
    'Optimizing freight loading'
  ],
  metrics: ['maxValue', 'comparisons'],
};
