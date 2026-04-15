// algorithms/dsa/searching/binarySearch.plugin.ts
import { lazy } from 'react';
import { registry } from '../../../core/registry/algorithmRegistry';
import { binarySearchGenerator } from './binarySearch.gen';
import { binarySearchMeta } from './binarySearch.meta';

const SearchVisualizer = lazy(() => import('../../../visualizers/dsa/searching/SearchVisualizer'));

registry.register({
  id: 'binarySearch',
  meta: binarySearchMeta,
  generator: (input: number[]) => {
    // Wrap to handle array-only input from InputConfigurator
    const sorted = [...input].sort((a, b) => a - b);
    const target = sorted[Math.floor(Math.random() * sorted.length)]; 
    return binarySearchGenerator({ array: sorted, target });
  },
  visualizer: SearchVisualizer,
  inputConfig: {
    type: 'numberArray',
    min: 10,
    max: 50,
    defaultSize: 20
  },
  stepHint: (input: number[]) => Math.ceil(Math.log2(input.length)) + 2
});
