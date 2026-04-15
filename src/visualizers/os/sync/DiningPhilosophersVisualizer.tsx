// visualizers/os/sync/DiningPhilosophersVisualizer.tsx
import React from 'react';
import { motion } from 'framer-motion';

const DiningPhilosophersVisualizer: React.FC<{ snapshot: any }> = ({ snapshot }) => {
  const phils = snapshot.structure;
  const chopsticks = snapshot.chopsticks;
  const count = phils.length;

  // Layout constants
  const centerX = 400;
  const centerY = 300;
  const radius = 180;

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-8 space-y-12">
      <div className="relative w-full max-w-4xl h-[600px] bg-slate-900/40 rounded-[3rem] border border-slate-700/30 shadow-2xl overflow-hidden flex items-center justify-center">
        
        {/* Table Shadow */}
        <div className="absolute w-[400px] h-[400px] bg-slate-800/50 rounded-full border-12 border-slate-800 shadow-inner" />

        {/* Philosophers */}
        {phils.map((phil: any, i: number) => {
          const angle = (i * 2 * Math.PI) / count - Math.PI / 2;
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);

          const isEating = phil.state === 'eating';
          const isHungry = phil.state === 'hungry';
          const isDeadlocked = phil.state === 'deadlocked';

          return (
            <motion.div
              key={phil.id}
              initial={false}
              animate={{
                scale: isEating ? 1.2 : 1,
                borderColor: isDeadlocked ? '#ef4444' : isEating ? '#10b981' : isHungry ? '#fbbf24' : '#475569'
              }}
              className={`absolute w-24 h-24 rounded-full border-4 flex flex-col items-center justify-center bg-slate-900 shadow-xl z-20 transition-colors duration-300`}
              style={{ left: x - 48, top: y - 48 }}
            >
               <span className="text-3xl mb-1">{isDeadlocked ? '💀' : isEating ? '🍜' : isHungry ? '😋' : '🤔'}</span>
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Phil {phil.id}</span>
               {isDeadlocked && <span className="text-[8px] text-red-500 font-bold animate-pulse">STUCK</span>}
            </motion.div>
          );
        })}

        {/* Chopsticks (placed between philosophers) */}
        {chopsticks.map((owner: string | 'free', i: number) => {
          // A chopstick i is located between philosopher i and i-1?
          // Let's place chopstick i between i and (i+1)%count
          const angle = ((i + 0.5) * 2 * Math.PI) / count - Math.PI / 2;
          const chopX = centerX + (radius - 50) * Math.cos(angle);
          const chopY = centerY + (radius - 50) * Math.sin(angle);
          
          const isTaken = owner !== 'free';

          return (
            <motion.div
              key={i}
              initial={false}
              animate={{
                rotate: angle * (180 / Math.PI) + 90,
                opacity: isTaken ? 0.3 : 1,
                scale: isTaken ? 0.8 : 1,
              }}
              className="absolute w-2 h-20 bg-amber-700/80 rounded-full shadow-lg z-10"
              style={{ left: chopX - 4, top: chopY - 40 }}
            >
               <div className="w-full h-1/4 bg-amber-900 rounded-t-full" />
            </motion.div>
          );
        })}

        {/* Center Label */}
        <div className="absolute flex flex-col items-center pointer-events-none">
           <span className="text-4xl font-black text-slate-700/30 uppercase tracking-[0.3em]">Dining</span>
           <span className="text-xs font-bold text-slate-600/50 uppercase tracking-[0.5em] -mt-1">Philosophers</span>
        </div>
      </div>

      <div className="text-center max-w-2xl">
         <h3 className="text-2xl font-semibold text-slate-100 mb-2 leading-tight">
           {snapshot.message}
         </h3>
         <div className="inline-flex gap-4">
            <span className="text-xs font-mono text-slate-500">Wait Ticks: {snapshot.metrics.waitTicks}</span>
            <span className="text-xs font-mono text-slate-500">Deadlocks: {snapshot.metrics.deadlocksDetected}</span>
         </div>
      </div>
    </div>
  );
};

export default DiningPhilosophersVisualizer;
