// algorithms/dsa/dp/lcs.meta.ts
import type { AlgorithmMeta } from '../../../core/types/algorithm.types';

export const lcsMeta: AlgorithmMeta = {
  name: 'Longest Common Subsequence (LCS)',
  category: 'Dynamic Programming',
  domain: 'dsa',
  description: 'Finds the longest subsequence present in two strings in the same relative order, but not necessarily contiguous. Used extensively in bioinformatics and file diffing utilities.',
  complexity: {
    time: { best: 'O(n*m)', average: 'O(n*m)', worst: 'O(n*m)' }, // n, m = lengths of strings
    space: { best: 'O(n*m)', average: 'O(n*m)', worst: 'O(n*m)' },
  },
  useCases: [
    'Bioinformatics (DNA sequence alignment)',
    'Version control systems (git diff)',
    'Plagiarism detection'
  ],
  metrics: ['lcsLength', 'comparisons'],
};
