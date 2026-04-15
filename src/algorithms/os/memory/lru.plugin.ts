// algorithms/os/memory/lru.plugin.ts
import { lazy } from 'react';
import { registry } from '../../../core/registry/algorithmRegistry';
import { lruGenerator } from './lru.gen';
import { lruMeta } from './lru.meta';

const PageReplacementVisualizer = lazy(() => import('../../../visualizers/os/memory/PageReplacementVisualizer'));

registry.register({
  id: 'lru',
  meta: lruMeta,
  generator: lruGenerator as any,
  visualizer: PageReplacementVisualizer,
  inputConfig: {
    type: 'pageSequence', 
    defaultSize: 10,
    min: 5,
    max: 20,
    options: { frameCount: 3 }
  },
  stepHint: (input: any) => input.pages.length + 1
});
