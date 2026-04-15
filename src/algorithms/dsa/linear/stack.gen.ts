// algorithms/dsa/linear/stack.gen.ts
import type { SortSnapshot } from '../../../core/types/snapshot.dsa';
import { createMetrics, cloneMetrics } from '../../../core/types/snapshot.base';

export function* stackGenerator(input: number[]): Generator<SortSnapshot> {
  const stack: number[] = [];
  const metrics = createMetrics({ operations: 0 });
  
  yield {
    structure: [],
    highlights: { indices: {} },
    metrics: cloneMetrics(metrics),
    message: 'Starting Stack visualization. All elements will be pushed one by one.',
    phase: 'init',
  };

  // Push all inputs
  for (const val of input) {
    stack.push(val);
    metrics.operations = (metrics.operations || 0) + 1;
    
    yield {
      structure: [...stack],
      highlights: { indices: { [stack.length - 1]: 'highlighted' } },
      metrics: cloneMetrics(metrics),
      message: `Pushing element ${val} onto the stack`,
      phase: 'push',
    };
  }

  // Pop some inputs to show LIFO
  const popCount = Math.floor(input.length / 2);
  for (let i = 0; i < popCount; i++) {
    const popped = stack[stack.length - 1];
    
    yield {
      structure: [...stack],
      highlights: { indices: { [stack.length - 1]: 'swapping' } },
      metrics: cloneMetrics(metrics),
      message: `Popping top element ${popped} from the stack`,
      phase: 'before-pop',
    };

    stack.pop();
    metrics.operations = (metrics.operations || 0) + 1;

    yield {
      structure: [...stack],
      highlights: { indices: {} },
      metrics: cloneMetrics(metrics),
      message: `Popped ${popped}. ${stack.length} elements remaining.`,
      phase: 'after-pop',
    };
  }

  yield {
    structure: [...stack],
    highlights: { indices: Object.fromEntries(stack.map((_, i) => [i, 'sorted'])) },
    metrics: cloneMetrics(metrics),
    message: 'Stack operations completed.',
    phase: 'complete',
  };
}
