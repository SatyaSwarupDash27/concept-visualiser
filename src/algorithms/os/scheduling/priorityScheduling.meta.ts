// algorithms/os/scheduling/priorityScheduling.meta.ts
import type { AlgorithmMeta } from '../../../core/types/algorithm.types';

export const prioritySchedulingMeta: AlgorithmMeta = {
  name: 'Priority Scheduling (Preemptive)',
  category: 'CPU Scheduling',
  domain: 'os',
  description: 'An algorithm where each process is assigned a priority, and the CPU is allocated to the process with the highest priority. In the preemptive version, if a new process arrives with a higher priority than the currently running process, the CPU is preempted.',
  complexity: {
    time: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
    space: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
  },
  useCases: [
    'Real-time operating systems',
    'Prioritizing system processes over user processes',
    'Interrupt handling'
  ],
  metrics: ['averageWaitTime', 'contextSwitches'],
};
