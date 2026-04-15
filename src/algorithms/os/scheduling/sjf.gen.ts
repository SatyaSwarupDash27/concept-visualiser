// algorithms/os/scheduling/sjf.gen.ts
import type { SchedulingSnapshot, Process, GanttBlock } from '../../../core/types/snapshot.os';
import { createMetrics, cloneMetrics } from '../../../core/types/snapshot.base';

export function* sjfGenerator(input: { processes: Process[] }): Generator<SchedulingSnapshot> {
  const { processes: rawProcesses } = input;
  const processes = rawProcesses.map(p => ({ ...p, remainingTime: p.burstTime }));
  const metrics = createMetrics({ totalTime: 0, contextSwitches: 0 });
  
  let time = 0;
  const readyQueue: typeof processes = [];
  const ganttBlocks: GanttBlock[] = [];
  const completed: typeof processes = [];
  
  const sortedByArrival = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
  let processIndex = 0;

  yield {
    structure: { time },
    highlights: { processSlots: {} },
    metrics: cloneMetrics(metrics),
    message: 'Processes loaded, ready for SJF scheduling',
    phase: 'init',
    ganttBlocks: [...ganttBlocks],
    readyQueue: [],
  } as any;

  while (completed.length < processes.length) {
    // Add all processes that have arrived by current time
    while (processIndex < sortedByArrival.length && sortedByArrival[processIndex].arrivalTime <= time) {
      readyQueue.push(sortedByArrival[processIndex]);
      processIndex++;
    }

    if (readyQueue.length === 0) {
      time = sortedByArrival[processIndex].arrivalTime;
      continue;
    }

    // SJF: Pick the one with the shortest burst time
    readyQueue.sort((a, b) => a.burstTime - b.burstTime);
    const curr = readyQueue.shift()!;
    
    metrics.contextSwitches = (metrics.contextSwitches || 0) + 1;
    const start = time;
    
    yield {
       structure: { time },
       highlights: { processSlots: { [curr.id]: 'current' } },
       metrics: cloneMetrics(metrics),
       message: `Selected Process ${curr.id} (Burst: ${curr.burstTime}) - Shortest job available`,
       phase: 'select',
       ganttBlocks: [...ganttBlocks],
       readyQueue: [...readyQueue],
       runningProcess: curr
    } as any;

    // Execute to completion (Non-preemptive)
    for(let t = 1; t <= curr.burstTime; t++) {
      time++;
      metrics.totalTime = time;
      
      // Check for arrivals during execution
      while (processIndex < sortedByArrival.length && sortedByArrival[processIndex].arrivalTime <= time) {
        readyQueue.push(sortedByArrival[processIndex]);
        processIndex++;
      }

      yield {
        structure: { time },
        highlights: { processSlots: { [curr.id]: 'running' } },
        metrics: cloneMetrics(metrics),
        message: `Process ${curr.id} is running (${t}/${curr.burstTime})`,
        phase: 'executing',
        ganttBlocks: [...ganttBlocks, { processId: curr.id, start, end: time }],
        readyQueue: [...readyQueue],
        runningProcess: { ...curr, remainingTime: curr.burstTime - t }
      } as any;
    }

    ganttBlocks.push({ processId: curr.id, start, end: time });
    completed.push(curr);

    yield {
      structure: { time },
      highlights: { processSlots: { [curr.id]: 'done' } },
      metrics: cloneMetrics(metrics),
      message: `Process ${curr.id} completed!`,
      phase: 'complete',
      ganttBlocks: [...ganttBlocks],
      readyQueue: [...readyQueue],
      completedProcesses: [...completed]
    } as any;
  }

  yield {
    structure: { time },
    highlights: { processSlots: {} },
    metrics: cloneMetrics(metrics),
    message: 'SJF Scheduling finished.',
    phase: 'done',
    ganttBlocks: [...ganttBlocks],
    readyQueue: [],
    completedProcesses: [...completed]
  } as any;
}
