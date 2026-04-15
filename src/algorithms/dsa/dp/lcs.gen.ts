// algorithms/dsa/dp/lcs.gen.ts
import type { MatrixSnapshot } from '../../../core/types/snapshot.dsa';
import type { ElementState } from '../../../core/types/highlights.types';
import { createMetrics, cloneMetrics } from '../../../core/types/snapshot.base';

export function* lcsGenerator(input: { s1: string, s2: string }): Generator<MatrixSnapshot> {
  const { s1, s2 } = input;
  const n = s1.length;
  const m = s2.length;
  const metrics = createMetrics({ lcsLength: 0, comparisons: 0 });
  const dp: number[][] = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));

  const colLabels = ['', ...s2.split('')];
  const rowLabels = ['', ...s1.split('')];

  yield {
    structure: dp.map(row => [...row]),
    highlights: { cells: {} },
    metrics: cloneMetrics(metrics),
    message: `Starting LCS for "${s1}" and "${s2}"`,
    phase: 'init',
    rowLabels,
    colLabels
  };

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      metrics.comparisons++;
      const hl: Record<string, string> = { [`${i},${j}`]: 'current' };
      
      if (s1[i - 1] === s2[j - 1]) {
        hl[`${i-1},${j-1}`] = 'highlighted';
        yield {
          structure: dp.map(row => [...row]),
          highlights: { cells: hl as Record<string, ElementState> },
          metrics: cloneMetrics(metrics),
          message: `Match! "${s1[i-1]}" == "${s2[j-1]}". Adding 1 to diagonal.`,
          phase: 'match',
          colLabels,
          rowLabels
        };
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        hl[`${i-1},${j}`] = 'highlighted';
        hl[`${i},${j-1}`] = 'highlighted';
        yield {
          structure: dp.map(row => [...row]),
          highlights: { cells: hl as Record<string, ElementState> },
          metrics: cloneMetrics(metrics),
          message: `Mismatch. Taking max of neighbors: max(${dp[i-1][j]}, ${dp[i][j-1]})`,
          phase: 'mismatch',
          colLabels,
          rowLabels
        };
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }

      yield {
        structure: dp.map(row => [...row]),
        highlights: { cells: { [`${i},${j}`]: 'sorted' } },
        metrics: cloneMetrics(metrics),
        message: `Cell [${i},${j}] updated to ${dp[i][j]}`,
        phase: 'updated',
        rowLabels,
        colLabels
      };
    }
  }

  metrics.lcsLength = dp[n][m];
  
  // Backtracking for string
  let res = "";
  let i = n, j = m;
  const finalHl: Record<string, any> = {};
  while (i > 0 && j > 0) {
     if (s1[i-1] === s2[j-1]) {
        res = s1[i-1] + res;
        finalHl[`${i},${j}`] = 'sorted';
        i--; j--;
     } else if (dp[i-1][j] > dp[i][j-1]) {
        i--;
     } else {
        j--;
     }
  }

  yield {
    structure: dp.map(row => [...row]),
    highlights: { cells: finalHl },
    metrics: cloneMetrics(metrics),
    message: `LCS complete! Max Length: ${metrics.lcsLength}. Sequence: "${res}"`,
    phase: 'complete',
    rowLabels,
    colLabels
  };
}
