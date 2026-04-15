// core/types/common.types.ts
// Shared utility types

export type RunnerMode = 'eager' | 'chunked' | 'lazy';

export interface BufferConfig {
  capacity: number;
  ringMode?: boolean;
}

/** JSON Patch operation (RFC 6902 subset) */
export interface JSONPatchOp {
  op: 'replace' | 'add' | 'remove';
  path: string;
  value?: unknown;
}
