// algorithms/os/scheduling/priorityScheduling.gen.ts
import type { SchedulingSnapshot, Process } from '../../../core/types/snapshot.os';
import { createMetrics, cloneMetrics } from '../../../core/types/snapshot.base';

export function* priorityGenerator(input: { processes: Process[] }): Generator<SchedulingSnapshot> {
  // Ensure every process has a priority (lower number = higher priority)
  const processes = input.processes.map(p => ({ 
    ...p, 
    remainingTime: p.burstTime,
    priority: p.priority !== undefined ? p.priority : Math.floor(Math.random() * 5) + 1
  }));
  
  const metrics = createMetrics({ averageWaitTime: 0, contextSwitches: 0 });
  
  let time = 0;
  let completed = 0;
  let currentProcess: any | null = null;
  const ganttBlocks: any[] = [];
  const n = processes.length;
  const waitTimes: Record<string, number> = {};

  while (completed < n) {
    const available = processes.filter(p => p.arrivalTime <= time && p.remainingTime > 0);
    
    let highestPriority: any = null;
    let minPriority = Infinity;
    for (const p of available) {
      if (p.priority! < minPriority) {
        minPriority = p.priority!;
        highestPriority = p;
      }
    }

    if (highestPriority) {
      if (currentProcess && currentProcess.id !== highestPriority.id) {
        metrics.contextSwitches!++;
      }

      if (!currentProcess || currentProcess.id !== highestPriority.id) {
        ganttBlocks.push({
          processId: highestPriority.id,
          start: time,
          end: time + 1,
          color: `bg-indigo-500`
        });
      } else {
        ganttBlocks[ganttBlocks.length - 1].end = time + 1;
      }

      currentProcess = highestPriority;
      highestPriority.remainingTime--;
      
      if (highestPriority.remainingTime === 0) {
        completed++;
        const finishTime = time + 1;
        const turnAroundTime = finishTime - highestPriority.arrivalTime;
        waitTimes[highestPriority.id] = turnAroundTime - highestPriority.burstTime;
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
        ? `Time ${time-1}: Process ${currentProcess.id} (Priority: ${currentProcess.priority}) executing`
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
    message: `Priority Scheduling complete. Avg Wait Time: ${metrics.averageWaitTime.toFixed(2)}`,
    phase: 'complete',
  } as any;
}
