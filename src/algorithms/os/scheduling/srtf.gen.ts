// algorithms/os/scheduling/srtf.gen.ts
import type { SchedulingSnapshot, Process } from '../../../core/types/snapshot.os';
import { createMetrics, cloneMetrics } from '../../../core/types/snapshot.base';

export function* srtfGenerator(input: { processes: Process[] }): Generator<SchedulingSnapshot> {
  const processes = input.processes.map(p => ({ ...p, remainingTime: p.burstTime }));
  const metrics = createMetrics({ averageWaitTime: 0, contextSwitches: 0 });
  
  let time = 0;
  let completed = 0;
  let currentProcess: Process | null = null;
  const ganttBlocks: any[] = [];
  const n = processes.length;
  const waitTimes: Record<string, number> = {};

  while (completed < n) {
    // Get arrived processes
    const available = processes.filter(p => p.arrivalTime <= time && p.remainingTime > 0);
    
    // Find process with shortest remaining time
    let shortest: any = null;
    let minRemaining = Infinity;
    for (const p of available) {
      if (p.remainingTime < minRemaining) {
        minRemaining = p.remainingTime;
        shortest = p;
      }
    }

    if (shortest) {
      // Context switch check
      if (currentProcess && currentProcess.id !== shortest.id) {
        metrics.contextSwitches!++;
      }

      if (!currentProcess || currentProcess.id !== shortest.id) {
        ganttBlocks.push({
          processId: shortest.id,
          start: time,
          end: time + 1,
          color: `bg-blue-500`
        });
      } else {
        ganttBlocks[ganttBlocks.length - 1].end = time + 1;
      }

      currentProcess = shortest;
      shortest.remainingTime--;
      
      if (shortest.remainingTime === 0) {
        completed++;
        const finishTime = time + 1;
        const turnAroundTime = finishTime - shortest.arrivalTime;
        waitTimes[shortest.id] = turnAroundTime - shortest.burstTime;
      }
    } else {
      currentProcess = null;
    }

    time++;

    yield {
      structure: { time },
      readyQueue: processes.filter(p => p.arrivalTime < time && p.remainingTime > 0 && p.id !== currentProcess?.id),
      runningProcess: currentProcess ? { ...currentProcess } : undefined,
      ganttBlocks: [...ganttBlocks],
      metrics: cloneMetrics(metrics),
      message: currentProcess 
        ? `Time ${time-1}: Process ${currentProcess.id} executing (Remaining: ${currentProcess.remainingTime})`
        : `Time ${time-1}: CPU Idle`,
      phase: 'tick',
    } as any;
  }

  metrics.averageWaitTime = Object.values(waitTimes).reduce((a, b) => a + b, 0) / n;

  yield {
    structure: { time },
    readyQueue: [],
    runningProcess: undefined,
    ganttBlocks: [...ganttBlocks],
    metrics: cloneMetrics(metrics),
    message: `SRTF Scheduling complete. Avg Wait Time: ${metrics.averageWaitTime.toFixed(2)}`,
    phase: 'complete',
  } as any;
}
