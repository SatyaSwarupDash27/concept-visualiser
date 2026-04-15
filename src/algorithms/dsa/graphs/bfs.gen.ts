// algorithms/dsa/graphs/bfs.gen.ts
import type { GraphSnapshot, GraphStructure } from '../../../core/types/snapshot.dsa';
import { createMetrics, cloneMetrics } from '../../../core/types/snapshot.base';

export function* bfsGenerator(input: GraphStructure): Generator<GraphSnapshot> {
  const { nodes, edges } = input;
  const metrics = createMetrics({ visitedNodes: 0, queueSize: 0 });
  const visited = new Set<string>();
  const queue: string[] = [];

  const startNode = nodes[0]?.id;
  if (!startNode) return;

  queue.push(startNode);
  metrics.queueSize = 1;

  yield {
    structure: { nodes, edges },
    highlights: { nodes: { [startNode]: 'current' }, edges: {} },
    metrics: cloneMetrics(metrics),
    message: `Starting BFS from node ${nodes[0].label}`,
    phase: 'init',
  };

  while (queue.length > 0) {
    const currId = queue.shift()!;
    metrics.queueSize = queue.length;

    if (visited.has(currId)) continue;
    visited.add(currId);
    metrics.visitedNodes = visited.size;

    const currNode = nodes.find(n => n.id === currId)!;

    yield {
      structure: { nodes, edges },
      highlights: { 
        nodes: Object.fromEntries([
          ...Array.from(visited).map(id => [id, 'visited' as const]),
          [currId, 'current' as const]
        ]),
        edges: {}
      },
      metrics: cloneMetrics(metrics),
      message: `Visiting node ${currNode.label}`,
      phase: 'visit',
    };

    const neighbors = edges
      .filter(e => e.from === currId)
      .map(e => e.to);

    for (const neighborId of neighbors) {
      if (!visited.has(neighborId)) {
        queue.push(neighborId);
        metrics.queueSize = queue.length;

        const edgeId = `${currId}→${neighborId}`;
        const neighborNode = nodes.find(n => n.id === neighborId)!;

        yield {
          structure: { nodes, edges },
          highlights: { 
            nodes: Object.fromEntries([
              ...Array.from(visited).map(id => [id, 'visited' as const]),
              [currId, 'current' as const],
              [neighborId, 'comparing' as const]
            ]),
            edges: { [edgeId]: 'path' }
          },
          metrics: cloneMetrics(metrics),
          message: `Adding neighbor ${neighborNode.label} to queue`,
          phase: 'enqueue',
        };
      }
    }
  }

  yield {
    structure: { nodes, edges },
    highlights: { 
      nodes: Object.fromEntries(Array.from(visited).map(id => [id, 'sorted' as const])),
      edges: {}
    },
    metrics: cloneMetrics(metrics),
    message: 'BFS Traversal completed!',
    phase: 'complete',
  };
}
