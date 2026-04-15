// algorithms/dsa/strings/stringMatch.meta.ts
import type { AlgorithmMeta } from '../../../core/types/algorithm.types';

export const stringMatchMeta: AlgorithmMeta = {
  name: 'Naive String Matching',
  category: 'Strings',
  domain: 'dsa',
  description: 'The simplest string searching algorithm. It slides the pattern over the text one character at a time and checks for a match at each position.',
  complexity: {
    time: { best: 'O(n)', average: 'O(n*m)', worst: 'O(n*m)' }, // n=text, m=pattern
    space: { best: 'O(1)', average: 'O(1)', worst: 'O(1)' },
  },
  useCases: [
    'Simple pattern searching',
    'Short pattern/text combinations',
    'Educational intro to string algorithms'
  ],
  metrics: ['comparisons'],
};
