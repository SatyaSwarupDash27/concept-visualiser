// algorithms/os/scheduling/roundRobin.meta.ts
import type { AlgorithmMeta } from '../../../core/types/algorithm.types';

export const roundRobinMeta: AlgorithmMeta = {
  name: 'Round Robin',
  category: 'Scheduling',
  domain: 'os',
  description: 'A preemptive CPU scheduling algorithm where each process is assigned a fixed time slot in a cyclic way. Each process is allowed to run for a specific time interval called quantum.',
  complexity: {
    time: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
    space: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
  },
  useCases: [
    'Time-sharing systems',
    'Network packet scheduling',
    'General purpose OS'
  ],
  metrics: ['contextSwitches', 'totalTime'],
};
