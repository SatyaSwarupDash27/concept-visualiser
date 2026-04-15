// algorithms/dsa/graphs/dijkstra.plugin.ts
import { lazy } from 'react';
import { registry } from '../../../core/registry/algorithmRegistry';
import { dijkstraGenerator } from './dijkstra.gen';
import { dijkstraMeta } from './dijkstra.meta';

const GraphCanvas = lazy(() => import('../../../visualizers/shared/GraphCanvas').then(m => ({ default: m.GraphCanvas })));

registry.register({
  id: 'dijkstra',
  meta: dijkstraMeta,
  generator: dijkstraGenerator,
  visualizer: GraphCanvas as any,
  inputConfig: {
    type: 'graph',
    min: 4,
    max: 10,
    defaultSize: 6
  },
  stepHint: (input: any) => input.nodes.length * input.nodes.length
});
