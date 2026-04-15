import { NavLink } from 'react-router-dom';
import { registry } from '../../core/registry/algorithmRegistry';
import type { AlgorithmPlugin } from '../../core/types/algorithm.types';

export const AlgorithmSidebar: React.FC<{ domain: 'dsa' | 'os' }> = ({ domain }) => {
  const algorithms = registry.getByDomain(domain);
  
  // Group by category
  const grouped = algorithms.reduce((acc, algo) => {
    if (!acc[algo.meta.category]) acc[algo.meta.category] = [];
    acc[algo.meta.category].push(algo);
    return acc;
  }, {} as Record<string, AlgorithmPlugin<any, any>[]>);

  return (
    <div className="w-72 bg-slate-900/80 backdrop-blur-xl border-r border-slate-800 h-full flex flex-col">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 tracking-tight uppercase leading-tight">
          Concept <br/> Visualiser
        </h1>
        <div className="flex gap-2 mt-4 p-1 bg-slate-950 rounded-lg">
          <NavLink to="/dsa" className={({isActive}) => `flex-1 text-center py-1.5 rounded-md text-sm font-bold transition-all ${isActive ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}>DSA</NavLink>
          <NavLink to="/os" className={({isActive}) => `flex-1 text-center py-1.5 rounded-md text-sm font-bold transition-all ${isActive ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}>OS</NavLink>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide">
        {Object.entries(grouped).map(([category, algos]: [string, AlgorithmPlugin<any, any>[]]) => (
          <div key={category}>
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3 px-2">
              {category}
            </h3>
            <div className="space-y-1">
              {algos.map((algo: AlgorithmPlugin<any, any>) => (
                <NavLink 
                  key={algo.id} 
                  to={`/${domain}/${algo.id}`}
                  className={({isActive}) => `block w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive 
                      ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' 
                      : 'text-slate-300 hover:bg-slate-800/50 hover:text-white border border-transparent'
                  }`}
                >
                  {algo.meta.name}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
