// algorithms/os/sync/producerConsumer.plugin.ts
import { lazy } from 'react';
import { registry } from '../../../core/registry/algorithmRegistry';
import { producerConsumerGenerator } from './producerConsumer.gen';
import { producerConsumerMeta } from './producerConsumer.meta';

const Visualizer = lazy(() => import('../../../visualizers/os/sync/SyncVisualizer'));

registry.register({
  id: 'producerConsumer',
  meta: producerConsumerMeta,
  generator: producerConsumerGenerator as any,
  visualizer: Visualizer as any,
  inputConfig: {
    type: 'custom', 
    defaultSize: 5, // buffer size
    options: { operations: 15 }
  },
  stepHint: (input: any) => input.operations * 2
});
