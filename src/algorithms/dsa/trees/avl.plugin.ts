// algorithms/dsa/trees/avl.plugin.ts
import { lazy } from 'react';
import { registry } from '../../../core/registry/algorithmRegistry';
import { avlGenerator } from './avl.gen';
import { avlMeta } from './avl.meta';

const TreeVisualizer = lazy(() => import('../../../visualizers/dsa/trees/TreeVisualizer'));

registry.register({
  id: 'avl',
  meta: avlMeta,
  generator: avlGenerator as any,
  visualizer: TreeVisualizer,
  inputConfig: {
    type: 'numberArray',
    min: 3,
    max: 10,
    defaultSize: 6
  },
  stepHint: (input: number[]) => input.length * 10
});
