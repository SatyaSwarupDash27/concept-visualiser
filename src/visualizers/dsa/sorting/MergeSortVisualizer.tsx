// visualizers/dsa/sorting/MergeSortVisualizer.tsx
import React from 'react';
import { ArrayBars } from '../../shared/ArrayBars';
import type { SortSnapshot } from '../../../core/types/snapshot.dsa';

const MergeSortVisualizer: React.FC<{ snapshot: SortSnapshot }> = ({ snapshot }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-8 space-y-8">
      <div className="w-full max-w-4xl bg-slate-900/40 rounded-2xl p-8 border border-slate-700/30 shadow-2xl backdrop-blur-sm">
        <ArrayBars snapshot={snapshot} />
      </div>
      
      {/* Narrative Overlay */}
      <div className="flex flex-col items-center space-y-2 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
        <span className="px-3 py-1 text-xs font-bold tracking-widest uppercase rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
          Phase: {snapshot.phase}
        </span>
        <h3 className="text-2xl font-semibold text-slate-100 max-w-2xl px-4">
          {snapshot.message}
        </h3>
      </div>
    </div>
  );
};

export default MergeSortVisualizer;
