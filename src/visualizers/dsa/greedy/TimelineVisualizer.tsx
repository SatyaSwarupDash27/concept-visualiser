// visualizers/dsa/greedy/TimelineVisualizer.tsx
import React from 'react';
import type { Activity } from '../../../algorithms/dsa/greedy/activitySelection.gen';

const TimelineVisualizer: React.FC<{ snapshot: any }> = ({ snapshot }) => {
  const activities = (snapshot.structure as Activity[]) || [];
  const selectedIds = snapshot.highlights.selectedIds || [];
  const lastFinishTime = snapshot.lastFinishTime || 0;
  
  const maxTime = Math.max(...activities.map(a => a.end), 20);
  const scale = 100 / maxTime;

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-8 space-y-12">
      <div className="w-full max-w-5xl bg-slate-900/40 rounded-[2rem] p-12 border border-slate-700/30 shadow-2xl relative">
        
        {/* Timeline Axis */}
        <div className="absolute left-12 right-12 bottom-20 h-0.5 bg-slate-700 flex justify-between px-2">
           {Array.from({ length: 11 }).map((_, i) => (
             <div key={i} className="flex flex-col items-center">
                <div className="w-0.5 h-2 bg-slate-600 -translate-y-1" />
                <span className="text-[10px] font-mono text-slate-500 mt-2">{Math.round((i * maxTime) / 10)}</span>
             </div>
           ))}
        </div>

        {/* Activity Bars */}
        <div className="flex flex-col gap-4 mb-32 relative min-h-[300px] justify-center">
          {activities.map((act, i) => {
            const state = snapshot.highlights.indices[i] || 'default';
            const isSelected = selectedIds.includes(act.id);
            const isCurrent = state === 'comparing';
            const isRejected = state === 'deadlocked';

            return (
              <div 
                key={act.id} 
                className={`relative h-10 rounded-xl flex items-center px-4 font-mono font-bold text-xs transition-all duration-500 border-2 overflow-hidden ${
                  isSelected ? 'bg-emerald-600/20 border-emerald-500 text-emerald-400 z-10' :
                  isCurrent ? 'bg-amber-500/20 border-amber-500 text-amber-400 z-20 scale-105 shadow-xl' :
                  isRejected ? 'bg-slate-800/50 border-slate-700/50 text-slate-600 opacity-40' :
                  'bg-slate-800/30 border-slate-700/30 text-slate-400'
                }`}
                style={{ 
                  left: `${act.start * scale}%`, 
                  width: `${(act.end - act.start) * scale}%` 
                }}
              >
                <div className={`absolute inset-0 bg-white/5 ${isCurrent ? 'animate-pulse' : ''}`} />
                <span className="relative">Act {act.id} ({act.start}-{act.end})</span>
              </div>
            );
          })}

          {/* Greedy Cursor (Last Finish Time) */}
          {lastFinishTime > 0 && (
            <div 
              className="absolute top-0 bottom-0 w-0.5 bg-rose-500 border-l border-rose-400/50 transition-all duration-300 z-30 flex flex-col items-center"
              style={{ left: `${lastFinishTime * scale}%`, top: '-40px', bottom: '-20px' }}
            >
               <div className="bg-rose-500 text-white text-[8px] font-black px-1 rounded -translate-y-2">AVAIL</div>
            </div>
          )}
        </div>
      </div>

      <div className="text-center max-w-2xl px-6">
         <h3 className="text-2xl font-semibold text-slate-100 mb-2 leading-tight">
           {snapshot.message}
         </h3>
         <p className="text-sm font-mono text-slate-500 uppercase tracking-widest">
            Selected: {selectedIds.length} / Total: {activities.length}
         </p>
      </div>
    </div>
  );
};

export default TimelineVisualizer;
