// algorithms/dsa/linear/expressionEval.meta.ts
import type { AlgorithmMeta } from '../../../core/types/algorithm.types';

export const expressionEvalMeta: AlgorithmMeta = {
  name: 'Infix to Postfix',
  category: 'Linear Structures',
  domain: 'dsa',
  description: 'Converts a mathematical expression from infix notation (e.g., A + B) to postfix notation (e.g., AB+) using a stack. This is the first step for computers to evaluate complex math.',
  complexity: {
    time: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
    space: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
  },
  useCases: [
    'Compiler parser design',
    'Expression evaluation in calculators',
    'Shunting-yard algorithm implementation'
  ],
  metrics: ['operations'],
};
