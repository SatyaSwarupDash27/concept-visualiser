// core/utils/clone.ts
// Secure cloning utilities.

export function safeClone<T>(obj: T): T {
  return structuredClone(obj);
}

export function deepClone<T>(obj: T): T {
  return structuredClone(obj);
}
