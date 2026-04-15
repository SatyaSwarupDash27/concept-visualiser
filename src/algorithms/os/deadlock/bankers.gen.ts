// algorithms/os/deadlock/bankers.gen.ts
import { createMetrics, cloneMetrics } from '../../../core/types/snapshot.base';

export function* bankersGenerator(input: { alloc: number[][], max: number[][], avail: number[] }): Generator<any> {
  const { alloc, max, avail } = input;
  const n = alloc.length;
  const m = avail.length;
  const metrics = createMetrics({ safetyCheckSuccessful: 0, processesFinished: 0 });
  
  const need = max.map((row, i) => row.map((val, j) => val - alloc[i][j]));
  const work = [...avail];
  const finished = Array(n).fill(false);
  const safeSequence: string[] = [];

  yield {
    structure: { alloc, max, need, avail: [...avail], work: [...work], finished: [...finished] },
    metrics: cloneMetrics(metrics),
    message: 'Initializing Banker\'s Algorithm: Calculating NEED = MAX - ALLOCATION',
    phase: 'init',
  } as any;

  while (safeSequence.length < n) {
    let found = false;
    for (let i = 0; i < n; i++) {
      if (!finished[i]) {
        yield {
          structure: { alloc, max, need, avail: [...avail], work: [...work], finished: [...finished] },
          metrics: cloneMetrics(metrics),
          message: `Checking if Process P${i} can be allocated resources (Need: [${need[i]}] <= Work: [${work}])`,
          phase: 'checking',
          currentProcess: i
        } as any;

        const canProceed = need[i].every((val, j) => val <= work[j]);
        if (canProceed) {
          yield {
            structure: { alloc, max, need, avail: [...avail], work: [...work], finished: [...finished] },
            metrics: cloneMetrics(metrics),
            message: `P${i} can proceed! Adding its allocated resources to Work.`,
            phase: 'allocating',
            currentProcess: i
          } as any;

          for (let j = 0; j < m; j++) work[j] += alloc[i][j];
          finished[i] = true;
          safeSequence.push(`P${i}`);
          metrics.processesFinished!++;
          found = true;

          yield {
            structure: { alloc, max, need, avail: [...avail], work: [...work], finished: [...finished] },
            metrics: cloneMetrics(metrics),
            message: `P${i} finished. Current safe sequence: [${safeSequence.join(', ')}]`,
            phase: 'finished',
            currentProcess: i,
            safeSequence: [...safeSequence]
          } as any;
          break; // Start from first process again
        }
      }
    }

    if (!found) {
      yield {
        structure: { alloc, max, need, avail: [...avail], work: [...work], finished: [...finished] },
        metrics: cloneMetrics(metrics),
        message: 'Unable to find any more safe processes. System is in an UNSAFE state!',
        phase: 'unsafe',
      } as any;
      return;
    }
  }

  metrics.safetyCheckSuccessful = 1;
  yield {
    structure: { alloc, max, need, avail: [...avail], work: [...work], finished: [...finished] },
    metrics: cloneMetrics(metrics),
    message: `System is SAFE. Final Sequence: [${safeSequence.join(', ')}]`,
    phase: 'complete',
    safeSequence: [...safeSequence]
  } as any;
}
