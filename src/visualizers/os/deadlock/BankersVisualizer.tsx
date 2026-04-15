// visualizers/os/deadlock/BankersVisualizer.tsx
import React from 'react';

const BankersVisualizer: React.FC<{ snapshot: any }> = ({ snapshot }) => {
  const { alloc, max, need, work, finished } = snapshot.structure;
  const currentP = snapshot.currentProcess;
  const safeSequence = snapshot.safeSequence || [];

  const MatrixGrid = ({ data, title, hlRow, hlCol }: any) => (
    <div className="flex flex-col space-y-2">
      <h5 className="text-[9px] font-black uppercase tracking-widest text-slate-500 text-center">{title}</h5>
      <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-2 overflow-hidden">
        <table className="w-full text-[10px] font-mono border-collapse">
          <tbody>
            {data.map((row: number[], i: number) => (
              <tr key={i} className={i === hlRow ? 'bg-blue-500/20' : ''}>
                {row.map((val, j) => (
                  <td key={j} className={`p-1 border border-slate-700/30 text-center w-8 ${i === hlRow ? 'text-blue-200' : 'text-slate-400'}`}>
                    {val}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-6 space-y-8">
      <div className="w-full max-w-5xl bg-slate-900/40 rounded-[2rem] p-12 border border-slate-700/30 shadow-2xl backdrop-blur-sm">
        
        {/* Resource Matrices */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
           <MatrixGrid data={max} title="Max Claims" hlRow={currentP} />
           <MatrixGrid data={alloc} title="Allocated" hlRow={currentP} />
           <MatrixGrid data={need} title="Remaining Need" hlRow={currentP} />
        </div>

        {/* Global State Bar */}
        <div className="flex items-center gap-8 bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-inner">
           <div className="flex flex-col gap-2">
              <span className="text-[9px] font-black uppercase text-slate-500">Available Resources</span>
              <div className="flex gap-2">
                 {work.map((v: number, i: number) => (
                   <div key={i} className="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center font-black text-white shadow-lg border border-emerald-400">
                     {v}
                   </div>
                 ))}
              </div>
           </div>

           <div className="flex-1 flex flex-col gap-2">
              <span className="text-[9px] font-black uppercase text-slate-500 text-center">Safe Sequence</span>
              <div className="flex gap-2 justify-center">
                 {safeSequence.map((p: string, i: number) => (
                   <div key={i} className="px-3 py-1 bg-blue-600 rounded-full text-[10px] font-black text-white shadow-md animate-in slide-in-from-left duration-300">
                     {p}
                   </div>
                 ))}
                 {safeSequence.length === 0 && <span className="text-slate-600 text-[10px] italic">Seeking sequence...</span>}
              </div>
           </div>

           <div className="flex flex-col gap-2">
              <span className="text-[9px] font-black uppercase text-slate-500">Finished Status</span>
              <div className="flex gap-1">
                 {finished.map((f: boolean, i: number) => (
                   <div key={i} className={`w-6 h-6 rounded flex items-center justify-center text-[10px] font-black ${f ? 'bg-emerald-500 text-slate-900' : 'bg-slate-700 text-slate-500'}`}>
                     {i}
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>

      <div className="text-center max-w-2xl px-6">
         <h3 className="text-2xl font-semibold text-slate-100 mb-2 leading-tight">
           {snapshot.message}
         </h3>
         <p className="text-xs font-mono text-slate-500 uppercase tracking-widest">
            Phase: {snapshot.phase}
         </p>
      </div>
    </div>
  );
};

export default BankersVisualizer;
