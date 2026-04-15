// algorithms/dsa/linear/queue.plugin.ts
import { lazy } from 'react';
import { registry } from '../../../core/registry/algorithmRegistry';
import { queueGenerator } from './queue.gen';
import { queueMeta } from './queue.meta';

const QueueVisualizer = lazy(() => import('../../../visualizers/dsa/linear/StackQueueVisualizer').then(m => ({ default: m.QueueVisualizer })));

registry.register({
  id: 'queue',
  meta: queueMeta,
  generator: queueGenerator,
  visualizer: QueueVisualizer,
  inputConfig: {
    type: 'numberArray',
    min: 3,
    max: 10,
    defaultSize: 5
  },
  stepHint: (input: number[]) => input.length * 3
});
