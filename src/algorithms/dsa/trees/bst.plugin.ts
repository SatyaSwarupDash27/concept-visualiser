// algorithms/dsa/trees/bst.plugin.ts
import { lazy } from 'react';
import { registry } from '../../../core/registry/algorithmRegistry';
import { bstGenerator } from './bst.gen';
import { bstMeta } from './bst.meta';

const TreeVisualizer = lazy(() => import('../../../visualizers/dsa/trees/TreeVisualizer'));

registry.register({
  id: 'bst',
  meta: bstMeta,
  generator: bstGenerator,
  visualizer: TreeVisualizer,
  inputConfig: {
    type: 'numberArray',
    min: 3,
    max: 12,
    defaultSize: 7
  },
  stepHint: (input: number[]) => input.length * 5
});
