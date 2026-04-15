// algorithms/os/scheduling/roundRobin.gen.ts
import type { SchedulingSnapshot, Process, GanttBlock } from '../../../core/types/snapshot.os';
import { createMetrics, cloneMetrics } from '../../../core/types/snapshot.base';

export function* roundRobinGenerator(input: { processes: Process[], quantum: number }): Generator<SchedulingSnapshot> {
  const { processes: rawProcesses, quantum } = input;
  const processes = rawProcesses.map(p => ({ ...p, remainingTime: p.burstTime }));
  const metrics = createMetrics({ contextSwitches: 0, totalTime: 0 });
  
  let time = 0;
  const queue: typeof processes = [];
  const ganttBlocks: GanttBlock[] = [];
  const completed: typeof processes = [];
  
  // Sort by arrival time initially
  const sortedProcesses = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
  let processIndex = 0;

  // Add processes that arrived at time 0
  while (processIndex < sortedProcesses.length && sortedProcesses[processIndex].arrivalTime <= time) {
    queue.push(sortedProcesses[processIndex]);
    processIndex++;
  }

  yield {
    structure: { time },
    highlights: { processSlots: {} },
    metrics: cloneMetrics(metrics),
    message: 'Processes initialized, starting Round Robin scheduling',
    phase: 'init',
    ganttBlocks: [...ganttBlocks],
    readyQueue: [...queue],
  } as any;

  while (queue.length > 0 || processIndex < sortedProcesses.length) {
    if (queue.length === 0) {
      time = sortedProcesses[processIndex].arrivalTime;
      while (processIndex < sortedProcesses.length && sortedProcesses[processIndex].arrivalTime <= time) {
        queue.push(sortedProcesses[processIndex]);
        processIndex++;
      }
    }

    const curr = queue.shift()!;
    const executeTime = Math.min(curr.remainingTime, quantum);
    
    metrics.contextSwitches = (metrics.contextSwitches || 0) + 1;
    
    const block: GanttBlock = {
      processId: curr.id,
      start: time,
      end: time + executeTime
    };
    
    for (let t = 1; t <= executeTime; t++) {
      time++;
      curr.remainingTime--;
      metrics.totalTime = time;

      // Add any processes that arrived during this unit of time
      while (processIndex < sortedProcesses.length && sortedProcesses[processIndex].arrivalTime <= time) {
        queue.push(sortedProcesses[processIndex]);
        processIndex++;
      }

      yield {
        structure: { time },
        highlights: { processSlots: { [curr.id]: 'running' } },
        metrics: cloneMetrics(metrics),
        message: `Process ${curr.id} is consuming CPU (Time Left: ${curr.remainingTime})`,
        phase: 'executing',
        ganttBlocks: [...ganttBlocks, { ...block, end: time }],
        readyQueue: [...queue],
        runningProcess: curr,
        quantumRemaining: executeTime - t
      } as any;
    }

    ganttBlocks.push({ ...block, end: time });

    if (curr.remainingTime > 0) {
      queue.push(curr);
      yield {
        structure: { time },
        highlights: { processSlots: { [curr.id]: 'waiting' } },
        metrics: cloneMetrics(metrics),
        message: `Process ${curr.id} preempted by quantum expiration`,
        phase: 'preempted',
        ganttBlocks: [...ganttBlocks],
        readyQueue: [...queue],
      } as any;
    } else {
      completed.push(curr);
      yield {
        structure: { time },
        highlights: { processSlots: { [curr.id]: 'done' } },
        metrics: cloneMetrics(metrics),
        message: `Process ${curr.id} completed!`,
        phase: 'completed',
        ganttBlocks: [...ganttBlocks],
        readyQueue: [...queue],
        completedProcesses: [...completed]
      } as any;
    }
  }

  yield {
    structure: { time },
    highlights: { processSlots: {} },
    metrics: cloneMetrics(metrics),
    message: 'All processes finished. Scheduling complete.',
    phase: 'done',
    ganttBlocks: [...ganttBlocks],
    readyQueue: [],
    completedProcesses: [...completed]
  } as any;
}
