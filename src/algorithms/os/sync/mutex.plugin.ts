// algorithms/os/sync/mutex.plugin.ts
import { lazy } from 'react';
import { registry } from '../../../core/registry/algorithmRegistry';
import { mutexGenerator } from './mutex.gen';
import { mutexMeta } from './mutex.meta';

const SyncVisualizer = lazy(() => import('../../../visualizers/os/sync/SyncVisualizer'));

registry.register({
  id: 'mutex',
  meta: mutexMeta,
  generator: mutexGenerator as any,
  visualizer: SyncVisualizer,
  inputConfig: {
    type: 'custom', 
    defaultSize: 4,
    options: { iterations: 3 }
  },
  stepHint: (input: any) => input.threadCount * input.iterations * 3
});
