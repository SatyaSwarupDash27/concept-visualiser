// algorithms/os/sync/producerConsumer.gen.ts
import type { Thread } from '../../../core/types/snapshot.os';
import { createMetrics, cloneMetrics } from '../../../core/types/snapshot.base';

export function* producerConsumerGenerator(input: { bufferSize: number, operations: number }): Generator<any> {
  const { bufferSize, operations } = input;
  const metrics = createMetrics({ waitTicks: 0, itemsProduced: 0, itemsConsumed: 0 });
  
  const threads: Thread[] = [
    { id: 'Producer', state: 'waiting' },
    { id: 'Consumer', state: 'waiting' }
  ];
  
  const buffer: number[] = [];
  const waitingQueue: string[] = [];

  yield {
    structure: JSON.parse(JSON.stringify(threads)),
    buffer: [...buffer],
    bufferSize,
    waitingQueue: [...waitingQueue],
    metrics: cloneMetrics(metrics),
    message: `Initialized Bounded Buffer (Size: ${bufferSize}) with Producer and Consumer threads`,
    phase: 'init',
  } as any;

  for (let i = 0; i < operations; i++) {
    const action = Math.random() > 0.4 ? 'produce' : 'consume';

    if (action === 'produce') {
      const pIdx = threads.findIndex(t => t.id === 'Producer');
      threads[pIdx].state = 'running';
      
      yield {
        structure: JSON.parse(JSON.stringify(threads)),
        buffer: [...buffer],
        bufferSize,
        waitingQueue: [...waitingQueue],
        metrics: cloneMetrics(metrics),
        message: 'Producer: Trying to add data...',
        phase: 'p-try',
      } as any;

      if (buffer.length < bufferSize) {
        const item = Math.floor(Math.random() * 100);
        buffer.push(item);
        metrics.itemsProduced = (metrics.itemsProduced as number) + 1;
        yield {
          structure: JSON.parse(JSON.stringify(threads)),
          buffer: [...buffer],
          bufferSize,
          waitingQueue: [...waitingQueue],
          metrics: cloneMetrics(metrics),
          message: `Producer: Successfully added ${item} (Buffer: ${buffer.length}/${bufferSize})`,
          phase: 'p-success',
        } as any;
      } else {
        threads[pIdx].state = 'blocked';
        yield {
          structure: JSON.parse(JSON.stringify(threads)),
          buffer: [...buffer],
          bufferSize,
          waitingQueue: [...waitingQueue],
          metrics: cloneMetrics(metrics),
          message: 'Producer: Buffer FULL! Entering SLEEP state.',
          phase: 'p-sleep',
        } as any;
        metrics.waitTicks = (metrics.waitTicks as number) + 1;
      }
      threads[pIdx].state = 'waiting';
    } else {
      const cIdx = threads.findIndex(t => t.id === 'Consumer');
      threads[cIdx].state = 'running';
      
      yield {
        structure: JSON.parse(JSON.stringify(threads)),
        buffer: [...buffer],
        bufferSize,
        waitingQueue: [...waitingQueue],
        metrics: cloneMetrics(metrics),
        message: 'Consumer: Trying to remove data...',
        phase: 'c-try',
      } as any;

      if (buffer.length > 0) {
        const item = buffer.shift();
        metrics.itemsConsumed = (metrics.itemsConsumed as number) + 1;
        yield {
          structure: JSON.parse(JSON.stringify(threads)),
          buffer: [...buffer],
          bufferSize,
          waitingQueue: [...waitingQueue],
          metrics: cloneMetrics(metrics),
          message: `Consumer: Successfully consumed ${item} (Buffer: ${buffer.length}/${bufferSize})`,
          phase: 'c-success',
        } as any;
      } else {
        threads[cIdx].state = 'blocked';
        yield {
          structure: JSON.parse(JSON.stringify(threads)),
          buffer: [...buffer],
          bufferSize,
          waitingQueue: [...waitingQueue],
          metrics: cloneMetrics(metrics),
          message: 'Consumer: Buffer EMPTY! Entering SLEEP state.',
          phase: 'c-sleep',
        } as any;
        metrics.waitTicks = (metrics.waitTicks as number) + 1;
      }
      threads[cIdx].state = 'waiting';
    }
  }

  yield {
    structure: threads.map(t => ({ ...t, state: 'waiting' as any })),
    buffer: [...buffer],
    bufferSize,
    waitingQueue: [],
    metrics: cloneMetrics(metrics),
    message: 'Producer-Consumer simulation ended.',
    phase: 'done',
  } as any;
}
