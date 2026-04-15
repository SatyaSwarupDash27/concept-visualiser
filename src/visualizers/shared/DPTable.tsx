import type { MatrixSnapshot } from '../../core/types/snapshot.dsa';

export function DPTable({ snapshot }: { snapshot: MatrixSnapshot }) {
  const table = snapshot.structure;
  const hl = snapshot.highlights;
  const rowLabels = snapshot.rowLabels || [];
  const colLabels = snapshot.colLabels || [];

  const getStateColorClass = (state: string) => {
    switch(state) {
      case 'comparing': return 'bg-amber-500/80 text-white ring-2 ring-amber-400 z-10';
      case 'sorted': return 'bg-emerald-600 text-white shadow-[0_0_10px_rgba(16,185,129,0.3)]';
      case 'highlighted': return 'bg-blue-600/40 text-blue-200 border-blue-500/50';
      case 'current': return 'bg-indigo-600 text-white animate-pulse';
      default: return 'bg-slate-800/40 text-slate-400 border-slate-700/50';
    }
  };

  return (
    <div className="overflow-auto border border-slate-700/50 rounded-2xl p-6 bg-slate-900/80 backdrop-blur-sm max-h-[500px] w-full shadow-2xl">
      <table className="border-collapse w-full text-center font-mono text-sm">
        <thead>
          <tr>
            {colLabels.length > 0 && <th className="p-3 border-b-2 border-slate-700"></th>}
            {colLabels.map((h: string, i: number) => (
              <th key={i} className="p-3 border-b-2 border-slate-700 text-slate-500 font-black uppercase text-[10px] tracking-widest">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.map((row, rIdx) => (
            <tr key={rIdx}>
              {rowLabels.length > 0 && (
                <td className="p-3 border-r-2 border-slate-700 text-slate-500 font-black uppercase text-[10px] tracking-widest bg-slate-900/50">{rowLabels[rIdx]}</td>
              )}
              {row.map((cell, cIdx) => {
                const state = hl.cells[`${rIdx},${cIdx}`] || 'default';
                return (
                  <td key={cIdx} className={`p-4 border border-slate-700/30 transition-all duration-300 ${getStateColorClass(state)}`}>
                    {cell}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
