// visualizers/os/disk/DiskVisualizer.tsx
import React from 'react';
import { motion } from 'framer-motion';

const DiskVisualizer: React.FC<{ snapshot: any }> = ({ snapshot }) => {
  const { currentPos, queue } = snapshot.structure;
  const seekSequence = snapshot.seekSequence || [];
  
  const tracks = 200;
  const scale = 100 / tracks;

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-8 space-y-12">
      <div className="w-full max-w-5xl bg-slate-900/40 rounded-[3rem] p-12 border border-slate-700/30 shadow-2xl relative overflow-hidden">
        
        {/* Track Label */}
        <div className="flex justify-between mb-4 text-[10px] font-black text-slate-600 uppercase tracking-widest px-1">
           <span>Track 0</span>
           <span>Track {tracks - 1}</span>
        </div>

        {/* The Track */}
        <div className="relative h-12 bg-slate-800/50 rounded-full border border-slate-700 overflow-hidden mb-16">
          {/* Tick marks */}
          {Array.from({ length: 21 }).map((_, i) => (
             <div 
               key={i} 
               className="absolute w-px h-2 bg-slate-700 top-0" 
               style={{ left: `${(i * 10) * scale}%` }} 
             />
          ))}

          {/* Pending Requests */}
          {queue.map((req: number, i: number) => (
            <div 
              key={i} 
              className="absolute w-1 h-full bg-amber-500/20 border-l border-amber-500/50"
              style={{ left: `${req * scale}%` }}
            />
          ))}

          {/* Read/Write Head */}
          <motion.div 
            animate={{ left: `${currentPos * scale}%` }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute top-0 bottom-0 w-1.5 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] z-10 flex flex-col items-center"
          >
             <div className="absolute -top-8 bg-blue-600 text-white text-[10px] font-black px-2 py-0.5 rounded shadow-lg">
                {Math.round(currentPos)}
             </div>
             <div className="w-4 h-4 rounded-full bg-blue-400 absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 border-2 border-slate-900" />
          </motion.div>
        </div>

        {/* Seek Graph */}
        <div className="h-64 border-l border-b border-slate-700 relative ml-8 bg-slate-900/20 rounded-bl-xl p-4">
           <svg className="w-full h-full overflow-visible">
              <polyline
                points={seekSequence.map((pos: number, i: number) => 
                  `${pos * (800/tracks)},${i * (200 / Math.max(seekSequence.length, 1))}`
                ).join(' ')}
                fill="none"
                stroke="#6366f1"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="drop-shadow-[0_0_5px_rgba(99,102,241,0.5)]"
              />
              {seekSequence.map((pos: number, i: number) => (
                <circle
                  key={i}
                  cx={pos * (800/tracks)}
                  cy={i * (200 / Math.max(seekSequence.length, 1))}
                  r="3"
                  fill={i === seekSequence.length - 1 ? "#3b82f6" : "#4f46e5"}
                />
              ))}
           </svg>
           <div className="absolute -left-8 top-0 bottom-0 flex flex-col justify-between text-[8px] font-black text-slate-500 uppercase py-2">
              <span className="rotate-90">Requests →</span>
           </div>
        </div>
      </div>

      <div className="text-center max-w-2xl">
         <h3 className="text-2xl font-semibold text-slate-100 mb-2 leading-tight">
           {snapshot.message}
         </h3>
         <div className="inline-flex items-center gap-6 text-xs font-mono text-slate-500">
            <span className="bg-slate-800 px-3 py-1 rounded-full uppercase tracking-tighter">Distance: {snapshot.metrics.totalSeekDistance} pk</span>
            <span className="bg-slate-800 px-3 py-1 rounded-full uppercase tracking-tighter">Queue: {queue.length} left</span>
         </div>
      </div>
    </div>
  );
};

export default DiskVisualizer;
