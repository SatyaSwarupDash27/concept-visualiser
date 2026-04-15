// algorithms/dsa/linear/expressionEval.plugin.ts
import { lazy } from 'react';
import { registry } from '../../../core/registry/algorithmRegistry';
import { expressionEvalGenerator } from './expressionEval.gen';
import { expressionEvalMeta } from './expressionEval.meta';

const ExpressionVisualizer = lazy(() => import('../../../visualizers/dsa/linear/ExpressionVisualizer'));

registry.register({
  id: 'infixToPostfix',
  meta: expressionEvalMeta,
  generator: expressionEvalGenerator as any,
  visualizer: ExpressionVisualizer,
  inputConfig: {
    type: 'custom', 
    defaultSize: 10,
    options: { defaultValue: 'A+B*(C-D)^E' }
  },
  stepHint: (input: any) => (input?.length || input?.defaultValue?.length || 0) * 3
});
