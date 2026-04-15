// algorithms/dsa/linear/queue.meta.ts
import type { AlgorithmMeta } from '../../../core/types/algorithm.types';

export const queueMeta: AlgorithmMeta = {
  name: 'Queue (FIFO)',
  category: 'Linear Structures',
  domain: 'dsa',
  description: 'A First-In-First-Out data structure where elements are added at the rear (enqueue) and removed from the front (dequeue).',
  complexity: {
    time: { best: 'O(1)', average: 'O(1)', worst: 'O(1)' },
    space: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
  },
  useCases: [
    'Task scheduling (Job Queues)',
    'Data buffering for I/O operations',
    'Broadcasting/Message passage in networks'
  ],
  metrics: ['operations'],
};
