import { motion, AnimatePresence } from 'framer-motion';
import type { LinkedListSnapshot } from '../../core/types/snapshot.dsa';

export function LinkedListView({ snapshot }: { snapshot: LinkedListSnapshot }) {
  const nodes = snapshot.structure;
  
  return (
    <div className="flex items-center gap-4 h-32 w-full justify-center">
      <AnimatePresence>
        {nodes.map((n, i) => {
          const state = snapshot.highlights.indices[i] || 'default';
          return (
            <motion.div
              layout
              key={n.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-4 h-16 rounded-md px-6 font-mono font-bold text-lg text-white border-2 border-slate-900 shadow-xl"
              style={{ backgroundColor: `var(--el-${state})` }}
            >
              {n.value}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
