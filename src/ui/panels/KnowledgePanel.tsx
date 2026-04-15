import React from 'react';
import type { AlgorithmMeta } from '../../core/types/algorithm.types';

export const KnowledgePanel: React.FC<{ meta: AlgorithmMeta }> = ({ meta }) => {
  return (
    <div className="bg-slate-900/50 backdrop-blur-md border md:border-l border-t border-slate-700/50 p-6 flex flex-col gap-6 overflow-y-auto w-full h-full">
      <div>
        <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
          {meta.name}
          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700 uppercase tracking-widest font-bold">
            {meta.category}
          </span>
        </h2>
        <p className="text-slate-400 mt-3 text-sm leading-relaxed">{meta.description}</p>
      </div>

      <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-800/80">
        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-4">Complexity</h3>
        <table className="w-full text-left text-sm font-mono">
          <thead>
            <tr className="text-slate-500 border-b border-slate-800">
              <th className="pb-2">Type</th>
              <th className="pb-2 text-green-400">Best</th>
              <th className="pb-2 text-amber-400">Average</th>
              <th className="pb-2 text-red-400">Worst</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            <tr>
              <td className="py-2 text-slate-400">Time</td>
              <td className="py-2">{meta.complexity.time.best}</td>
              <td className="py-2">{meta.complexity.time.average}</td>
              <td className="py-2">{meta.complexity.time.worst}</td>
            </tr>
            <tr>
              <td className="py-2 text-slate-400">Space</td>
              <td className="py-2">{meta.complexity.space.best}</td>
              <td className="py-2">{meta.complexity.space.average}</td>
              <td className="py-2">{meta.complexity.space.worst}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-3">Use Cases</h3>
        <ul className="space-y-2">
          {meta.useCases.map((useCase: string, i: number) => (
            <li key={i} className="text-sm text-slate-400 flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">✦</span>
              {useCase}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
