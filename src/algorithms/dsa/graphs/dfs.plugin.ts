// algorithms/dsa/graphs/dfs.plugin.ts
import { lazy } from 'react';
import { registry } from '../../../core/registry/algorithmRegistry';
import { dfsGenerator } from './dfs.gen';
import { dfsMeta } from './dfs.meta';

const GraphCanvas = lazy(() => import('../../../visualizers/shared/GraphCanvas').then(m => ({ default: m.GraphCanvas })));

registry.register({
  id: 'dfs',
  meta: dfsMeta,
  generator: dfsGenerator,
  visualizer: GraphCanvas as any,
  inputConfig: {
    type: 'graph',
    min: 4,
    max: 10,
    defaultSize: 6
  },
  stepHint: (input: any) => input.nodes.length * 4
});
