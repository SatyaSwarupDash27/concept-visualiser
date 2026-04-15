// algorithms/dsa/dp/lcs.plugin.ts
import { lazy } from 'react';
import { registry } from '../../../core/registry/algorithmRegistry';
import { lcsGenerator } from './lcs.gen';
import { lcsMeta } from './lcs.meta';

const DPTable = lazy(() => import('../../../visualizers/shared/DPTable').then(m => ({ default: m.DPTable })));

registry.register({
  id: 'lcs',
  meta: lcsMeta,
  generator: lcsGenerator as any,
  visualizer: DPTable as any,
  inputConfig: {
    type: 'custom', 
    defaultSize: 5,
    options: { s1: 'AGGTAB', s2: 'GXTXAYB' }
  },
  stepHint: (input: any) => input.s1.length * input.s2.length * 2
});
