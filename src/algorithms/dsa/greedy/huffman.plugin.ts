// algorithms/dsa/greedy/huffman.plugin.ts
import { lazy } from 'react';
import { registry } from '../../../core/registry/algorithmRegistry';
import { huffmanGenerator } from './huffman.gen';
import { huffmanMeta } from './huffman.meta';

const TreeVisualizer = lazy(() => import('../../../visualizers/dsa/trees/TreeVisualizer'));

registry.register({
  id: 'huffmanCoding',
  meta: huffmanMeta,
  generator: huffmanGenerator as any,
  visualizer: TreeVisualizer,
  inputConfig: {
    type: 'custom', 
    defaultSize: 10,
    options: { text: 'BEEP BOOP BEEP' }
  },
  stepHint: (_input: any) => 30
});
