// algorithms/os/scheduling/sjf.plugin.ts
import { lazy } from 'react';
import { registry } from '../../../core/registry/algorithmRegistry';
import { sjfGenerator } from './sjf.gen';
import { sjfMeta } from './sjf.meta';

const RoundRobinVisualizer = lazy(() => import('../../../visualizers/os/scheduling/RoundRobinVisualizer'));

registry.register({
  id: 'sjf',
  meta: sjfMeta,
  generator: sjfGenerator as any,
  visualizer: RoundRobinVisualizer, // Reusing RR visualizer as it handles queues and Gantt charts
  inputConfig: {
    type: 'processes',
    defaultSize: 4
  },
  stepHint: (input: any) => input.processes.reduce((acc: number, p: any) => acc + p.burstTime, 0) * 2
});
