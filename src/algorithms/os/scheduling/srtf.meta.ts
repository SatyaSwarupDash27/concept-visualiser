// algorithms/os/scheduling/srtf.meta.ts
import type { AlgorithmMeta } from '../../../core/types/algorithm.types';

export const srtfMeta: AlgorithmMeta = {
  name: 'SRTF (Shortest Remaining Time First)',
  category: 'CPU Scheduling',
  domain: 'os',
  description: 'A preemptive version of SJF. Whenever a new process arrives, it is compared with the current executing process. If the new process has a shorter remaining burst time, the CPU is preempted.',
  complexity: {
    time: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
    space: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
  },
  useCases: [
    'Environments where short jobs must be prioritized',
    'Real-time systems with varying task lengths',
    'Minimizing average waiting time'
  ],
  metrics: ['averageWaitTime', 'contextSwitches'],
};
