// core/registry/algorithmRegistry.ts
// Central registry for dynamic algorithm discovery and registration.

import type { AlgorithmPlugin } from '../types/algorithm.types';

class AlgorithmRegistry {
  private map = new Map<string, AlgorithmPlugin<any, any>>();

  register<TSnap, TInput>(plugin: AlgorithmPlugin<TSnap, TInput>): void {
    if (this.map.has(plugin.id)) {
      throw new Error(`Duplicate algorithm id: ${plugin.id}`);
    }
    this.map.set(plugin.id, plugin);
  }

  get(id: string): AlgorithmPlugin<any, any> {
    const plugin = this.map.get(id);
    if (!plugin) throw new Error(`Algorithm not found: ${id}`);
    return plugin;
  }

  getAll(): AlgorithmPlugin<any, any>[] {
    return Array.from(this.map.values());
  }

  getByCategory(category: string): AlgorithmPlugin<any, any>[] {
    return this.getAll().filter((p) => p.meta.category === category);
  }

  getByDomain(domain: 'dsa' | 'os'): AlgorithmPlugin<any, any>[] {
    return this.getAll().filter((p) => p.meta.domain === domain);
  }
}

export const registry = new AlgorithmRegistry();
