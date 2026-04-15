// algorithms/dsa/strings/stringMatch.plugin.ts
import { lazy } from 'react';
import { registry } from '../../../core/registry/algorithmRegistry';
import { stringMatchGenerator } from './stringMatch.gen';
import { stringMatchMeta } from './stringMatch.meta';

const StringMatchVisualizer = lazy(() => import('../../../visualizers/dsa/strings/StringMatchVisualizer'));

registry.register({
  id: 'naiveStringMatch',
  meta: stringMatchMeta,
  generator: stringMatchGenerator as any,
  visualizer: StringMatchVisualizer,
  inputConfig: {
    type: 'custom', 
    defaultSize: 15,
    options: { text: 'ABABDABACDABABCABAB', pattern: 'ABABC' }
  },
  stepHint: (input: any) => (input?.text?.length || 0) * (input?.pattern?.length || 0)
});
