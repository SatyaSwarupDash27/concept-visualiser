// algorithms/dsa/sorting/mergeSort.plugin.ts
import { lazy } from 'react';
import { registry } from '../../../core/registry/algorithmRegistry';
import { mergeSortGenerator } from './mergeSort.gen';
import { mergeSortMeta } from './mergeSort.meta';

const MergeSortVisualizer = lazy(() => import('../../../visualizers/dsa/sorting/MergeSortVisualizer'));

registry.register({
  id: 'mergeSort',
  meta: mergeSortMeta,
  generator: mergeSortGenerator,
  visualizer: MergeSortVisualizer,
  inputConfig: {
    type: 'numberArray',
    min: 5,
    max: 30,
    defaultSize: 15
  },
  stepHint: (input: number[]) => Math.floor(input.length * Math.log2(input.length) * 4)
});
