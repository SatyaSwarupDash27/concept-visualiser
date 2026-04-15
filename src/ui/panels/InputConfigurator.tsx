import React, { useState, useEffect } from 'react';
import type { InputConfigDescriptor } from '../../core/types/algorithm.types';

export const InputConfigurator: React.FC<{ 
  config: InputConfigDescriptor, 
  onApply: (data: any) => void 
}> = ({ config, onApply }) => {
  const [size, setSize] = useState(config.defaultSize || 10);
  const [customInput, setCustomInput] = useState(JSON.stringify(config.options, null, 2));

  // Auto-trigger default input on load
  useEffect(() => {
    if (config.options) {
      // If it's a simple string-based "custom", we might want to pass the string directly
      // but most of our plugins currently expect the object or a field within it.
      // We'll pass the whole options object as the default.
      onApply(config.options);
    } else {
      handleGenerate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.options]);

  const handleGenerate = () => {
    if (config.type === 'numberArray') {
      const arr = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
      onApply(arr);
    } else if (config.type === 'graph') {
      // Very basic graph generation logic for demonstration
      const nodes = Array.from({ length: size }, (_, i) => ({
        id: `N${i}`,
        x: Math.random() * 600 + 100,
        y: Math.random() * 300 + 100,
        label: `${i}`
      }));
      const edges = [];
      for (let i = 0; i < size; i++) {
        const targets = Math.floor(Math.random() * 2) + 1;
        for (let j = 0; j < targets; j++) {
          const to = Math.floor(Math.random() * size);
          if (to !== i) {
            edges.push({ from: `N${i}`, to: `N${to}` });
          }
        }
      }
      onApply({ nodes, edges });
    } else if (config.type === 'processes') {
      const processes = Array.from({ length: size }, (_, i) => ({
        id: `${i + 1}`,
        arrivalTime: Math.floor(Math.random() * size),
        burstTime: Math.floor(Math.random() * 5) + 2,
        remainingTime: 0
      }));
      onApply({ processes, quantum: config.options?.quantum || 2 });
    } else if (config.type === 'pageSequence') {
      const pages = Array.from({ length: size }, () => Math.floor(Math.random() * 10));
      onApply({ pages, frameCount: config.options?.frameCount || 3 });
    } else if (config.type === 'custom') {
      try {
        const parsed = JSON.parse(customInput);
        onApply(parsed);
      } catch (e) {
        console.error("Invalid JSON input");
      }
    }
  };

  return (
    <div className="flex items-center gap-4 bg-slate-900/50 p-2 rounded-xl border border-slate-700/50">
      <div className="flex items-center gap-2 px-3">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Size</label>
        <input 
          type="number" 
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
          min={config.min}
          max={config.max}
          className="w-16 bg-slate-800 border border-slate-600 rounded px-2 py-1 text-sm font-mono text-center outline-none focus:border-blue-500 transition-colors"
        />
      </div>

      {config.type === 'custom' && (
        <div className="flex items-center gap-2">
           <textarea 
             value={customInput}
             onChange={(e) => setCustomInput(e.target.value)}
             className="w-48 h-8 bg-slate-800 border border-slate-600 rounded px-2 py-1 text-[10px] font-mono text-slate-300 outline-none focus:border-blue-500 transition-colors resize-none"
             placeholder="JSON configuration..."
           />
        </div>
      )}
      <button 
        onClick={handleGenerate}
        className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1.5 rounded-lg text-sm font-bold shadow-md transition-colors"
      >
        Generate Random
      </button>
    </div>
  );
};
