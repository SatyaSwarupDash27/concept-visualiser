// algorithms/dsa/linkedList/reverse.gen.ts
import type { LinkedListSnapshot, LinkedListNode } from '../../../core/types/snapshot.dsa';
import { createMetrics, cloneMetrics } from '../../../core/types/snapshot.base';

export function* reverseGenerator(input: number[]): Generator<LinkedListSnapshot> {
  let nodes: LinkedListNode[] = input.map((val, i) => ({
    id: `node-${i}`,
    value: val,
    next: i < input.length - 1 ? `node-${i + 1}` : null
  }));

  const metrics = createMetrics();
  let prev: string | null = null;
  let curr: string | null = nodes[0]?.id || null;
  
  yield {
    structure: JSON.parse(JSON.stringify(nodes)),
    highlights: { indices: {} },
    metrics: cloneMetrics(metrics),
    message: 'Starting Linked List Reversal',
    phase: 'init',
    pointers: { prev, curr, next: nodes[0]?.next || null, tempLinks: [] }
  };

  while (curr !== null) {
    const currIdx = nodes.findIndex(n => n.id === curr);
    const nextId = nodes[currIdx].next;

    yield {
      structure: JSON.parse(JSON.stringify(nodes)),
      highlights: { indices: { [currIdx]: 'current' } },
      metrics: cloneMetrics(metrics),
      message: `At node ${nodes[currIdx].value}. Preparing to flip pointer.`,
      phase: 'inspect',
      pointers: { prev, curr, next: nextId, tempLinks: [] }
    };

    // The core operation: Flip the pointer
    nodes[currIdx].next = prev;
    metrics.swaps++; // Treating pointer redirection as a "swap" metric

    yield {
      structure: JSON.parse(JSON.stringify(nodes)),
      highlights: { indices: { [currIdx]: 'swapping' } },
      metrics: cloneMetrics(metrics),
      message: `Flipped pointer of node ${nodes[currIdx].value} to point to ${prev ? 'previous node' : 'NULL'}`,
      phase: 'relink',
      pointers: { prev, curr, next: nextId, tempLinks: [] }
    };

    // Advance pointers
    prev = curr;
    curr = nextId;

    yield {
      structure: JSON.parse(JSON.stringify(nodes)),
      highlights: { indices: {} },
      metrics: cloneMetrics(metrics),
      message: 'Advancing pointers (prev, curr)',
      phase: 'advance',
      pointers: { prev, curr, next: curr ? nodes.find(n => n.id === curr)?.next : null, tempLinks: [] }
    };
  }

  yield {
    structure: JSON.parse(JSON.stringify(nodes)),
    highlights: { 
      indices: Object.fromEntries(nodes.map((_, i) => [i, 'sorted']))
    },
    metrics: cloneMetrics(metrics),
    message: 'Reversal complete!',
    phase: 'finish',
    pointers: { prev, curr, next: null, tempLinks: [] }
  };
}
