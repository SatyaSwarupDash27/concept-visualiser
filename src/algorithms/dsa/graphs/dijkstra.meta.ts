// algorithms/dsa/graphs/dijkstra.meta.ts
import type { AlgorithmMeta } from '../../../core/types/algorithm.types';

export const dijkstraMeta: AlgorithmMeta = {
  name: "Dijkstra's Algorithm",
  category: 'Graphs',
  domain: 'dsa',
  description: "An algorithm for finding the shortest paths between nodes in a graph. It picks the unvisited node with the lowest distance, calculates the distance through it to each unvisited neighbor, and updates the neighbor's distance if smaller.",
  complexity: {
    time: { best: 'O(V + E log V)', average: 'O(V + E log V)', worst: 'O(V^2)' },
    space: { best: 'O(V)', average: 'O(V)', worst: 'O(V)' },
  },
  useCases: [
    'GPS/Navigation systems (Google Maps)',
    'Network routing protocols (OSPF)',
    'Shortest path in social networks'
  ],
  metrics: ['nodesVisited', 'relaxations'],
};
