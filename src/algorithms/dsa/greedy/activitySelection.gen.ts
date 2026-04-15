// algorithms/dsa/greedy/activitySelection.gen.ts
import { createMetrics, cloneMetrics } from '../../../core/types/snapshot.base';

export interface Activity {
  id: string;
  start: number;
  end: number;
}

export function* activitySelectionGenerator(input: any): Generator<any> {
  const metrics = createMetrics({ activitiesSelected: 0, comparisons: 0 });
  
  // Handle both Activity[] and wrapped options { activities: Activity[] }
  let activities: Activity[] = [];
  if (Array.isArray(input)) {
    activities = [...input];
  } else if (input?.activities && Array.isArray(input.activities)) {
    activities = [...input.activities];
  } else {
    // Generate random activities as fallback to prevent crash
    const count = 8;
    for (let i = 0; i < count; i++) {
      const start = Math.floor(Math.random() * 10);
      const end = start + Math.floor(Math.random() * 5) + 1;
      activities.push({ id: `A${i + 1}`, start, end });
    }
  }

  yield {
    structure: [...activities],
    highlights: { indices: {} },
    metrics: cloneMetrics(metrics),
    message: 'Starting Activity Selection: Sorting activities by finish time',
    phase: 'init',
  } as any;

  // 1. Sort by end time
  activities.sort((a, b) => {
    metrics.comparisons = (metrics.comparisons as number) + 1;
    return a.end - b.end;
  });

  yield {
    structure: [...activities],
    highlights: { indices: {} },
    metrics: cloneMetrics(metrics),
    message: 'Sorted by finish time. Applying greedy selection...',
    phase: 'sort-complete',
  } as any;

  const selected: string[] = [];
  let lastFinishTime = -1;

  for (let i = 0; i < activities.length; i++) {
    const act = activities[i];
    const isCompatible = act.start >= lastFinishTime;

    yield {
      structure: [...activities],
      highlights: { 
        indices: { [i]: 'comparing' },
        selectedIds: [...selected]
      },
      metrics: cloneMetrics(metrics),
      message: `Checking activity ${act.id} (Start: ${act.start}, End: ${act.end})`,
      phase: 'check',
      lastFinishTime
    } as any;

    if (isCompatible) {
      selected.push(act.id);
      lastFinishTime = act.end;
      metrics.activitiesSelected = (metrics.activitiesSelected as number) + 1;

      yield {
        structure: [...activities],
        highlights: { 
          indices: { [i]: 'sorted' },
          selectedIds: [...selected]
        },
        metrics: cloneMetrics(metrics),
        message: `Compatible! Activity ${act.id} selected. Next available at ${lastFinishTime}.`,
        phase: 'select',
        lastFinishTime
      } as any;
    } else {
      yield {
        structure: [...activities],
        highlights: { 
          indices: { [i]: 'deadlocked' },
          selectedIds: [...selected]
        },
        metrics: cloneMetrics(metrics),
        message: `Conflict! Activity ${act.id} starts before the previous one ends (${act.start} < ${lastFinishTime}). Skipping.`,
        phase: 'reject',
        lastFinishTime
      } as any;
    }
  }

  yield {
    structure: [...activities],
    highlights: { 
      indices: Object.fromEntries(activities.map((a, idx) => [idx, selected.includes(a.id) ? 'sorted' : 'default']))
    },
    metrics: cloneMetrics(metrics),
    message: `Greedy selection complete. Selected ${selected.length} activities.`,
    phase: 'complete',
    selectedIds: [...selected]
  } as any;
}
