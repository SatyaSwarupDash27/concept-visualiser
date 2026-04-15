// algorithms/dsa/trees/heap.plugin.ts
import { lazy } from 'react';
import { registry } from '../../../core/registry/algorithmRegistry';
import { heapGenerator } from './heap.gen';
import { heapMeta } from './heap.meta';

const TreeVisualizer = lazy(() => import('../../../visualizers/dsa/trees/TreeVisualizer'));

registry.register({
  id: 'maxHeap',
  meta: heapMeta,
  generator: heapGenerator,
  visualizer: TreeVisualizer,
  inputConfig: {
    type: 'numberArray',
    min: 3,
    max: 15,
    defaultSize: 10
  },
  stepHint: (input: number[]) => input.length * 8
});
