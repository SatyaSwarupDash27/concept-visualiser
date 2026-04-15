// algorithms/os/disk/disk.gen.ts
import { createMetrics, cloneMetrics } from '../../../core/types/snapshot.base';
import type { DiskSnapshot } from '../../../core/types/snapshot.os';

export function* diskGenerator(input: { requests: number[], start: number, strategy: 'FCFS' | 'SSTF' | 'SCAN' }): Generator<DiskSnapshot> {
  const { requests, start, strategy } = input;
  const metrics = createMetrics({ totalSeekDistance: 0 });
  
  let currentPos = start;
  const queue = [...requests];
  const seekSequence: number[] = [start];
  const visited: number[] = [];

  yield {
    structure: { currentPos, queue: [...queue], visited: [...visited] },
    highlights: { indices: {} },
    seekSequence: [...seekSequence],
    metrics: cloneMetrics(metrics),
    message: `Starting Disk Scheduling (${strategy}) at track ${start}`,
    phase: 'init',
  };

  while (queue.length > 0) {
    let nextIdx = -1;

    if (strategy === 'FCFS') {
      nextIdx = 0;
    } else if (strategy === 'SSTF') {
      let minDistance = Infinity;
      for (let i = 0; i < queue.length; i++) {
        const dist = Math.abs(queue[i] - currentPos);
        if (dist < minDistance) {
          minDistance = dist;
          nextIdx = i;
        }
      }
    } else if (strategy === 'SCAN') {
      // Simple SCAN: go to end (199) and then back if needed, 
      // but for visualization we'll just sort and move in one direction for simplicity or simulate full scan
      queue.sort((a, b) => a - b);
      nextIdx = queue.findIndex(q => q >= currentPos);
      if (nextIdx === -1) nextIdx = queue.length - 1; // Go back
    }

    const target = queue.splice(nextIdx, 1)[0];
    const distance = Math.abs(target - currentPos);
    metrics.totalSeekDistance = (metrics.totalSeekDistance || 0) + distance;
    
    // Animate move
    const steps = 10;
    const stepDist = (target - currentPos) / steps;
    for (let s = 1; s <= steps; s++) {
      currentPos += stepDist;
      yield {
        structure: { currentPos: Math.round(currentPos), queue: [...queue], visited: [...visited] },
        highlights: { indices: {} },
        seekSequence: [...seekSequence, Math.round(currentPos)],
        metrics: cloneMetrics(metrics),
        message: `Moving head to track ${target}... (Seek Distance: ${metrics.totalSeekDistance})`,
        phase: 'move',
      };
    }

    currentPos = target;
    visited.push(target);
    seekSequence.push(target);

    yield {
      structure: { currentPos, queue: [...queue], visited: [...visited] },
      highlights: { indices: {} },
      seekSequence: [...seekSequence],
      metrics: cloneMetrics(metrics),
      message: `Reached track ${target}. Next request...`,
      phase: 'reached',
    };
  }

  yield {
    structure: { currentPos, queue: [], visited: [...visited] },
    highlights: { indices: {} },
    seekSequence: [...seekSequence],
    metrics: cloneMetrics(metrics),
    message: `Disk Scheduling complete! Total Seek Distance: ${metrics.totalSeekDistance}`,
    phase: 'complete',
  };
}
