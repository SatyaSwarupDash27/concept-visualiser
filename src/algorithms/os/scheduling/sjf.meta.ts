// algorithms/os/scheduling/sjf.meta.ts
import type { AlgorithmMeta } from '../../../core/types/algorithm.types';

export const sjfMeta: AlgorithmMeta = {
  name: 'Shortest Job First (SJF)',
  category: 'CPU Scheduling',
  domain: 'os',
  description: 'A scheduling policy that selects for execution the waiting process with the smallest execution time. SJF is an optimal scheduling algorithm as it gives the minimum average waiting time for a given set of processes.',
  complexity: {
    time: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
    space: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
  },
  useCases: [
    'Batch systems where CPU times are known in advance',
    'Minimizing average waiting time',
    'Non-preemptive scheduling environments'
  ],
  metrics: ['totalTime', 'contextSwitches'],
};
