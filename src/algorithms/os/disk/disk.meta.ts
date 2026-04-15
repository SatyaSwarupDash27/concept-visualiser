// algorithms/os/disk/disk.meta.ts
import type { AlgorithmMeta } from '../../../core/types/algorithm.types';

export const diskMeta: AlgorithmMeta = {
  name: 'Disk Scheduling (FCFS, SSTF, SCAN)',
  category: 'Hardware & OS',
  domain: 'os',
  description: 'Algorithms used by operating systems to schedule I/O requests arriving for the disk. The goal is to minimize the total seek time (head movement distance).',
  complexity: {
    time: { best: 'O(n)', average: 'O(n log n)', worst: 'O(n log n)' },
    space: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
  },
  useCases: [
    'Hard drive read/write optimization',
    'Database disk access patterns',
    'File system performance tuning'
  ],
  metrics: ['totalSeekDistance', 'averageSeekDistance'],
};
