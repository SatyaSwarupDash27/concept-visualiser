// visualizers/os/memory/PageReplacementVisualizer.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { PageSnapshot } from '../../../core/types/snapshot.os';

const PageReplacementVisualizer: React.FC<{ snapshot: PageSnapshot }> = ({ snapshot }) => {
  const { frames, incomingPage, lruOrder } = snapshot as any;

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-8 space-y-12">
      <div className="w-full max-w-5xl space-y-12">
        
        {/* Memory Frames */}
        <div className="flex flex-col items-center gap-6">
          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Memory Frames</h4>
          <div className="flex gap-4">
            {frames.map((page: number | null, i: number) => {
              const state = snapshot.highlights.slots[i] || 'default';
              return (
                <motion.div
                  key={i}
                  layout
                  className={`w-24 h-24 rounded-2xl border-2 flex flex-col items-center justify-center relative shadow-xl transition-all duration-300 ${
                    state === 'hit' ? 'border-emerald-500 bg-emerald-500/10' : 
                    state === 'fault' ? 'border-amber-500 bg-amber-500/10' : 'border-slate-700 bg-slate-800/50'
                  }`}
                >
                  <span className="text-[10px] absolute top-2 font-bold text-slate-500 uppercase">F{i}</span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={page}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-3xl font-black text-slate-100"
                    >
                      {page !== null ? page : '-'}
                    </motion.span>
                  </AnimatePresence>
                  
                  {state === 'hit' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute -top-3 bg-emerald-500 text-white text-[8px] font-black px-2 py-0.5 rounded-full shadow-lg">HIT</motion.div>
                  )}
                   {state === 'fault' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute -top-3 bg-amber-500 text-white text-[8px] font-black px-2 py-0.5 rounded-full shadow-lg">FAULT</motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {/* Incoming Page */}
           <div className="bg-slate-900/60 rounded-3xl p-8 border border-slate-700/50 flex flex-col items-center justify-center space-y-4">
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-500">Processing</h4>
              <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.3)]">
                 <span className="text-3xl font-black text-white">{incomingPage}</span>
              </div>
              <p className="text-sm font-medium text-slate-300">Requesting Page {incomingPage}</p>
           </div>

           {/* LRU Stack */}
           <div className="bg-slate-900/60 rounded-3xl p-8 border border-slate-700/50">
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-6">Access Recency (LRU Order)</h4>
              <div className="flex flex-col gap-2">
                 {lruOrder?.map((p: number, i: number) => (
                   <div key={p} className="flex items-center gap-4 bg-slate-800/50 p-2 rounded-xl border border-slate-700/30">
                     <span className="w-6 h-6 rounded-lg bg-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-400">{i+1}</span>
                     <span className="font-bold text-slate-200">Page {p}</span>
                     {i === 0 && <span className="ml-auto text-[8px] font-bold text-red-400 uppercase tracking-tighter">Least Recent (Next to Evict)</span>}
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>

      <div className="text-center max-w-2xl">
         <h3 className="text-2xl font-semibold text-slate-100 mb-2 leading-tight">{snapshot.message}</h3>
         <div className="flex justify-center gap-4">
            <span className="text-xs font-mono text-slate-500">Hits: {snapshot.metrics.cacheHits}</span>
            <span className="text-xs font-mono text-slate-500">Faults: {snapshot.metrics.pageFaults}</span>
         </div>
      </div>
    </div>
  );
};

export default PageReplacementVisualizer;
