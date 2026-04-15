// algorithms/dsa/linear/queue.gen.ts
import type { SortSnapshot } from '../../../core/types/snapshot.dsa';
import { createMetrics, cloneMetrics } from '../../../core/types/snapshot.base';

export function* queueGenerator(input: number[]): Generator<SortSnapshot> {
  const queue: number[] = [];
  const metrics = createMetrics({ operations: 0 });
  
  yield {
    structure: [],
    highlights: { indices: {} },
    metrics: cloneMetrics(metrics),
    message: 'Starting Queue visualization. Elements will be enqueued one by one.',
    phase: 'init',
  };

  // Enqueue
  for (const val of input) {
    queue.push(val);
    metrics.operations = (metrics.operations || 0) + 1;
    
    yield {
      structure: [...queue],
      highlights: { indices: { [queue.length - 1]: 'highlighted' } },
      metrics: cloneMetrics(metrics),
      message: `Enqueuing element ${val} (Front: ${queue[0]}, Rear: ${val})`,
      phase: 'enqueue',
    };
  }

  // Dequeue
  const dequeueCount = Math.floor(input.length / 2);
  for (let i = 0; i < dequeueCount; i++) {
    const dequeued = queue[0];
    
    yield {
      structure: [...queue],
      highlights: { indices: { 0: 'swapping' } },
      metrics: cloneMetrics(metrics),
      message: `Dequeuing front element ${dequeued}`,
      phase: 'before-dequeue',
    };

    queue.shift();
    metrics.operations = (metrics.operations || 0) + 1;

    yield {
      structure: [...queue],
      highlights: { indices: {} },
      metrics: cloneMetrics(metrics),
      message: `Dequeued ${dequeued}. ${queue.length} elements remaining.`,
      phase: 'after-dequeue',
    };
  }

  yield {
    structure: [...queue],
    highlights: { indices: Object.fromEntries(queue.map((_, i) => [i, 'sorted'])) },
    metrics: cloneMetrics(metrics),
    message: 'Queue operations completed.',
    phase: 'complete',
  };
}
