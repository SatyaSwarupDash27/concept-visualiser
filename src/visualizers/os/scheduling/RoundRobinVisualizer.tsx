// visualizers/os/scheduling/RoundRobinVisualizer.tsx
import React from 'react';
import { GanttChart } from '../../shared/GanttChart';
import type { SchedulingSnapshot } from '../../../core/types/snapshot.os';

const RoundRobinVisualizer: React.FC<{ snapshot: SchedulingSnapshot }> = ({ snapshot }) => {
  const { readyQueue, runningProcess, quantumRemaining } = snapshot as any;

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-8 gap-10">
      <div className="w-full max-w-5xl space-y-8">
        {/* Gantt Area */}
        <div className="bg-slate-900/40 rounded-3xl p-8 border border-slate-700/30 shadow-2xl backdrop-blur-sm">
          <GanttChart snapshot={snapshot} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Ready Queue */}
          <div className="bg-slate-900/60 rounded-2xl p-6 border border-slate-700/50">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">Ready Queue</h4>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {readyQueue?.length > 0 ? (
                readyQueue.map((p: any, i: number) => (
                  <div key={i} className="flex-shrink-0 w-16 h-16 rounded-xl bg-slate-800 border-2 border-slate-700 flex flex-col items-center justify-center">
                    <span className="text-lg font-bold">P{p.id}</span>
                    <span className="text-[10px] text-slate-500">Left: {p.remainingTime}</span>
                  </div>
                ))
              ) : (
                <span className="text-sm text-slate-600 italic">Queue empty</span>
              )}
            </div>
          </div>

          {/* CPU State */}
          <div className="bg-slate-900/60 rounded-2xl p-6 border border-slate-700/50 flex items-center justify-between">
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2">CPU Status</h4>
              {runningProcess ? (
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-green-500/20 border-2 border-green-500/50 flex items-center justify-center animate-pulse">
                      <span className="text-green-400 font-bold">P{runningProcess.id}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Executing...</p>
                      <p className="text-[10px] text-slate-400">Quantum Left: {quantumRemaining}</p>
                    </div>
                 </div>
              ) : (
                <span className="text-sm text-slate-600 italic">Idle</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="text-center max-w-xl">
        <p className="text-lg text-slate-300 font-medium tracking-tight">
          {snapshot.message}
        </p>
      </div>
    </div>
  );
};

export default RoundRobinVisualizer;
