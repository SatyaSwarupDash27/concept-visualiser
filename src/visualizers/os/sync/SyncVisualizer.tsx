// visualizers/os/sync/SyncVisualizer.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { SynchronizationSnapshot } from '../../../core/types/snapshot.os';

const SyncVisualizer: React.FC<{ snapshot: SynchronizationSnapshot }> = ({ snapshot }) => {
  const threads = snapshot.structure || [];
  const { criticalSectionOwner, buffer, bufferSize } = snapshot;
  const waitingQueue = snapshot.waitingQueue || [];

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4 md:p-8 overflow-y-auto">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Waiting Area */}
        <div className="bg-slate-900/40 rounded-3xl p-6 border border-slate-700/30 flex flex-col items-center">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-6">Entry Queue (Waiting)</h4>
          <div className="flex flex-col gap-3 w-full">
            <AnimatePresence>
              {waitingQueue.map((threadId) => (
                <motion.div
                  key={threadId}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 20, opacity: 0 }}
                  className="bg-slate-800 border border-slate-700 p-3 rounded-xl flex items-center justify-between"
                >
                  <span className="font-bold text-slate-300">Thread {threadId}</span>
                   <span className="text-[8px] bg-amber-500/20 text-amber-500 px-2 py-0.5 rounded-full font-black">WAITING</span>
                </motion.div>
              ))}
            </AnimatePresence>
            {waitingQueue.length === 0 && <span className="text-slate-600 text-xs italic text-center">No threads waiting</span>}
          </div>
        </div>

        {/* Critical Section */}
        <div className="bg-indigo-900/10 rounded-3xl p-8 border-4 border-dashed border-indigo-500/30 flex flex-col items-center justify-center relative min-h-[300px]">
          <h4 className="absolute top-4 text-[10px] font-black uppercase tracking-widest text-indigo-400">Critical Section</h4>
          <AnimatePresence mode="wait">
            {criticalSectionOwner ? (
              <motion.div
                key={criticalSectionOwner}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.2, opacity: 0 }}
                className="w-32 h-32 rounded-full bg-indigo-600 flex flex-col items-center justify-center shadow-[0_0_50px_rgba(79,70,229,0.4)] border-4 border-indigo-400"
              >
                <span className="text-2xl font-black text-white">T{criticalSectionOwner}</span>
                <span className="text-[10px] font-bold text-indigo-200 mt-1 uppercase">Executing</span>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center space-y-2 opacity-30">
                 <div className="w-20 h-20 rounded-full border-4 border-slate-700 flex items-center justify-center">
                    <span className="text-2xl text-slate-600">🔓</span>
                 </div>
                 <span className="text-xs text-slate-600 font-mono">Resource Unlocked</span>
              </div>
            )}
          </AnimatePresence>
        </div>
        {buffer && (
          <div className="bg-slate-900/40 rounded-3xl p-6 border border-slate-700/30 flex flex-col items-center">
             <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-6">Bounded Buffer ({buffer.length}/{bufferSize})</h4>
             <div className="flex flex-wrap gap-2 justify-center content-start min-h-[150px]">
                {Array.from({ length: bufferSize || 5 }).map((_, idx) => (
                  <div 
                    key={idx}
                    className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-all duration-300 ${
                      idx < buffer.length 
                        ? 'bg-indigo-600/20 border-indigo-500 text-indigo-200' 
                        : 'bg-slate-800/30 border-slate-700/50 text-slate-700'
                    }`}
                  >
                    {idx < buffer.length ? (
                      <motion.span 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-xs font-bold"
                      >
                        {buffer[idx]}
                      </motion.span>
                    ) : (
                      <span className="text-[10px] font-mono opacity-20">{idx}</span>
                    )}
                  </div>
                ))}
             </div>
             {buffer.length === bufferSize && <span className="text-red-400 text-[10px] font-bold mt-4 animate-pulse">OVERFLOW RISK - BUFFER FULL</span>}
             {buffer.length === 0 && <span className="text-amber-400 text-[10px] font-bold mt-4">UNDERFLOW RISK - BUFFER EMPTY</span>}
          </div>
        )}

        {/* Thread Pool Status */}
        <div className="bg-slate-900/40 rounded-3xl p-6 border border-slate-700/30 flex flex-col">
           <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-6 flex justify-center">Thread States</h4>
           <div className="space-y-2">
             {threads.map((t) => (
               <div key={t.id} className="flex items-center gap-3 bg-slate-800/50 p-2 rounded-xl border border-slate-700/30 transition-colors duration-300">
                 <div className={`w-2 h-2 rounded-full ${
                   t.state === 'running' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' :
                   t.state === 'blocked' ? 'bg-amber-500' : 'bg-slate-600'
                 }`} />
                 <span className="text-sm font-medium text-slate-300 flex-1">Thread {t.id}</span>
                 <span className="text-[10px] font-mono text-slate-500 uppercase">{t.state}</span>
               </div>
             ))}
           </div>
        </div>
      </div>

      <div className="text-center max-w-2xl">
         <h3 className="text-2xl font-semibold text-slate-100 mb-2 leading-tight">
           {snapshot.message}
         </h3>
         <p className="text-sm text-slate-500 font-mono">Status: {criticalSectionOwner ? `Locked by ${criticalSectionOwner}` : 'Ready'}</p>
      </div>
    </div>
  );
};

export default SyncVisualizer;
