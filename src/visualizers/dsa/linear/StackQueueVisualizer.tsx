// visualizers/dsa/linear/StackQueueVisualizer.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { SortSnapshot } from '../../../core/types/snapshot.dsa';

interface Props {
  snapshot: SortSnapshot;
  type: 'stack' | 'queue';
}

const StackQueueVisualizer: React.FC<Props> = ({ snapshot, type }) => {
  const elements = snapshot.structure;
  const isStack = type === 'stack';

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-8 space-y-12">
      <div className="relative w-full max-w-4xl h-96 flex items-center justify-center">
        {/* Container for Stack/Queue */}
        <div 
          className={`border-4 border-slate-700/50 bg-slate-900/30 rounded-3xl relative flex ${
            isStack ? 'flex-col-reverse w-48 h-80 items-stretch p-4 border-t-0 rounded-t-none' : 'flex-row w-full h-32 items-center p-6 rounded-3xl'
          }`}
        >
          {/* LIFO/FIFO Flow Indicators */}
          <div className="absolute -top-12 left-0 w-full flex justify-center">
             <span className="text-[10px] font-black tracking-widest text-slate-500 uppercase">{isStack ? 'Top of Stack' : 'Front of Queue'}</span>
          </div>

          <AnimatePresence>
            {elements.map((value, i) => {
              const state = snapshot.highlights.indices[i] || 'default';
              return (
                <motion.div
                  key={`${i}-${value}`}
                  layout
                  initial={{ opacity: 0, scale: 0.5, [isStack ? 'y' : 'x']: -50 }}
                  animate={{ opacity: 1, scale: 1, [isStack ? 'y' : 'x']: 0 }}
                  exit={{ opacity: 0, scale: 0.5, [isStack ? 'y' : 'x']: 50 }}
                  className="flex items-center justify-center font-mono font-black text-xl text-white rounded-xl shadow-lg border-2"
                  style={{ 
                    width: isStack ? '100%' : '80px',
                    height: isStack ? '60px' : '100%',
                    backgroundColor: `var(--el-${state})`,
                    borderColor: 'rgba(0,0,0,0.2)',
                    margin: isStack ? '4px 0' : '0 8px'
                  }}
                >
                  {value}
                </motion.div>
              );
            })}
          </AnimatePresence>

          {elements.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
               <span className="text-slate-600 font-mono italic text-sm">Empty {isStack ? 'Stack' : 'Queue'}</span>
            </div>
          )}
        </div>
      </div>

      <div className="text-center max-w-2xl">
         <h3 className="text-2xl font-semibold text-slate-100 mb-2 leading-tight">{snapshot.message}</h3>
         <p className="text-sm font-mono text-slate-500 uppercase tracking-widest">Phase: {snapshot.phase}</p>
      </div>
    </div>
  );
};

export const StackVisualizer: React.FC<{ snapshot: SortSnapshot }> = (props) => (
  <StackQueueVisualizer {...props} type="stack" />
);

export const QueueVisualizer: React.FC<{ snapshot: SortSnapshot }> = (props) => (
  <StackQueueVisualizer {...props} type="queue" />
);

export default StackQueueVisualizer;
