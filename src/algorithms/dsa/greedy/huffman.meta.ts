// algorithms/dsa/greedy/huffman.meta.ts
import type { AlgorithmMeta } from '../../../core/types/algorithm.types';

export const huffmanMeta: AlgorithmMeta = {
  name: 'Huffman Coding',
  category: 'Greedy Algorithms',
  domain: 'dsa',
  description: 'An optimal prefix coding algorithm used for lossless data compression. It assigns shorter binary codes to more frequent characters and longer codes to less frequent ones.',
  complexity: {
    time: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
    space: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
  },
  useCases: [
    'ZIP/Gzip compression',
    'JPEG image compression',
    'MP3 audio encoding',
    'Efficient network transmission'
  ],
  metrics: ['comparisons', 'compressionRatio'],
};
