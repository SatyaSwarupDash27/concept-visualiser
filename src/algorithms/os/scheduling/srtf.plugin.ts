// algorithms/os/scheduling/srtf.plugin.ts
import { lazy } from 'react';
import { registry } from '../../../core/registry/algorithmRegistry';
import { srtfGenerator } from './srtf.gen';
import { srtfMeta } from './srtf.meta';

const SchedulingVisualizer = lazy(() => import('../../../visualizers/os/scheduling/RoundRobinVisualizer'));

registry.register({
  id: 'srtf',
  meta: srtfMeta,
  generator: srtfGenerator as any,
  visualizer: SchedulingVisualizer,
  inputConfig: {
    type: 'processes',
    min: 3,
    max: 8,
    defaultSize: 5
  },
  stepHint: (_input: any) => 50
});
