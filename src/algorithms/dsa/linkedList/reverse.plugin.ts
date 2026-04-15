// algorithms/dsa/linkedList/reverse.plugin.ts
import { lazy } from 'react';
import { registry } from '../../../core/registry/algorithmRegistry';
import { reverseGenerator } from './reverse.gen';
import { reverseMeta } from './reverse.meta';

const LinkedListVisualizer = lazy(() => import('../../../visualizers/dsa/linkedList/LinkedListVisualizer'));

registry.register({
  id: 'reverseLinkedList',
  meta: reverseMeta,
  generator: reverseGenerator,
  visualizer: LinkedListVisualizer,
  inputConfig: {
    type: 'numberArray',
    min: 3,
    max: 8,
    defaultSize: 5
  },
  stepHint: (input: number[]) => input.length * 3
});
