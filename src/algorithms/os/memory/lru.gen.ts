// algorithms/os/memory/lru.gen.ts
import type { PageSnapshot } from '../../../core/types/snapshot.os';
import { createMetrics, cloneMetrics } from '../../../core/types/snapshot.base';

export function* lruGenerator(input: { pages: number[], frameCount: number }): Generator<PageSnapshot> {
  const { pages, frameCount } = input;
  const metrics = createMetrics({ pageFaults: 0, cacheHits: 0 });
  
  let frames: (number | null)[] = Array(frameCount).fill(null);
  let lruOrder: number[] = []; // Track usage order (last element is most recent)

  yield {
    structure: { frameCount },
    highlights: { slots: {} },
    metrics: cloneMetrics(metrics),
    message: `Starting LRU Page Replacement with ${frameCount} frames`,
    phase: 'init',
    frames: [...frames],
    incomingPage: pages[0],
    isFault: false
  } as any;

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    const frameIndex = frames.indexOf(page);
    let evictedPage: number | undefined;

    if (frameIndex !== -1) {
      // HIT: Item exists in frames
      metrics.cacheHits = (metrics.cacheHits || 0) + 1;
      // Update LRU: move to end
      lruOrder = lruOrder.filter(p => p !== page);
      lruOrder.push(page);

      yield {
        structure: { frameCount },
        highlights: { slots: { [frameIndex]: 'hit' } },
        metrics: cloneMetrics(metrics),
        message: `Page ${page} is already in memory (Hit!)`,
        phase: 'hit',
        frames: [...frames],
        incomingPage: page,
        isFault: false,
        lruOrder: [...lruOrder]
      } as any;
    } else {
      // FAULT: Item not in frames
      metrics.pageFaults = (metrics.pageFaults || 0) + 1;

      let targetIndex: number;
      if (frames.includes(null)) {
        targetIndex = frames.indexOf(null);
      } else {
        // Evict LRU: first element in lruOrder
        evictedPage = lruOrder.shift()!;
        targetIndex = frames.indexOf(evictedPage);
      }

      frames[targetIndex] = page;
      lruOrder.push(page);

      yield {
        structure: { frameCount },
        highlights: { slots: { [targetIndex]: 'fault' } },
        metrics: cloneMetrics(metrics),
        message: evictedPage !== undefined 
          ? `Page Fault! Evicting least recently used page ${evictedPage} and loading page ${page}` 
          : `Page Fault! Loading page ${page} into empty frame`,
        phase: 'fault',
        frames: [...frames],
        incomingPage: page,
        evictedPage,
        isFault: true,
        lruOrder: [...lruOrder]
      } as any;
    }
  }

  yield {
    structure: { frameCount },
    highlights: { slots: {} },
    metrics: cloneMetrics(metrics),
    message: `Page replacement completed. Total Faults: ${metrics.pageFaults}`,
    phase: 'done',
    frames: [...frames],
    incomingPage: 0,
    isFault: false
  } as any;
}
