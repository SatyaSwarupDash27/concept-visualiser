// algorithms/os/disk/disk.plugin.ts
import { lazy } from 'react';
import { registry } from '../../../core/registry/algorithmRegistry';
import { diskGenerator } from './disk.gen';
import { diskMeta } from './disk.meta';

const DiskVisualizer = lazy(() => import('../../../visualizers/os/disk/DiskVisualizer'));

registry.register({
  id: 'diskScheduling',
  meta: diskMeta,
  generator: diskGenerator as any,
  visualizer: DiskVisualizer,
  inputConfig: {
    type: 'custom', 
    defaultSize: 8,
    options: { strategy: 'SSTF', start: 53, requests: [98, 183, 37, 122, 14, 124, 65, 67] }
  },
  stepHint: (input: any) => input.requests.length * 15
});
