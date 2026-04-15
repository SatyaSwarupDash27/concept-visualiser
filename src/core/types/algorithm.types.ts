// core/types/algorithm.types.ts
// Plugin interface + algorithm metadata contracts

import type { ComponentType } from 'react';

export interface AlgorithmMeta {
  name: string;
  category: string;
  domain: 'dsa' | 'os';
  description: string;
  complexity: {
    time: { best: string; average: string; worst: string };
    space: { best: string; average: string; worst: string };
  };
  useCases: string[];
  metrics: string[];
}

export interface InputConfigDescriptor {
  type: 'numberArray' | 'graph' | 'processes' | 'pageSequence' | 'custom';
  min?: number;
  max?: number;
  defaultSize?: number;
  options?: Record<string, unknown>;
}

export interface AlgorithmPlugin<TSnapshot = unknown, TInput = unknown> {
  id: string;
  meta: AlgorithmMeta;
  generator: (input: TInput) => Generator<TSnapshot>;
  visualizer: React.LazyExoticComponent<ComponentType<{ snapshot: TSnapshot }>>;
  inputConfig: InputConfigDescriptor;
  stepHint: (input: TInput) => number;
}
