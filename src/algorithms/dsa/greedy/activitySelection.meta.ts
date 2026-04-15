// algorithms/dsa/greedy/activitySelection.meta.ts
import type { AlgorithmMeta } from '../../../core/types/algorithm.types';

export const activitySelectionMeta: AlgorithmMeta = {
  name: 'Activity Selection',
  category: 'Greedy Algorithms',
  domain: 'dsa',
  description: 'A problem of scheduling several competing activities that require exclusive use of a common resource, with a goal of selecting a maximum-size set of mutually compatible activities.',
  complexity: {
    time: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' }, // Sorting + Linear scan
    space: { best: 'O(1)', average: 'O(1)', worst: 'O(1)' },
  },
  useCases: [
    'Scheduling meetings in a single conference room',
    'Task scheduling with fixed start and end times',
    'Resource management in kernels'
  ],
  metrics: ['activitiesSelected', 'comparisons'],
};
