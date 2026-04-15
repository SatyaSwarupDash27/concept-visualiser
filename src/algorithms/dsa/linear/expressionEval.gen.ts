// algorithms/dsa/linear/expressionEval.gen.ts
import type { ExpressionSnapshot, ExpressionState } from '../../../core/types/snapshot.dsa';
import { createMetrics, cloneMetrics } from '../../../core/types/snapshot.base';

const precedence: Record<string, number> = {
  '+': 1, '-': 1,
  '*': 2, '/': 2,
  '^': 3
};

export function* expressionEvalGenerator(input: any): Generator<ExpressionSnapshot> {
  // Handle both direct string input and wrapped options object
  const rawInput = typeof input === 'string' 
    ? input 
    : (input?.defaultValue || input?.text || '');
    
  const tokens = rawInput.replace(/\s+/g, '').split('');
  const state: ExpressionState = {
    input: [...tokens],
    stack: [],
    output: [],
    currentIndex: 0,
    topOfStack: null
  };
  
  const metrics = createMetrics({ operations: 0 });

  yield {
    structure: { ...state },
    highlights: { indices: {} },
    metrics: cloneMetrics(metrics),
    message: 'Starting Infix to Postfix conversion',
    phase: 'init',
    action: 'skip'
  };

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    state.currentIndex = i;
    metrics.operations = (metrics.operations || 0) + 1;

    yield {
      structure: { ...state, stack: [...state.stack], output: [...state.output] },
      highlights: { indices: { [i]: 'comparing' } },
      metrics: cloneMetrics(metrics),
      message: `Processing token: ${token}`,
      phase: 'process',
      action: 'skip'
    };

    if (/[a-zA-Z0-9]/.test(token)) {
      // Operand: goes straight to output
      state.output.push(token);
      yield {
        structure: { ...state, stack: [...state.stack], output: [...state.output] },
        highlights: { indices: { [i]: 'sorted' } },
        metrics: cloneMetrics(metrics),
        message: `Operand ${token} added to output`,
        phase: 'operand',
        action: 'toOutput'
      };
    } else if (token === '(') {
      state.stack.push(token);
      state.topOfStack = token;
      yield {
        structure: { ...state, stack: [...state.stack], output: [...state.output] },
        highlights: { indices: { [i]: 'highlighted' } },
        metrics: cloneMetrics(metrics),
        message: `Left parenthesis ( found, pushing to stack`,
        phase: 'parenthesis',
        action: 'push'
      };
    } else if (token === ')') {
      while (state.stack.length > 0 && state.stack[state.stack.length - 1] !== '(') {
        const op = state.stack.pop()!;
        state.output.push(op);
        yield {
          structure: { ...state, stack: [...state.stack], output: [...state.output] },
          highlights: { indices: { [i]: 'swapping' } },
          metrics: cloneMetrics(metrics),
          message: `Right parenthesis ) found. Popping ${op} to output.`,
          phase: 'pop-until-paren',
          action: 'pop'
        };
      }
      state.stack.pop(); // Remove '('
      yield {
        structure: { ...state, stack: [...state.stack], output: [...state.output] },
        highlights: { indices: { [i]: 'sorted' } },
        metrics: cloneMetrics(metrics),
        message: `Removing matching ( from stack`,
        phase: 'discard-paren',
        action: 'pop'
      };
    } else {
      // Operator
      while (
        state.stack.length > 0 &&
        state.stack[state.stack.length - 1] !== '(' &&
        precedence[state.stack[state.stack.length - 1]] >= precedence[token]
      ) {
        const op = state.stack.pop()!;
        state.output.push(op);
        yield {
          structure: { ...state, stack: [...state.stack], output: [...state.output] },
          highlights: { indices: { [i]: 'swapping' } },
          metrics: cloneMetrics(metrics),
          message: `Stack top ${op} has higher/equal precedence than ${token}. Popping to output.`,
          phase: 'precedence-pop',
          action: 'pop',
          precedenceCheck: {
            incoming: token,
            stackTop: op,
            result: 'pop'
          }
        };
      }
      state.stack.push(token);
      state.topOfStack = token;
      yield {
        structure: { ...state, stack: [...state.stack], output: [...state.output] },
        highlights: { indices: { [i]: 'highlighted' } },
        metrics: cloneMetrics(metrics),
        message: `Pushing operator ${token} to stack`,
        phase: 'operator-push',
        action: 'push'
      };
    }
  }

  // Pop remaining
  while (state.stack.length > 0) {
    const op = state.stack.pop()!;
    state.output.push(op);
    yield {
      structure: { ...state, stack: [...state.stack], output: [...state.output] },
      highlights: { indices: {} },
      metrics: cloneMetrics(metrics),
      message: `Expression end. Popping remaining operator ${op} to output.`,
      phase: 'final-pop',
      action: 'pop'
    };
  }

  yield {
    structure: { ...state, stack: [...state.stack], output: [...state.output] },
    highlights: { indices: {} },
    metrics: cloneMetrics(metrics),
    message: 'Infix to Postfix conversion complete!',
    phase: 'complete',
    action: 'skip'
  };
}
