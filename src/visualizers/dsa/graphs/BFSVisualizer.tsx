// visualizers/dsa/graphs/BFSVisualizer.tsx
import React from 'react';
import { GraphCanvas } from '../../shared/GraphCanvas';
import type { GraphSnapshot } from '../../../core/types/snapshot.dsa';

const BFSVisualizer: React.FC<{ snapshot: GraphSnapshot }> = ({ snapshot }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-8 gap-8">
      <div className="w-full max-w-5xl bg-slate-900/40 rounded-3xl p-6 border border-slate-700/30 shadow-2xl backdrop-blur-sm">
        <GraphCanvas snapshot={snapshot} />
      </div>
      <div className="flex flex-col items-center text-center max-w-2xl gap-3">
        <div className="flex gap-2">
           <span className="px-3 py-1 text-[10px] font-black tracking-tighter uppercase rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            BFS Traversal
          </span>
          <span className="px-3 py-1 text-[10px] font-black tracking-tighter uppercase rounded-full bg-slate-800 text-slate-400 border border-slate-700">
            {snapshot.phase}
          </span>
        </div>
        <h3 className="text-xl font-medium text-slate-200 leading-relaxed tracking-tight">
          {snapshot.message}
        </h3>
      </div>
    </div>
  );
};

export default BFSVisualizer;
