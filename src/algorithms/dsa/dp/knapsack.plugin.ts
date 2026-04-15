// algorithms/dsa/dp/knapsack.plugin.ts
import { lazy } from 'react';
import { registry } from '../../../core/registry/algorithmRegistry';
import { knapsackGenerator } from './knapsack.gen';
import { knapsackMeta } from './knapsack.meta';

const DPTable = lazy(() => import('../../../visualizers/shared/DPTable').then(m => ({ default: m.DPTable })));

registry.register({
  id: 'knapsack',
  meta: knapsackMeta,
  generator: knapsackGenerator as any,
  visualizer: DPTable as any,
  inputConfig: {
    type: 'custom', 
    defaultSize: 4,
    options: { capacity: 7, weights: [1, 3, 4, 5], values: [1, 4, 5, 7] }
  },
  stepHint: (input: any) => input.weights.length * input.capacity * 2
});
