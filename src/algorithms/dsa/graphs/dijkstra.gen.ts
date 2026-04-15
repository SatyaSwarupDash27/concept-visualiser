// algorithms/dsa/graphs/dijkstra.gen.ts
import type { GraphSnapshot, GraphStructure } from '../../../core/types/snapshot.dsa';
import { createMetrics, cloneMetrics } from '../../../core/types/snapshot.base';

export function* dijkstraGenerator(input: GraphStructure): Generator<GraphSnapshot> {
  const { nodes, edges } = input;
  const metrics = createMetrics({ nodesVisited: 0, relaxations: 0 });
  const distances: Record<string, number> = {};
  const visited = new Set<string>();
  const hlNodes: Record<string, any> = {};
  const hlEdges: Record<string, any> = {};
  const nodeLabels: Record<string, string> = {};

  // Initialize
  nodes.forEach((n, i) => {
    distances[n.id] = i === 0 ? 0 : Infinity;
    nodeLabels[n.id] = i === 0 ? 'dist: 0' : 'dist: ∞';
  });

  yield {
    structure: input,
    highlights: { nodes: {}, edges: {} },
    metrics: cloneMetrics(metrics),
    message: 'Initializing Dijkstra: Setting start distance to 0 and others to ∞',
    phase: 'init',
    nodeLabels: { ...nodeLabels }
  };

  while (visited.size < nodes.length) {
    // Find unvisited node with smallest distance
    let currentId: string | null = null;
    let minDistance = Infinity;

    nodes.forEach(n => {
      if (!visited.has(n.id) && distances[n.id] < minDistance) {
        minDistance = distances[n.id];
        currentId = n.id;
      }
    });

    if (currentId === null || minDistance === Infinity) break;

    const uId = currentId as string;
    hlNodes[uId] = 'current';
    metrics.nodesVisited++;

    yield {
      structure: input,
      highlights: { nodes: { ...hlNodes }, edges: { ...hlEdges } },
      metrics: cloneMetrics(metrics),
      message: `Picking unvisited node ${uId} with shortest distance ${minDistance}`,
      phase: 'pick',
      nodeLabels: { ...nodeLabels }
    };

    // Relax neighbors
    const neighbors = edges.filter(e => e.from === uId);
    for (const edge of neighbors) {
      const vId = edge.to;
      if (visited.has(vId)) continue;
      
      const edgeId = `${uId}→${vId}`;
      hlEdges[edgeId] = 'highlighted';
      hlNodes[vId] = 'comparing';

      yield {
        structure: input,
        highlights: { nodes: { ...hlNodes }, edges: { ...hlEdges } },
        metrics: cloneMetrics(metrics),
        message: `Checking neighbor ${vId} via edge weight ${edge.weight}`,
        phase: 'check-neighbor',
        nodeLabels: { ...nodeLabels }
      };

      const newDist = distances[uId] + (edge.weight || 1);
      if (newDist < distances[vId]) {
        distances[vId] = newDist;
        nodeLabels[vId] = `dist: ${newDist}`;
        metrics.relaxations++;
        hlNodes[vId] = 'sorted';

        yield {
          structure: input,
          highlights: { nodes: { ...hlNodes }, edges: { ...hlEdges } },
          metrics: cloneMetrics(metrics),
          message: `Relaxed! New shortest distance to ${vId} is ${newDist}`,
          phase: 'relax',
          nodeLabels: { ...nodeLabels }
        };
      } else {
        hlNodes[vId] = 'default';
      }
      hlEdges[edgeId] = 'default';
    }

    visited.add(uId);
    hlNodes[uId] = 'visited';
  }

  yield {
    structure: input,
    highlights: { nodes: hlNodes, edges: {} },
    metrics: cloneMetrics(metrics),
    message: "Dijkstra's Algorithm complete! Shortest paths from source found.",
    phase: 'complete',
    nodeLabels: { ...nodeLabels }
  };
}
