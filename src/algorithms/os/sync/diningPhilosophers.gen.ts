// algorithms/os/sync/diningPhilosophers.gen.ts
import type { SynchronizationSnapshot, Thread } from '../../../core/types/snapshot.os';
import { createMetrics, cloneMetrics } from '../../../core/types/snapshot.base';

interface Phil {
  id: string;
  state: 'thinking' | 'hungry' | 'eating' | 'deadlocked';
}

export function* diningPhilosophersGenerator(input: { count: number, simulateDeadlock: boolean }): Generator<any> {
  const { count, simulateDeadlock } = input;
  const metrics = createMetrics({ waitTicks: 0, deadlocksDetected: 0 });
  
  const phils: Phil[] = Array.from({ length: count }, (_, i) => ({
    id: `${i}`,
    state: 'thinking'
  }));
  
  const chopsticks: ('free' | string)[] = Array(count).fill('free');

  yield {
    structure: [...phils],
    chopsticks: [...chopsticks],
    metrics: cloneMetrics(metrics),
    message: `Initialized ${count} philosophers around the dining table.`,
    phase: 'init',
  } as any;

  if (simulateDeadlock) {
    // Force a deadlock: Everyone grabs their left chopstick
    for (let i = 0; i < count; i++) {
      phils[i].state = 'hungry';
      chopsticks[i] = phils[i].id;
      yield {
        structure: [...phils],
        chopsticks: [...chopsticks],
        metrics: cloneMetrics(metrics),
        message: `Philosopher ${i} grabbed their left chopstick (${i}).`,
        phase: 'grab-left',
      } as any;
    }

    metrics.deadlocksDetected++;
    for (let i = 0; i < count; i++) phils[i].state = 'deadlocked';

    yield {
      structure: [...phils],
      chopsticks: [...chopsticks],
      metrics: cloneMetrics(metrics),
      message: 'DEADLOCK! Everyone is holding one chopstick and waiting for the other.',
      phase: 'deadlock',
    } as any;
    return;
  }

  // Normal successful simulation
  for (let round = 1; round <= 3; round++) {
    for (let i = 0; i < count; i++) {
      if (phils[i].state === 'thinking') {
        const left = i;
        const right = (i + 1) % count;

        if (chopsticks[left] === 'free' && chopsticks[right] === 'free') {
          phils[i].state = 'hungry';
          yield {
            structure: [...phils],
            chopsticks: [...chopsticks],
            metrics: cloneMetrics(metrics),
            message: `Philosopher ${i} is hungry. Checking chopsticks...`,
            phase: 'hungry',
          } as any;

          chopsticks[left] = phils[i].id;
          chopsticks[right] = phils[i].id;
          phils[i].state = 'eating';

          yield {
            structure: [...phils],
            chopsticks: [...chopsticks],
            metrics: cloneMetrics(metrics),
            message: `Philosopher ${i} grabbed both chopsticks and is EATING.`,
            phase: 'eating',
          } as any;

          // Finish eating
          phils[i].state = 'thinking';
          chopsticks[left] = 'free';
          chopsticks[right] = 'free';

          yield {
            structure: [...phils],
            chopsticks: [...chopsticks],
            metrics: cloneMetrics(metrics),
            message: `Philosopher ${i} finished eating and returned to thinking.`,
            phase: 'finished',
          } as any;
        }
      }
    }
  }

  yield {
    structure: [...phils],
    chopsticks: [...chopsticks],
    metrics: cloneMetrics(metrics),
    message: 'Simulation complete.',
    phase: 'done',
  } as any;
}
