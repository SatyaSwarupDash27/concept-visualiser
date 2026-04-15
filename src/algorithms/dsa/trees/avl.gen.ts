// algorithms/dsa/trees/avl.gen.ts
import type { TreeSnapshot, TreeNode } from '../../../core/types/snapshot.dsa';
import { createMetrics, cloneMetrics } from '../../../core/types/snapshot.base';

interface AVLNode extends TreeNode {
  height: number;
  left?: AVLNode;
  right?: AVLNode;
}

export function* avlGenerator(input: number[]): Generator<TreeSnapshot> {
  const metrics = createMetrics({ comparisons: 0, swaps: 0 });
  let root: AVLNode | undefined = undefined;

  for (const value of input) {
    const result = yield* insertAVL(root, value, metrics);
    root = result.node as AVLNode;
    
    yield {
      structure: JSON.parse(JSON.stringify(root)),
      highlights: { nodes: {}, edges: {} },
      metrics: cloneMetrics(metrics),
      message: `Finished inserting ${value}. Tree is balanced.`,
      phase: 'complete-step',
      balanceFactors: calculateAllBalanceFactors(root)
    };
  }
}

function* insertAVL(node: AVLNode | undefined, value: number, metrics: any): Generator<TreeSnapshot, { node: AVLNode }> {
  if (!node) {
    const newNode: AVLNode = { id: `node-${value}`, value, height: 1 };
    return { node: newNode };
  }

  metrics.comparisons++;
  if (value < node.value) {
    const res = yield* insertAVL(node.left, value, metrics);
    node.left = res.node;
  } else if (value > node.value) {
    const res = yield* insertAVL(node.right, value, metrics);
    node.right = res.node;
  } else {
    return { node };
  }

  node.height = 1 + Math.max(getHeight(node.left), getHeight(node.right));
  const balance = getBalance(node);

  // Re-balancing logic
  if (balance > 1 && node.left && value < node.left.value) {
    // Left Left Case
    return yield* rotateRight(node, metrics, 'LL');
  }

  if (balance < -1 && node.right && value > node.right.value) {
    // Right Right Case
    return yield* rotateLeft(node, metrics, 'RR');
  }

  if (balance > 1 && node.left && value > node.left.value) {
    // Left Right Case
    const res = yield* rotateLeft(node.left, metrics, 'LR-Part1');
    node.left = res.node;
    return yield* rotateRight(node, metrics, 'LR-Part2');
  }

  if (balance < -1 && node.right && value < node.right.value) {
    // Right Left Case
    const res = yield* rotateRight(node.right, metrics, 'RL-Part1');
    node.right = res.node;
    return yield* rotateLeft(node, metrics, 'RL-Part2');
  }

  return { node };
}

function* rotateLeft(z: AVLNode, metrics: any, type: string): Generator<TreeSnapshot, { node: AVLNode }> {
  const y = z.right!;
  const T2 = y.left;

  yield {
    structure: undefined as any, // Visualizer will handle root-finding if structure is null or we provide current root
    highlights: { nodes: { [z.id]: 'swapping', [y.id]: 'swapping' }, edges: {} },
    metrics: cloneMetrics(metrics),
    message: `Left Rotation triggered (${type}) on node ${z.value}`,
    phase: 'rotate',
    rotationType: type as any
  };

  y.left = z;
  z.right = T2;

  z.height = 1 + Math.max(getHeight(z.left), getHeight(z.right));
  y.height = 1 + Math.max(getHeight(y.left), getHeight(y.right));

  metrics.swaps++;
  return { node: y };
}

function* rotateRight(y: AVLNode, metrics: any, type: string): Generator<TreeSnapshot, { node: AVLNode }> {
  const x = y.left!;
  const T2 = x.right;

  yield {
    structure: undefined as any,
    highlights: { nodes: { [y.id]: 'swapping', [x.id]: 'swapping' }, edges: {} },
    metrics: cloneMetrics(metrics),
    message: `Right Rotation triggered (${type}) on node ${y.value}`,
    phase: 'rotate',
    rotationType: type as any
  };

  x.right = y;
  y.left = T2;

  y.height = 1 + Math.max(getHeight(y.left), getHeight(y.right));
  x.height = 1 + Math.max(getHeight(x.left), getHeight(x.right));

  metrics.swaps++;
  return { node: x };
}

// Helpers
function getHeight(n?: AVLNode) { return n ? n.height : 0; }
function getBalance(n?: AVLNode) { return n ? getHeight(n.left) - getHeight(n.right) : 0; }

function calculateAllBalanceFactors(root?: AVLNode): Record<string, number> {
  const bf: Record<string, number> = {};
  function traverse(n?: AVLNode) {
    if (!n) return;
    bf[n.id] = getBalance(n);
    traverse(n.left);
    traverse(n.right);
  }
  traverse(root);
  return bf;
}
