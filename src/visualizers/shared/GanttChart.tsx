import type { SchedulingSnapshot } from '../../core/types/snapshot.os';

export function GanttChart({ snapshot }: { snapshot: SchedulingSnapshot }) {
  const { time } = snapshot.structure as any;
  const { ganttBlocks } = snapshot as any;
  const totalTime = time;

  return (
    <div className="w-full flex flex-col gap-2">
      <h3 className="text-lg font-bold text-slate-300">Gantt Chart (Time: {totalTime})</h3>
      <div className="flex h-16 w-full bg-slate-800 rounded border border-slate-700 overflow-hidden relative shadow-inner">
        {ganttBlocks?.map((block: any, i: number) => {
          const width = totalTime > 0 ? ((block.end - block.start) / totalTime) * 100 : 0;
          return (
            <div
              key={i}
              className="h-full border-r border-slate-900 flex items-center justify-center text-sm font-bold bg-[var(--el-running)] text-slate-900"
              style={{ width: `${width}%` }}
              title={`P${block.processId}: ${block.start} - ${block.end}`}
            >
              P{block.processId}
            </div>
          );
        })}
      </div>
      <div className="flex w-full justify-between text-xs text-slate-400 font-mono">
        <span>0</span>
        <span>{totalTime}</span>
      </div>
    </div>
  );
}
