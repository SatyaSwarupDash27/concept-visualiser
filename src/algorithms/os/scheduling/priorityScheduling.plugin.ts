// algorithms/os/scheduling/priorityScheduling.plugin.ts
import { lazy } from 'react';
import { registry } from '../../../core/registry/algorithmRegistry';
import { priorityGenerator } from './priorityScheduling.gen';
import { prioritySchedulingMeta } from './priorityScheduling.meta';

const SchedulingVisualizer = lazy(() => import('../../../visualizers/os/scheduling/RoundRobinVisualizer'));

registry.register({
  id: 'priorityScheduling',
  meta: prioritySchedulingMeta,
  generator: priorityGenerator as any,
  visualizer: SchedulingVisualizer,
  inputConfig: {
    type: 'processes',
    min: 3,
    max: 8,
    defaultSize: 5
  },
  stepHint: (_input: any) => 50
});
