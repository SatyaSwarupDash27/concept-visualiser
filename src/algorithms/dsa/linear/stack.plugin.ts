// algorithms/dsa/linear/stack.plugin.ts
import { lazy } from 'react';
import { registry } from '../../../core/registry/algorithmRegistry';
import { stackGenerator } from './stack.gen';
import { stackMeta } from './stack.meta';

const StackVisualizer = lazy(() => import('../../../visualizers/dsa/linear/StackQueueVisualizer').then(m => ({ default: m.StackVisualizer })));

registry.register({
  id: 'stack',
  meta: stackMeta,
  generator: stackGenerator,
  visualizer: StackVisualizer,
  inputConfig: {
    type: 'numberArray',
    min: 3,
    max: 10,
    defaultSize: 5
  },
  stepHint: (input: number[]) => input.length * 3
});
