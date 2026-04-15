import React from 'react';
import type { Metrics } from '../../core/types/snapshot.base';
import { motion, AnimatePresence } from 'framer-motion';

export const MetricsDashboard: React.FC<{ metrics: Metrics }> = ({ metrics }) => {
  return (
    <div className="flex flex-wrap gap-4 items-center justify-center">
      <AnimatePresence>
        {Object.entries(metrics).map(([key, value]) => {
          if (value === undefined) return null;
          return (
            <motion.div
              layout
              key={key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900/80 border border-slate-700/50 px-4 py-3 rounded-2xl flex flex-col items-center justify-center min-w-[120px] shadow-lg"
            >
              <span className="text-[10px] uppercase font-black tracking-widest text-slate-500 mb-1">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </span>
              <motion.span 
                key={`${key}-${value}`}
                initial={{ scale: 1.5, color: '#3b82f6' }}
                animate={{ scale: 1, color: '#f8fafc' }}
                className="text-2xl font-mono font-bold"
              >
                {String(value)}
              </motion.span>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
