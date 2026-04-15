// algorithms/dsa/trees/bst.gen.ts
import type { TreeSnapshot, TreeNode } from '../../../core/types/snapshot.dsa';
import { createMetrics, cloneMetrics } from '../../../core/types/snapshot.base';

export function* bstGenerator(input: number[]): Generator<TreeSnapshot> {
  const metrics = createMetrics({ comparisons: 0 });
  let root: TreeNode | undefined = undefined;

  yield {
    structure: undefined as any,
    highlights: { nodes: {}, edges: {} },
    metrics: cloneMetrics(metrics),
    message: 'Starting Binary Search Tree construction',
    phase: 'init',
  };

  for (const value of input) {
    if (!root) {
      root = { id: `node-${value}`, value, left: undefined, right: undefined };
      yield {
        structure: JSON.parse(JSON.stringify(root)),
        highlights: { nodes: { [`node-${value}`]: 'sorted' }, edges: {} },
        metrics: cloneMetrics(metrics),
        message: `Set ${value} as the root of the tree`,
        phase: 'insert',
      };
    } else {
      yield* insertNode(root, value, metrics);
    }
  }

  yield {
    structure: JSON.parse(JSON.stringify(root)),
    highlights: { nodes: {}, edges: {} },
    metrics: cloneMetrics(metrics),
    message: 'BST construction complete!',
    phase: 'complete',
  };
}

function* insertNode(root: TreeNode, value: number, metrics: any): Generator<TreeSnapshot> {
  let curr = root;
  const parentPath: string[] = [];

  while (true) {
    metrics.comparisons++;
    yield {
      structure: JSON.parse(JSON.stringify(root)),
      highlights: { 
        nodes: { [curr.id]: 'comparing' },
        edges: {}
      },
      metrics: cloneMetrics(metrics),
      message: `Comparing ${value} with ${curr.value}`,
      phase: 'compare',
    };

    if (value < curr.value) {
      if (!curr.left) {
        curr.left = { id: `node-${value}`, value, left: undefined, right: undefined };
        yield {
          structure: JSON.parse(JSON.stringify(root)),
          highlights: { nodes: { [`node-${value}`]: 'sorted' }, edges: {} },
          metrics: cloneMetrics(metrics),
          message: `Inserted ${value} to the left of ${curr.value}`,
          phase: 'insert',
        };
        break;
      } else {
        curr = curr.left;
      }
    } else if (value > curr.value) {
      if (!curr.right) {
        curr.right = { id: `node-${value}`, value, left: undefined, right: undefined };
        yield {
          structure: JSON.parse(JSON.stringify(root)),
          highlights: { nodes: { [`node-${value}`]: 'sorted' }, edges: {} },
          metrics: cloneMetrics(metrics),
          message: `Inserted ${value} to the right of ${curr.value}`,
          phase: 'insert',
        };
        break;
      } else {
        curr = curr.right;
      }
    } else {
      // Duplicate
      break;
    }
  }
}
