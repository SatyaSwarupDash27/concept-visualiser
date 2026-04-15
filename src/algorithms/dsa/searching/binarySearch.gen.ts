// algorithms/dsa/searching/binarySearch.gen.ts
import type { SortSnapshot } from '../../../core/types/snapshot.dsa';
import { createMetrics, cloneMetrics } from '../../../core/types/snapshot.base';

export function* binarySearchGenerator(input: { array: number[], target: number }): Generator<SortSnapshot> {
  const { array: rawArray, target } = input;
  // Binary search requires a sorted array
  const arr = [...rawArray].sort((a, b) => a - b);
  const metrics = createMetrics();
  
  let left = 0;
  let right = arr.length - 1;

  yield {
    structure: [...arr],
    highlights: { 
      indices: {},
      ranges: [{ start: left, end: right, state: 'highlighted' }]
    },
    metrics: cloneMetrics(metrics),
    message: `Searching for ${target} in sorted array`,
    phase: 'init',
  };

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    metrics.comparisons++;

    yield {
      structure: [...arr],
      highlights: { 
        indices: { [mid]: 'comparing', [left]: 'current', [right]: 'current' },
        ranges: [{ start: left, end: right, state: 'highlighted' }]
      },
      metrics: cloneMetrics(metrics),
      message: `Checking middle element at index ${mid} (value: ${arr[mid]})`,
      phase: 'compare',
    };

    if (arr[mid] === target) {
      yield {
        structure: [...arr],
        highlights: { 
          indices: { [mid]: 'sorted' },
          ranges: [{ start: mid, end: mid, state: 'sorted' }]
        },
        metrics: cloneMetrics(metrics),
        message: `Found ${target} at index ${mid}!`,
        phase: 'found',
      };
      return;
    }

    if (arr[mid] < target) {
      const oldLeft = left;
      left = mid + 1;
      yield {
        structure: [...arr],
        highlights: { 
          indices: { [mid]: 'deadlocked' },
          ranges: [{ start: oldLeft, end: mid, state: 'deadlocked' }]
        },
        metrics: cloneMetrics(metrics),
        message: `${arr[mid]} < ${target}. Searching in the right half.`,
        phase: 'shift-right',
      };
    } else {
      const oldRight = right;
      right = mid - 1;
      yield {
        structure: [...arr],
        highlights: { 
          indices: { [mid]: 'deadlocked' },
          ranges: [{ start: mid, end: oldRight, state: 'deadlocked' }]
        },
        metrics: cloneMetrics(metrics),
        message: `${arr[mid]} > ${target}. Searching in the left half.`,
        phase: 'shift-left',
      };
    }
  }

  yield {
    structure: [...arr],
    highlights: { indices: {} },
    metrics: cloneMetrics(metrics),
    message: `${target} not found in the array.`,
    phase: 'not-found',
  };
}
