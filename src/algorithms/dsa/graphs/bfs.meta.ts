// algorithms/dsa/graphs/bfs.meta.ts
import type { AlgorithmMeta } from '../../../core/types/algorithm.types';

export const bfsMeta: AlgorithmMeta = {
  name: 'Breadth-First Search',
  category: 'Graphs',
  domain: 'dsa',
  description: 'An algorithm for traversing or searching tree or graph data structures. It starts at the tree root (or some arbitrary node of a graph) and explores all of the neighbor nodes at the present depth prior to moving on to the nodes at the next depth level.',
  complexity: {
    time: { best: 'O(V + E)', average: 'O(V + E)', worst: 'O(V + E)' },
    space: { best: 'O(V)', average: 'O(V)', worst: 'O(V)' },
  },
  useCases: [
    'Shortest path in unweighted graphs',
    'Social networking websites (finding friends of friends)',
    'GPS Navigation systems'
  ],
  metrics: ['visitedNodes', 'queueSize'],
};
