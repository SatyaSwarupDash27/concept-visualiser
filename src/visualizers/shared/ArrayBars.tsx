import { motion } from 'framer-motion';
import type { SortSnapshot } from '../../core/types/snapshot.dsa';

export function ArrayBars({ snapshot }: { snapshot: SortSnapshot }) {
  const maxVal = Math.max(...snapshot.structure, 1);

  return (
    <div className="flex items-end justify-center gap-1 h-64 w-full">
      {snapshot.structure.map((value, i) => {
        const state = snapshot.highlights.indices[i] || 'default';

        return (
          <motion.div
            key={i} // Using index because duplicate values might jitter
            layout
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="w-8 rounded-t-md transition-colors duration-200 flex items-end justify-center pb-2"
            style={{ 
              height: `${(value / maxVal) * 100}%`,
              backgroundColor: `var(--el-${state})`
            }}
          >
            <span className="text-xs font-mono font-bold text-white mix-blend-difference">{value}</span>
          </motion.div>
        );
      })}
    </div>
  );
}
