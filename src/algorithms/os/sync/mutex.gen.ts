// algorithms/os/sync/mutex.gen.ts
import type { SynchronizationSnapshot, Thread } from '../../../core/types/snapshot.os';
import { createMetrics, cloneMetrics } from '../../../core/types/snapshot.base';

export function* mutexGenerator(input: { threadCount: number, iterations: number }): Generator<SynchronizationSnapshot> {
  const { threadCount, iterations } = input;
  const metrics = createMetrics({ contextSwitches: 0, waitTicks: 0 });
  
  const threads: Thread[] = Array.from({ length: threadCount }, (_, i) => ({
    id: `${i + 1}`,
    state: 'waiting'
  }));
  
  let criticalSectionOwner: string | undefined = undefined;
  const waitingQueue: string[] = [];

  yield {
    structure: [...threads],
    highlights: { indices: {} },
    metrics: cloneMetrics(metrics),
    message: `Initialized ${threadCount} threads competing for a single Mutex`,
    phase: 'init',
    waitingQueue: [],
  } as any;

  // Arrival loop
  for (const t of threads) {
     waitingQueue.push(t.id);
     yield {
        structure: [...threads],
        highlights: { indices: {} },
        metrics: cloneMetrics(metrics),
        message: `Thread ${t.id} requested the Mutex and entered the waiting queue`,
        phase: 'request',
        waitingQueue: [...waitingQueue],
     } as any;
  }

  let completedCount = 0;
  while (completedCount < threadCount) {
    if (!criticalSectionOwner && waitingQueue.length > 0) {
      // Lock acquisition
      criticalSectionOwner = waitingQueue.shift()!;
      const tIdx = threads.findIndex(t => t.id === criticalSectionOwner);
      threads[tIdx].state = 'running';
      metrics.contextSwitches = (metrics.contextSwitches as number) + 1;

      yield {
        structure: [...threads],
        highlights: { indices: {} },
        metrics: cloneMetrics(metrics),
        message: `Mutex acquired! Thread ${criticalSectionOwner} entering Critical Section`,
        phase: 'acquire',
        criticalSectionOwner,
        waitingQueue: [...waitingQueue],
      } as any;

      // Simulate work in CS
      for (let i = 1; i <= iterations; i++) {
        yield {
          structure: [...threads],
          highlights: { indices: {} },
          metrics: cloneMetrics(metrics),
          message: `Thread ${criticalSectionOwner} performing iteration ${i}/${iterations}`,
          phase: 'executing',
          criticalSectionOwner,
          waitingQueue: [...waitingQueue],
        } as any;
        metrics.waitTicks = (metrics.waitTicks as number) + waitingQueue.length;
      }

      // Unlock
      threads[tIdx].state = 'waiting'; // Reset for visual consistency if needed or mark 'done'
      yield {
        structure: [...threads],
        highlights: { indices: {} },
        metrics: cloneMetrics(metrics),
        message: `Thread ${criticalSectionOwner} releasing Mutex after completion`,
        phase: 'release',
        criticalSectionOwner,
        waitingQueue: [...waitingQueue],
      } as any;

      threads[tIdx].state = 'blocked'; // Finished state
      criticalSectionOwner = undefined;
      completedCount++;
    }
  }

  yield {
    structure: threads.map(t => ({ ...t, state: 'waiting' as any })),
    highlights: { indices: {} },
    metrics: cloneMetrics(metrics),
    message: 'All threads completed their critical sections safely.',
    phase: 'done',
    waitingQueue: [],
  } as any;
}
