// visualizers/dsa/linear/ExpressionVisualizer.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ExpressionSnapshot } from '../../../core/types/snapshot.dsa';

const ExpressionVisualizer: React.FC<{ snapshot: ExpressionSnapshot }> = ({ snapshot }) => {
  const { input, stack, output, currentIndex } = snapshot.structure;

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-6 space-y-8">
      {/* Input Row */}
      <div className="w-full max-w-4xl bg-slate-900/40 rounded-2xl p-6 border border-slate-700/30">
        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">Input Expression</h4>
        <div className="flex gap-2 justify-center">
          {input.map((char, i) => (
            <div 
              key={i} 
              className={`w-10 h-12 flex items-center justify-center rounded-lg border-2 font-mono font-bold text-lg transition-all duration-300 ${
                i === currentIndex ? 'border-blue-500 bg-blue-500/20 text-white scale-110 shadow-lg shadow-blue-500/20' : 
                i < currentIndex ? 'border-slate-700 bg-slate-800 text-slate-500' : 'border-slate-700 bg-slate-800/40 text-slate-300'
              }`}
            >
              {char}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {/* Stack Column */}
        <div className="bg-slate-900/40 rounded-2xl p-6 border border-slate-700/30 flex flex-col items-center">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-6">Operator Stack</h4>
          <div className="w-24 h-64 border-2 border-t-0 border-slate-700 bg-slate-800/20 rounded-b-xl relative flex flex-col-reverse p-2 gap-2 overflow-hidden">
             <AnimatePresence>
               {stack.map((op, i) => (
                 <motion.div
                   key={`${i}-${op}`}
                   initial={{ y: -50, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   exit={{ x: 50, opacity: 0 }}
                   className="h-10 w-full flex items-center justify-center bg-indigo-600 rounded-lg text-white font-bold border border-indigo-400 shadow-md"
                 >
                   {op}
                 </motion.div>
               ))}
             </AnimatePresence>
             {stack.length === 0 && <span className="absolute inset-0 flex items-center justify-center text-slate-600 text-xs italic">Empty</span>}
          </div>
        </div>

        {/* Output Column */}
        <div className="bg-slate-900/40 rounded-2xl p-6 border border-slate-700/30 flex flex-col">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-6 flex justify-center">Postfix Output</h4>
          <div className="flex-1 overflow-y-auto min-h-[16rem]">
            <div className="flex flex-wrap gap-2 justify-center">
               <AnimatePresence>
                 {output.map((char, i) => (
                   <motion.div
                     key={`${i}-${char}`}
                     initial={{ scale: 0, opacity: 0 }}
                     animate={{ scale: 1, opacity: 1 }}
                     className="w-10 h-10 flex items-center justify-center bg-emerald-600 rounded-lg text-white font-bold border border-emerald-400 shadow-md"
                   >
                     {char}
                   </motion.div>
                 ))}
               </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
         <h3 className="text-2xl font-semibold text-slate-100 mb-2 leading-tight">
           {snapshot.message}
         </h3>
         {snapshot.precedenceCheck && (
           <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full text-xs font-mono text-amber-400 animate-in fade-in zoom-in duration-300">
             Prec({snapshot.precedenceCheck.stackTop}) {'>'} Prec({snapshot.precedenceCheck.incoming}) → {snapshot.precedenceCheck.result}
           </div>
         )}
      </div>
    </div>
  );
};

export default ExpressionVisualizer;
