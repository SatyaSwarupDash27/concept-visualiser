// core/engine/freeze.ts
// Immutability enforcement — deepFreeze + safe cloning

/**
 * Deep-freeze an object in development mode.
 * In production, this is a no-op for performance.
 */
export function deepFreeze<T extends object>(obj: T): T {
  if (import.meta.env.DEV) {
    Object.freeze(obj);
    Object.getOwnPropertyNames(obj).forEach((prop) => {
      const val = (obj as Record<string, unknown>)[prop];
      if (val !== null && typeof val === 'object' && !Object.isFrozen(val)) {
        deepFreeze(val as object);
      }
    });
  }
  return obj;
}

/**
 * Clone a snapshot safely using structuredClone, then freeze it.
 */
export function freezeSnapshot<T extends object>(snapshot: T): T {
  const cloned = structuredClone(snapshot);
  return deepFreeze(cloned);
}

/**
 * Safe clone without freezing (for mutable working copies).
 */
export function safeClone<T>(obj: T): T {
  return structuredClone(obj);
}
