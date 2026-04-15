// algorithms/dsa/greedy/activitySelection.plugin.ts
import { lazy } from 'react';
import { registry } from '../../../core/registry/algorithmRegistry';
import { activitySelectionGenerator } from './activitySelection.gen';
import { activitySelectionMeta } from './activitySelection.meta';

const TimelineVisualizer = lazy(() => import('../../../visualizers/dsa/greedy/TimelineVisualizer'));

registry.register({
  id: 'activitySelection',
  meta: activitySelectionMeta,
  generator: activitySelectionGenerator,
  visualizer: TimelineVisualizer,
  inputConfig: {
    type: 'custom', 
    defaultSize: 8,
    options: { 
      activities: [
        { id: 'A1', start: 1, end: 4 },
        { id: 'A2', start: 3, end: 5 },
        { id: 'A3', start: 0, end: 6 },
        { id: 'A4', start: 5, end: 7 },
        { id: 'A5', start: 3, end: 8 },
        { id: 'A6', start: 5, end: 9 },
        { id: 'A7', start: 6, end: 10 },
        { id: 'A8', start: 8, end: 11 }
      ]
    }
  },
  stepHint: (_input: any) => 20
});
