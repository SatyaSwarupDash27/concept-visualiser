// algorithms/os/deadlock/bankers.plugin.ts
import { lazy } from 'react';
import { registry } from '../../../core/registry/algorithmRegistry';
import { bankersGenerator } from './bankers.gen';
import { bankersMeta } from './bankers.meta';

const Visualizer = lazy(() => import('../../../visualizers/os/deadlock/BankersVisualizer'));

registry.register({
  id: 'bankersAlgorithm',
  meta: bankersMeta,
  generator: bankersGenerator as any,
  visualizer: Visualizer,
  inputConfig: {
    type: 'custom', 
    defaultSize: 5, // process count
    options: { 
      alloc: [
        [0, 1, 0],
        [2, 0, 0],
        [3, 0, 2],
        [2, 1, 1],
        [0, 0, 2]
      ],
      max: [
        [7, 5, 3],
        [3, 2, 2],
        [9, 0, 2],
        [2, 2, 2],
        [4, 3, 3]
      ],
      avail: [3, 3, 2]
    }
  },
  stepHint: (_input: any) => 30
});
