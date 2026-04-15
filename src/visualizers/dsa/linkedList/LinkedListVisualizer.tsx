// visualizers/dsa/linkedList/LinkedListVisualizer.tsx
import React from 'react';
import { LinkedListView } from '../../shared/LinkedListView';
import type { LinkedListSnapshot } from '../../../core/types/snapshot.dsa';

const LinkedListVisualizer: React.FC<{ snapshot: LinkedListSnapshot }> = ({ snapshot }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-8 space-y-12">
      <div className="w-full max-w-5xl bg-slate-900/40 rounded-2xl p-12 border border-slate-700/30 shadow-2xl backdrop-blur-sm relative">
        <LinkedListView snapshot={snapshot} />
        
        {/* Pointers Overlay */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
           {snapshot.structure.map((node, i) => {
             const isPrev = snapshot.pointers.prev === node.id;
             const isCurr = snapshot.pointers.curr === node.id;
             const isNext = snapshot.pointers.next === node.id;

             return (
               <div key={node.id} className="absolute flex flex-col items-center" style={{ left: `calc(50% + ${(i - (snapshot.structure.length - 1) / 2) * 120}px)` }}>
                 <div className="flex gap-2 mt-24">
                   {isPrev && <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded text-[10px] font-bold">PREV</span>}
                   {isCurr && <span className="bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded text-[10px] font-bold">CURR</span>}
                   {isNext && <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded text-[10px] font-bold">NEXT</span>}
                 </div>
               </div>
             );
           })}
        </div>
      </div>
      
      <div className="text-center">
        <h3 className="text-2xl font-semibold text-slate-100 mb-2">
          {snapshot.message}
        </h3>
        <p className="text-sm text-slate-400 font-mono">Phase: {snapshot.phase}</p>
      </div>
    </div>
  );
};

export default LinkedListVisualizer;
