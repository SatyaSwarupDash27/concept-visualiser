// algorithms/os/sync/diningPhilosophers.plugin.ts
import { lazy } from 'react';
import { registry } from '../../../core/registry/algorithmRegistry';
import { diningPhilosophersGenerator } from './diningPhilosophers.gen';
import { diningPhilosophersMeta } from './diningPhilosophers.meta';

const Visualizer = lazy(() => import('../../../visualizers/os/sync/DiningPhilosophersVisualizer'));

registry.register({
  id: 'diningPhilosophers',
  meta: diningPhilosophersMeta,
  generator: diningPhilosophersGenerator as any,
  visualizer: Visualizer,
  inputConfig: {
    type: 'custom', 
    defaultSize: 5, // phil count
    options: { simulateDeadlock: false }
  },
  stepHint: (input: any) => (input?.count || 5) * 10
});
