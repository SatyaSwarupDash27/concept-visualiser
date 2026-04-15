// algorithms/os/sync/producerConsumer.meta.ts
import type { AlgorithmMeta } from '../../../core/types/algorithm.types';

export const producerConsumerMeta: AlgorithmMeta = {
  name: 'Producer-Consumer Problem',
  category: 'Synchronization',
  domain: 'os',
  description: "A classic multi-process synchronization problem. The producer produces data into a bounded buffer, and the consumer consumes data from it. They must be synchronized to ensure the producer doesn't add to a full buffer and the consumer doesn't remove from an empty one.",
  complexity: {
    time: { best: 'O(1)', average: 'O(1)', worst: 'O(1)' }, // per operation
    space: { best: 'O(k)', average: 'O(k)', worst: 'O(k)' }, // buffer size k
  },
  useCases: [
    'Message queues',
    'IO buffering',
    'Task distribution in distributed systems'
  ],
  metrics: ['waitTicks', 'itemsProduced', 'itemsConsumed'],
};
