// algorithms/os/sync/diningPhilosophers.meta.ts
import type { AlgorithmMeta } from '../../../core/types/algorithm.types';

export const diningPhilosophersMeta: AlgorithmMeta = {
  name: 'Dining Philosophers',
  category: 'Synchronization',
  domain: 'os',
  description: 'A classic synchronization problem that illustrates deadlock and starvation. Five philosophers sit at a table with five chopsticks. They need two chopsticks to eat, but each chopstick is shared between two philosophers.',
  complexity: {
    time: { best: 'O(1)', average: 'O(1)', worst: 'O(1)' },
    space: { best: 'O(1)', average: 'O(1)', worst: 'O(1)' },
  },
  useCases: [
    'Deadlock detection and prevention',
    'Resource allocation strategy design',
    'Understanding concurrent resource contention'
  ],
  metrics: ['waitTicks', 'deadlocksDetected'],
};
