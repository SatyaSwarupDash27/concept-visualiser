// algorithms/dsa/greedy/huffman.gen.ts
import type { TreeSnapshot, TreeNode } from '../../../core/types/snapshot.dsa';
import { createMetrics, cloneMetrics } from '../../../core/types/snapshot.base';

interface HuffmanNode extends TreeNode {
  freq: number;
  char?: string;
  left?: HuffmanNode;
  right?: HuffmanNode;
}

export function* huffmanGenerator(input: any): Generator<TreeSnapshot> {
  const metrics = createMetrics({ comparisons: 0, compressionRatio: 0 });
  
  // Handle string or { text: string }
  const rawInput = typeof input === 'string' ? input : (input?.text || '');
  
  const freqs: Record<string, number> = {};
  for (const char of rawInput) freqs[char] = (freqs[char] || 0) + 1;

  let forest: HuffmanNode[] = Object.entries(freqs).map(([char, freq]) => ({
    id: `leaf-${char}`,
    value: freq,
    freq,
    char
  }));

  yield {
    structure: buildForestContainer(forest),
    highlights: { nodes: {}, edges: {} },
    metrics: cloneMetrics(metrics),
    message: `Initialized forest from character frequencies`,
    phase: 'init',
  };

  while (forest.length > 1) {
    forest.sort((a, b) => a.freq - b.freq);
    const left = forest.shift()!;
    const right = forest.shift()!;
    
    yield {
      structure: buildForestContainer([left, right, ...forest]),
      highlights: { nodes: { [left.id]: 'comparing', [right.id]: 'comparing' }, edges: {} },
      metrics: cloneMetrics(metrics),
      message: `Merging nodes with smallest frequencies: ${left.freq} and ${right.freq}`,
      phase: 'merge-pick',
    };

    const merged: HuffmanNode = {
      id: `internal-${left.freq + right.freq}-${Math.random()}`,
      value: left.freq + right.freq,
      freq: left.freq + right.freq,
      left,
      right
    };

    forest.push(merged);
    metrics.comparisons = (metrics.comparisons as number) + 1;

    yield {
      structure: buildForestContainer(forest),
      highlights: { nodes: { [merged.id]: 'sorted' }, edges: {} },
      metrics: cloneMetrics(metrics),
      message: `New internal node created with frequency ${merged.freq}`,
      phase: 'merge-complete',
    };
  }

  const root = forest[0];
  const codes: Record<string, string> = {};
  function generateCodes(n: HuffmanNode, code: string) {
    if (n.char) {
      codes[n.char] = code;
    } else {
      if (n.left) generateCodes(n.left, code + '0');
      if (n.right) generateCodes(n.right, code + '1');
    }
  }
  generateCodes(root, '');

  const totalBits = rawInput.split('').reduce((accValue: number, charValue: string) => accValue + codes[charValue].length, 0);
  metrics.compressionRatio = Number(((rawInput.length * 8) / totalBits).toFixed(2));

  yield {
    structure: JSON.parse(JSON.stringify(root)),
    highlights: { nodes: {}, edges: {} },
    metrics: cloneMetrics(metrics),
    message: `Huffman Tree complete! Compression Ratio: ${metrics.compressionRatio}x`,
    phase: 'complete',
    nodeLabels: Object.fromEntries(Object.entries(codes).map(([c, code]) => [`leaf-${c}`, `code: ${code}`]))
  };
}

function buildForestContainer(forest: HuffmanNode[]): TreeNode {
  // Dummy container to keep them all in one tree for the visualizer
  return {
    id: 'forest-container',
    value: 0,
    left: forest[0],
    right: forest.length > 1 ? buildForestContainer(forest.slice(1)) : undefined
  };
}
