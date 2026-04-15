// algorithms/os/deadlock/bankers.meta.ts
import type { AlgorithmMeta } from '../../../core/types/algorithm.types';

export const bankersMeta: AlgorithmMeta = {
  name: "Banker's Algorithm",
  category: 'Concurrency & Deadlock',
  domain: 'os',
  description: 'A resource allocation and deadlock avoidance algorithm that tests for safety by simulating the allocation for predetermined maximum possible amounts of all resources and then makes an "s-state" check to test for possible activities, before deciding whether allocation should be allowed to continue.',
  complexity: {
    time: { best: 'O(n^2 * m)', average: 'O(n^2 * m)', worst: 'O(n^2 * m)' }, // n=processes, m=resources
    space: { best: 'O(n * m)', average: 'O(n * m)', worst: 'O(n * m)' },
  },
  useCases: [
    'Deadlock avoidance in OS kernels',
    'Resource management in distributed systems',
    'Safety analysis for banking and transaction systems'
  ],
  metrics: ['safetyCheckSuccessful', 'processesFinished'],
};
