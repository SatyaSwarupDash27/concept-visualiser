// algorithms/dsa/strings/stringMatch.gen.ts
import type { StringSnapshot } from '../../../core/types/snapshot.dsa';
import { createMetrics, cloneMetrics } from '../../../core/types/snapshot.base';

export function* stringMatchGenerator(input: { text: string, pattern: string }): Generator<StringSnapshot> {
  const { text, pattern } = input;
  const n = text.length;
  const m = pattern.length;
  const metrics = createMetrics({ comparisons: 0 });
  const results: number[] = [];

  yield {
    structure: text,
    highlights: { indices: {} },
    metrics: cloneMetrics(metrics),
    message: `Searching for pattern "${pattern}" in text`,
    phase: 'init',
    pattern,
    currentShift: 0,
    matchLength: 0,
    results: []
  };

  for (let i = 0; i <= n - m; i++) {
    yield {
      structure: text,
      highlights: { 
        indices: { [i]: 'current' },
        ranges: [{ start: i, end: i + m - 1, state: 'highlighted' }]
      },
      metrics: cloneMetrics(metrics),
      message: `Checking shift at index ${i}`,
      phase: 'shift',
      pattern,
      currentShift: i,
      matchLength: 0,
      results: [...results]
    };

    let j = 0;
    while (j < m) {
      metrics.comparisons++;
      const isMatch = text[i + j] === pattern[j];

      yield {
        structure: text,
        highlights: { 
          indices: { [i + j]: isMatch ? 'comparing' : 'deadlocked' },
          ranges: [{ start: i, end: i + m - 1, state: 'highlighted' }]
        },
        metrics: cloneMetrics(metrics),
        message: isMatch 
          ? `Match! "${text[i + j]}" == "${pattern[j]}"` 
          : `Mismatch! "${text[i + j]}" != "${pattern[j]}"`,
        phase: 'compare',
        pattern,
        currentShift: i,
        matchLength: j,
        results: [...results]
      };

      if (!isMatch) break;
      j++;
    }

    if (j === m) {
      results.push(i);
      yield {
        structure: text,
        highlights: { 
          indices: {},
          ranges: [{ start: i, end: i + m - 1, state: 'sorted' }]
        },
        metrics: cloneMetrics(metrics),
        message: `Pattern found at index ${i}!`,
        phase: 'found',
        pattern,
        currentShift: i,
        matchLength: m,
        results: [...results]
      };
    }
  }

  yield {
    structure: text,
    highlights: { 
      indices: Object.fromEntries(results.flatMap(start => 
        Array.from({ length: m }, (_, k) => [start + k, 'sorted'])
      ))
    },
    metrics: cloneMetrics(metrics),
    message: results.length > 0 
      ? `Search complete. Found ${results.length} occurrences.` 
      : 'Search complete. No matches found.',
    phase: 'complete',
    pattern,
    currentShift: n - m,
    matchLength: 0,
    results: [...results]
  };
}
