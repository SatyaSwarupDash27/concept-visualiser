// algorithms/os/sync/mutex.meta.ts
import type { AlgorithmMeta } from '../../../core/types/algorithm.types';

export const mutexMeta: AlgorithmMeta = {
  name: 'Mutex & Semaphores',
  category: 'Synchronization',
  domain: 'os',
  description: 'A synchronization primitive that enforces mutual exclusion between threads. It ensures that only one thread can access a shared resource or a "Critical Section" at a time.',
  complexity: {
    time: { best: 'O(1)', average: 'O(1)', worst: 'O(log n)' }, // Lock acquisition
    space: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
  },
  useCases: [
    'Protecting shared variables in multi-threaded code',
    'Resource management in kernels',
    'Preventing race conditions'
  ],
  metrics: ['contextSwitches', 'waitTicks'],
};
