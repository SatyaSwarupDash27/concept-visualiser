// core/utils/guards.ts
// Runtime validation guards.

export function assertDefined<T>(value: T | undefined | null, message?: string): T {
  if (value === undefined || value === null) {
    throw new Error(message || 'Value is expected to be defined');
  }
  return value;
}

export function isValidSnapshot(snapshot: any): boolean {
  return (
    snapshot &&
    typeof snapshot.structure !== 'undefined' &&
    typeof snapshot.highlights !== 'undefined' &&
    typeof snapshot.metrics !== 'undefined' &&
    typeof snapshot.message === 'string' &&
    typeof snapshot.phase === 'string'
  );
}
