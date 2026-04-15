// algorithms/dsa/sorting/bubbleSort.gen.ts
import type { SortSnapshot } from '../../../core/types/snapshot.dsa';
import { createMetrics, cloneMetrics } from '../../../core/types/snapshot.base';

export function* bubbleSortGenerator(input: number[]): Generator<SortSnapshot> {
  const arr = [...input];
  const metrics = createMetrics();
  const n = arr.length;

  yield {
    structure: [...arr],
    highlights: { indices: {} },
    metrics: cloneMetrics(metrics),
    message: 'Starting Bubble Sort',
    phase: 'init',
  };

  for (let i = 0; i < n; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      yield {
        structure: [...arr],
        highlights: { 
          indices: { [j]: 'comparing', [j + 1]: 'comparing' } 
        },
        metrics: cloneMetrics(metrics),
        message: `Comparing ${arr[j]} and ${arr[j + 1]}`,
        phase: 'compare',
      };

      metrics.comparisons++;

      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        metrics.swaps++;
        swapped = true;

        yield {
          structure: [...arr],
          highlights: { 
            indices: { [j]: 'swapping', [j + 1]: 'swapping' } 
          },
          metrics: cloneMetrics(metrics),
          message: `Swapped ${arr[j+1]} and ${arr[j]}`,
          phase: 'swap',
        };
      }
    }

    // Mark the last element as sorted
    const sortedIndices: Record<number, string> = {};
    for (let k = n - i - 1; k < n; k++) {
      sortedIndices[k] = 'sorted';
    }

    if (!swapped) {
      yield {
        structure: [...arr],
        highlights: { indices: Object.fromEntries(arr.map((_, idx) => [idx, 'sorted'])) },
        metrics: cloneMetrics(metrics),
        message: 'No swaps occurred, array is sorted!',
        phase: 'early-exit',
      };
      return;
    }
  }

  yield {
    structure: [...arr],
    highlights: { indices: Object.fromEntries(arr.map((_, i) => [i, 'sorted'])) },
    metrics: cloneMetrics(metrics),
    message: 'Bubble Sort completed!',
    phase: 'complete',
  };
}
