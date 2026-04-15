// algorithms/os/scheduling/roundRobin.plugin.ts
import { lazy } from 'react';
import { registry } from '../../../core/registry/algorithmRegistry';
import { roundRobinGenerator } from './roundRobin.gen';
import { roundRobinMeta } from './roundRobin.meta';

const RoundRobinVisualizer = lazy(() => import('../../../visualizers/os/scheduling/RoundRobinVisualizer'));

registry.register({
  id: 'roundRobin',
  meta: roundRobinMeta,
  generator: roundRobinGenerator as any,
  visualizer: RoundRobinVisualizer,
  inputConfig: {
    type: 'processes',
    defaultSize: 5,
    options: { quantum: 2 }
  },
  stepHint: (input: any) => input.processes.reduce((acc: number, p: any) => acc + p.burstTime, 0) * 2
});
