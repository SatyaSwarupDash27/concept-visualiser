// algorithms/dsa/graphs/bfs.plugin.ts
import { lazy } from 'react';
import { registry } from '../../../core/registry/algorithmRegistry';
import { bfsGenerator } from './bfs.gen';
import { bfsMeta } from './bfs.meta';

const BFSVisualizer = lazy(() => import('../../../visualizers/dsa/graphs/BFSVisualizer'));

registry.register({
  id: 'bfs',
  meta: bfsMeta,
  generator: bfsGenerator as any,
  visualizer: BFSVisualizer,
  inputConfig: {
    type: 'graph',
    defaultSize: 6
  },
  stepHint: (input: any) => (input.nodes.length + input.edges.length) * 3
});
