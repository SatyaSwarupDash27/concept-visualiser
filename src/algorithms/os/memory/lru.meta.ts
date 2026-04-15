// algorithms/os/memory/lru.meta.ts
import type { AlgorithmMeta } from '../../../core/types/algorithm.types';

export const lruMeta: AlgorithmMeta = {
  name: 'Least Recently Used (LRU)',
  category: 'Page Replacement',
  domain: 'os',
  description: 'A page replacement algorithm that evicts the page that has not been used for the longest period of time. It is based on the principle of locality of reference.',
  complexity: {
    time: { best: 'O(1)', average: 'O(1)', worst: 'O(1)' }, // per reference with proper hash-map + doubly linked list
    space: { best: 'O(f)', average: 'O(f)', worst: 'O(f)' }, // f = number of frames
  },
  useCases: [
    'Virtual memory management',
    'Caching systems (e.g., Redis, browser cache)',
    'Database buffer pools'
  ],
  metrics: ['pageFaults', 'cacheHits'],
};
