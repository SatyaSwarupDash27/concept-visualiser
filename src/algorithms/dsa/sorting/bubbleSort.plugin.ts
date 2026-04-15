// algorithms/dsa/sorting/bubbleSort.plugin.ts
import { lazy } from 'react';
import { registry } from '../../../core/registry/algorithmRegistry';
import { bubbleSortGenerator } from './bubbleSort.gen';
import { bubbleSortMeta } from './bubbleSort.meta';

const MergeSortVisualizer = lazy(() => import('../../../visualizers/dsa/sorting/MergeSortVisualizer'));

registry.register({
  id: 'bubbleSort',
  meta: bubbleSortMeta,
  generator: bubbleSortGenerator,
  visualizer: MergeSortVisualizer, // Bubble sort can reuse the same bar visualization
  inputConfig: {
    type: 'numberArray',
    min: 5,
    max: 20,
    defaultSize: 10
  },
  stepHint: (input: number[]) => input.length * input.length
});
