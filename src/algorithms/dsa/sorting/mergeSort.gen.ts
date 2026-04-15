// algorithms/dsa/sorting/mergeSort.gen.ts
import type { SortSnapshot } from '../../../core/types/snapshot.dsa';
import { createMetrics, cloneMetrics } from '../../../core/types/snapshot.base';

export function* mergeSortGenerator(input: number[]): Generator<SortSnapshot> {
  const arr = [...input];
  const metrics = createMetrics();

  yield {
    structure: [...arr],
    highlights: { indices: {} },
    metrics: cloneMetrics(metrics),
    message: 'Starting Merge Sort',
    phase: 'init',
  };

  yield* mergeSortRecursive(arr, 0, arr.length - 1, metrics);

  yield {
    structure: [...arr],
    highlights: { indices: Object.fromEntries(arr.map((_, i) => [i, 'sorted'])) },
    metrics: cloneMetrics(metrics),
    message: 'Merge Sort completed!',
    phase: 'complete',
  };
}

function* mergeSortRecursive(
  arr: number[],
  start: number,
  end: number,
  metrics: any
): Generator<SortSnapshot> {
  if (start >= end) return;

  const mid = Math.floor((start + end) / 2);

  yield {
    structure: [...arr],
    highlights: { 
      indices: { [mid]: 'pivot' },
      ranges: [{ start, end, state: 'highlighted' }]
    },
    metrics: cloneMetrics(metrics),
    message: `Dividing array from index ${start} to ${end}`,
    phase: 'divide',
  };

  yield* mergeSortRecursive(arr, start, mid, metrics);
  yield* mergeSortRecursive(arr, mid + 1, end, metrics);
  yield* merge(arr, start, mid, end, metrics);
}

function* merge(
  arr: number[],
  start: number,
  mid: number,
  end: number,
  metrics: any
): Generator<SortSnapshot> {
  const left = arr.slice(start, mid + 1);
  const right = arr.slice(mid + 1, end + 1);

  let i = 0, j = 0, k = start;

  yield {
    structure: [...arr],
    highlights: { 
      ranges: [{ start, end, state: 'comparing' }],
      indices: {}
    },
    metrics: cloneMetrics(metrics),
    message: `Merging sub-arrays: [${left}] and [${right}]`,
    phase: 'merge-start',
  };

  while (i < left.length && j < right.length) {
    metrics.comparisons++;
    
    yield {
      structure: [...arr],
      highlights: { 
        indices: { [k]: 'current', [start + i]: 'comparing', [mid + 1 + j]: 'comparing' }
      },
      metrics: cloneMetrics(metrics),
      message: `Comparing ${left[i]} and ${right[j]}`,
      phase: 'compare',
    };

    if (left[i] <= right[j]) {
      arr[k] = left[i];
      i++;
    } else {
      arr[k] = right[j];
      j++;
    }
    k++;

    yield {
      structure: [...arr],
      highlights: { 
        indices: { [k - 1]: 'swapping' }
      },
      metrics: cloneMetrics(metrics),
      message: `Placed ${arr[k - 1]} into sorted position`,
      phase: 'place',
    };
  }

  while (i < left.length) {
    arr[k] = left[i];
    yield {
      structure: [...arr],
      highlights: { indices: { [k]: 'swapping' } },
      metrics: cloneMetrics(metrics),
      message: `Copying remaining element ${left[i]} from left sub-array`,
      phase: 'copy-left',
    };
    i++;
    k++;
  }

  while (j < right.length) {
    arr[k] = right[j];
    yield {
      structure: [...arr],
      highlights: { indices: { [k]: 'swapping' } },
      metrics: cloneMetrics(metrics),
      message: `Copying remaining element ${right[j]} from right sub-array`,
      phase: 'copy-right',
    };
    j++;
    k++;
  }
}
