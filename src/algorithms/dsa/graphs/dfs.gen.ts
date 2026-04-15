// algorithms/dsa/graphs/dfs.gen.ts
import type { GraphSnapshot, GraphStructure } from '../../../core/types/snapshot.dsa';
import { createMetrics, cloneMetrics } from '../../../core/types/snapshot.base';

export function* dfsGenerator(input: GraphStructure): Generator<GraphSnapshot> {
  const { nodes, edges } = input;
  const metrics = createMetrics({ nodesVisited: 0 });
  const visited = new Set<string>();
  const hlNodes: Record<string, any> = {};
  const hlEdges: Record<string, any> = {};

  yield {
    structure: input,
    highlights: { nodes: {}, edges: {} },
    metrics: cloneMetrics(metrics),
    message: 'Starting DFS from the first node',
    phase: 'init',
  };

  if (nodes.length > 0) {
    yield* dfsVisit(nodes[0].id, input, visited, hlNodes, hlEdges, metrics);
  }

  yield {
    structure: input,
    highlights: { nodes: hlNodes, edges: hlEdges },
    metrics: cloneMetrics(metrics),
    message: 'DFS search complete.',
    phase: 'complete',
  };
}

function* dfsVisit(
  nodeId: string,
  graph: GraphStructure,
  visited: Set<string>,
  hlNodes: Record<string, any>,
  hlEdges: Record<string, any>,
  metrics: any
): Generator<GraphSnapshot> {
  visited.add(nodeId);
  hlNodes[nodeId] = 'current';
  metrics.nodesVisited++;

  yield {
    structure: graph,
    highlights: { nodes: { ...hlNodes }, edges: { ...hlEdges } },
    metrics: cloneMetrics(metrics),
    message: `Visiting node ${nodeId}`,
    phase: 'visit',
  };

  const neighbors = graph.edges
    .filter(e => e.from === nodeId)
    .map(e => e.to);

  for (const neighborId of neighbors) {
    if (!visited.has(neighborId)) {
      const edgeId = `${nodeId}→${neighborId}`;
      hlEdges[edgeId] = 'highlighted';
      
      yield {
        structure: graph,
        highlights: { nodes: { ...hlNodes }, edges: { ...hlEdges } },
        metrics: cloneMetrics(metrics),
        message: `Moving from ${nodeId} to ${neighborId}`,
        phase: 'traverse',
      };

      yield* dfsVisit(neighborId, graph, visited, hlNodes, hlEdges, metrics);
      
      // Backtrack
      hlNodes[nodeId] = 'current';
      yield {
        structure: graph,
        highlights: { nodes: { ...hlNodes }, edges: { ...hlEdges } },
        metrics: cloneMetrics(metrics),
        message: `Backtracking to ${nodeId}`,
        phase: 'backtrack',
      };
    }
  }

  hlNodes[nodeId] = 'visited';
}
