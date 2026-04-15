// visualizers/dsa/strings/StringMatchVisualizer.tsx
import React from 'react';
import type { StringSnapshot } from '../../../core/types/snapshot.dsa';

const StringMatchVisualizer: React.FC<{ snapshot: StringSnapshot }> = ({ snapshot }) => {
  const { structure: text, pattern, currentShift, results } = snapshot;

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-8 space-y-12">
      <div className="w-full max-w-5xl bg-slate-900/40 rounded-3xl p-12 border border-slate-700/30 shadow-2xl backdrop-blur-sm relative overflow-hidden">
        
        {/* Text Area */}
        <div className="flex flex-col gap-4 mb-20 relative">
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Text String</h4>
          <div className="flex gap-1 justify-center">
            {text.split('').map((char, i) => {
              const state = snapshot.highlights.indices[i] || 'default';
              const isFound = results.some(r => i >= r && i < r + pattern.length);
              
              return (
                <div 
                  key={i} 
                  className={`w-10 h-10 flex items-center justify-center rounded-lg border-2 font-mono font-bold text-xl transition-all duration-200 ${
                    state === 'comparing' ? 'border-amber-400 bg-amber-400/20 text-white animate-pulse' :
                    state === 'deadlocked' ? 'border-red-500 bg-red-500/10 text-red-400' :
                    isFound ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]' :
                    'border-slate-800 bg-slate-900/50 text-slate-400'
                  }`}
                >
                  {char}
                </div>
              );
            })}
          </div>
        </div>

        {/* Pattern Area (Sliding) */}
        <div className="absolute left-12 right-12 bottom-20 h-20">
          <div 
            className="absolute transition-all duration-500 ease-in-out flex flex-col items-center"
            style={{ 
              left: `calc(50% + ${(currentShift - (text.length - 1) / 2) * 44}px)`,
              width: `${pattern.length * 44}px`
            }}
          >
             <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4">Pattern</h4>
             <div className="flex gap-1">
                {pattern.split('').map((char, j) => {
                  const isComparing = snapshot.highlights.indices[currentShift + j] === 'comparing';
                  const isMismatch = snapshot.highlights.indices[currentShift + j] === 'deadlocked';
                  
                  return (
                    <div 
                      key={j} 
                      className={`w-10 h-10 flex items-center justify-center rounded-lg border-2 font-mono font-black text-xl transition-all duration-300 ${
                        isComparing ? 'border-amber-400 bg-amber-400 text-slate-900 scale-110' :
                        isMismatch ? 'border-red-500 bg-red-600 text-white' :
                        'border-blue-500/50 bg-blue-600/20 text-blue-400'
                      }`}
                    >
                      {char}
                    </div>
                  );
                })}
             </div>
             
             {/* Slide Indicator */}
             <div className="mt-4 animate-bounce">
                <span className="text-blue-500/40 text-xs font-black">▲</span>
             </div>
          </div>
        </div>
      </div>

      <div className="text-center max-w-2xl px-6">
         <h3 className="text-2xl font-semibold text-slate-100 mb-2 leading-snug">
           {snapshot.message}
         </h3>
         <div className="flex justify-center gap-4 text-xs font-mono text-slate-500 uppercase tracking-widest">
            <span>Shift: {currentShift}</span>
            <span>Matches: {results.length}</span>
         </div>
      </div>
    </div>
  );
};

export default StringMatchVisualizer;
