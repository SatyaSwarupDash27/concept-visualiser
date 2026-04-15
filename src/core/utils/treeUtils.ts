// core/utils/treeUtils.ts
import type { TreeNode } from '../types/snapshot.dsa';

export interface PositionedTreeNode extends TreeNode {
  x: number;
  y: number;
  left?: PositionedTreeNode;
  right?: PositionedTreeNode;
}

/**
 * Calculates (x, y) coordinates for nodes in a binary tree.
 * Uses a recursive layout where each level is fixed in Y and X is distributed.
 */
export function layoutTree(
  node: TreeNode | undefined, 
  x: number = 400, 
  y: number = 50, 
  xOffset: number = 200
): PositionedTreeNode | undefined {
  if (!node) return undefined;

  const positioned: PositionedTreeNode = {
    ...node,
    x,
    y,
    left: layoutTree(node.left, x - xOffset, y + 80, xOffset / 2),
    right: layoutTree(node.right, x + xOffset, y + 80, xOffset / 2)
  };

  return positioned;
}

/**
 * Flattens a positioned tree into an array of nodes and edges for rendering.
 */
export function flattenTree(node: PositionedTreeNode | undefined) {
  const nodes: { id: string; x: number; y: number; value: number }[] = [];
  const edges: { from: { x: number; y: number }; to: { x: number; y: number }; id: string }[] = [];

  function traverse(n: PositionedTreeNode | undefined) {
    if (!n) return;
    nodes.push({ id: n.id, x: n.x, y: n.y, value: n.value });
    
    if (n.left) {
      edges.push({ 
        id: `${n.id}-${n.left.id}`, 
        from: { x: n.x, y: n.y }, 
        to: { x: n.left.x, y: n.left.y } 
      });
      traverse(n.left);
    }
    
    if (n.right) {
      edges.push({ 
        id: `${n.id}-${n.right.id}`, 
        from: { x: n.x, y: n.y }, 
        to: { x: n.right.x, y: n.right.y } 
      });
      traverse(n.right);
    }
  }

  traverse(node);
  return { nodes, edges };
}
