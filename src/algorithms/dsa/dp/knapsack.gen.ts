// algorithms/dsa/dp/knapsack.gen.ts
import type { MatrixSnapshot } from '../../../core/types/snapshot.dsa';
import { createMetrics, cloneMetrics } from '../../../core/types/snapshot.base';

export function* knapsackGenerator(input: { weights: number[], values: number[], capacity: number }): Generator<MatrixSnapshot> {
  const { weights, values, capacity } = input;
  const n = weights.length;
  const metrics = createMetrics({ maxValue: 0, comparisons: 0 });
  const dp: number[][] = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));

  const colHeaders = Array.from({ length: capacity + 1 }, (_, i) => `W:${i}`);
  const rowHeaders = ['Base', ...weights.map((w, i) => `Item ${i+1}(w:${w})`)];

  yield {
    structure: dp.map(row => [...row]),
    highlights: { cells: {} },
    metrics: cloneMetrics(metrics),
    message: 'Starting 0/1 Knapsack: Initializing DP table with 0s',
    phase: 'init',
    colHeaders,
    rowHeaders
  };

  for (let i = 1; i <= n; i++) {
    const itemWeight = weights[i - 1];
    const itemValue = values[i - 1];

    for (let w = 1; w <= capacity; w++) {
      metrics.comparisons++;
      const hl: Record<string, string> = { [`${i},${w}`]: 'current' };
      
      // Dependency highlights
      hl[`${i-1},${w}`] = 'highlighted'; // Value if we don't take the item
      if (w >= itemWeight) {
        hl[`${i-1},${w - itemWeight}`] = 'highlighted'; // Value if we take the item
      }

      yield {
        structure: dp.map(row => [...row]),
        highlights: { cells: hl },
        metrics: cloneMetrics(metrics),
        message: `Calculating max value for Item ${i} at capacity ${w}`,
        phase: 'calculating',
        colHeaders,
        rowHeaders
      };

      if (w >= itemWeight) {
        dp[i][w] = Math.max(itemValue + dp[i - 1][w - itemWeight], dp[i - 1][w]);
      } else {
        dp[i][w] = dp[i - 1][w];
      }

      yield {
        structure: dp.map(row => [...row]),
        highlights: { cells: { [`${i},${w}`]: 'sorted' } },
        metrics: cloneMetrics(metrics),
        message: `Cell [${i},${w}] updated to ${dp[i][w]}`,
        phase: 'updated',
        colHeaders,
        rowHeaders
      };
    }
  }

  metrics.maxValue = dp[n][capacity];
  
  // Backtracking for items
  const selected: number[] = [];
  let w = capacity;
  for (let i = n; i > 0 && w > 0; i--) {
     if (dp[i][w] !== dp[i-1][w]) {
        selected.push(i - 1);
        w -= weights[i-1];
     }
  }

  yield {
    structure: dp.map(row => [...row]),
    highlights: { 
       cells: { [`${n},${capacity}`]: 'sorted' },
       selectedIds: selected.map(id => id.toString())
    },
    metrics: cloneMetrics(metrics),
    message: `Optimal solution found! Max Value: ${metrics.maxValue}. Items selected: ${selected.map(id => id+1).join(', ')}`,
    phase: 'complete',
    colHeaders,
    rowHeaders
  };
}
