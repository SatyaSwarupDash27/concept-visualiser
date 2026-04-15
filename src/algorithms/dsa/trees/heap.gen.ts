// algorithms/dsa/trees/heap.gen.ts
import type { TreeSnapshot, TreeNode } from '../../../core/types/snapshot.dsa';
import { createMetrics, cloneMetrics } from '../../../core/types/snapshot.base';

export function* heapGenerator(input: number[]): Generator<TreeSnapshot> {
  const heap: number[] = [];
  const metrics = createMetrics({ comparisons: 0, swaps: 0 });

  yield {
    structure: undefined as any,
    highlights: { nodes: {}, edges: {} },
    metrics: cloneMetrics(metrics),
    message: 'Starting Max-Heap construction',
    phase: 'init',
  };

  for (const value of input) {
    heap.push(value);
    let curr = heap.length - 1;

    yield {
      structure: arrayToTree(heap),
      highlights: { nodes: { [`node-${curr}`]: 'highlighted' }, edges: {} },
      metrics: cloneMetrics(metrics),
      message: `Inserting ${value} at the last position`,
      phase: 'insert',
    };

    // Bubble up
    while (curr > 0) {
      const parent = Math.floor((curr - 1) / 2);
      metrics.comparisons++;

      yield {
        structure: arrayToTree(heap),
        highlights: { nodes: { [`node-${curr}`]: 'comparing', [`node-${parent}`]: 'comparing' }, edges: {} },
        metrics: cloneMetrics(metrics),
        message: `Comparing ${heap[curr]} with parent ${heap[parent]}`,
        phase: 'compare',
      };

      if (heap[curr] > heap[parent]) {
        [heap[curr], heap[parent]] = [heap[parent], heap[curr]];
        metrics.swaps++;

        yield {
          structure: arrayToTree(heap),
          highlights: { nodes: { [`node-${curr}`]: 'swapping', [`node-${parent}`]: 'swapping' }, edges: {} },
          metrics: cloneMetrics(metrics),
          message: `Swapped ${heap[parent]} and ${heap[curr]} to restore heap property`,
          phase: 'swap',
        };
        curr = parent;
      } else {
        break;
      }
    }
  }

  yield {
    structure: arrayToTree(heap),
    highlights: { nodes: Object.fromEntries(heap.map((_, i) => [`node-${i}`, 'sorted'])) },
    metrics: cloneMetrics(metrics),
    message: 'Max-Heap construction complete!',
    phase: 'complete',
  };
}

/**
 * Converts a flat array (heap structure) to a recursive TreeNode structure.
 */
function arrayToTree(heap: number[], index: number = 0): TreeNode | undefined {
  if (index >= heap.length) return undefined;

  return {
    id: `node-${index}`,
    value: heap[index],
    left: arrayToTree(heap, 2 * index + 1),
    right: arrayToTree(heap, 2 * index + 2)
  };
}
