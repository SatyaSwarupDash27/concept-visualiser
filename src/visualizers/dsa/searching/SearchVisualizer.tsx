// visualizers/dsa/searching/SearchVisualizer.tsx
import React from 'react';
import { ArrayBars } from '../../shared/ArrayBars';
import type { SortSnapshot } from '../../../core/types/snapshot.dsa';

const SearchVisualizer: React.FC<{ snapshot: SortSnapshot }> = ({ snapshot }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-8 space-y-8">
      <div className="w-full max-w-4xl bg-slate-900/40 rounded-2xl p-8 border border-slate-700/30 shadow-2xl backdrop-blur-sm">
        <ArrayBars snapshot={snapshot} />
        
        {/* Pointer Labels */}
        <div className="flex justify-center gap-1 mt-4">
           {snapshot.structure.map((_, i) => {
             // The generator marks pointers with 'current'
             const state = snapshot.highlights.indices[i];
             return (
               <div key={i} className="w-8 flex justify-center">
                 {state === 'current' && (
                   <div className="text-[10px] font-bold text-blue-400 animate-bounce">▲</div>
                 )}
                 {state === 'comparing' && (
                   <div className="text-[10px] font-bold text-amber-400 animate-pulse">▼</div>
                 )}
               </div>
             );
           })}
        </div>
      </div>
      
      <div className="flex flex-col items-center space-y-2 text-center">
        <span className="px-3 py-1 text-xs font-bold tracking-widest uppercase rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          Target: SEARCHING
        </span>
        <h3 className="text-2xl font-semibold text-slate-100 max-w-2xl px-4">
          {snapshot.message}
        </h3>
      </div>
    </div>
  );
};

export default SearchVisualizer;
