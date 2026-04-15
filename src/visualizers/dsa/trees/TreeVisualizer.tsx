// visualizers/dsa/trees/TreeVisualizer.tsx
import React from 'react';
import { Stage, Layer, Circle, Line, Text, Group } from 'react-konva';
import type { TreeSnapshot } from '../../../core/types/snapshot.dsa';
import { layoutTree, flattenTree } from '../../../core/utils/treeUtils';

const TreeVisualizer: React.FC<{ snapshot: TreeSnapshot }> = ({ snapshot }) => {
  const treeRoot = snapshot.structure;
  const positioned = layoutTree(treeRoot);
  const { nodes, edges } = flattenTree(positioned);

  const getStateColor = (state: string) => {
    switch (state) {
      case 'comparing': return '#fbbf24'; // Amber
      case 'swapping': return '#f43f5e'; // Rose
      case 'sorted': return '#10b981'; // Emerald
      case 'current': return '#3b82f6'; // Blue
      case 'highlighted': return '#6366f1'; // Indigo
      default: return '#334155'; // Slate 700
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-8 space-y-8">
      <div className="w-full max-w-5xl bg-slate-900/40 rounded-3xl p-4 border border-slate-700/30 shadow-2xl backdrop-blur-sm relative overflow-hidden flex justify-center items-center">
        <Stage width={800} height={450}>
          <Layer>
            {/* Edges */}
            {edges.map((edge) => {
              const state = snapshot.highlights.edges[edge.id] || 'default';
              return (
                <Line
                  key={edge.id}
                  points={[edge.from.x, edge.from.y, edge.to.x, edge.to.y]}
                  stroke={getStateColor(state)}
                  strokeWidth={2}
                  opacity={0.6}
                />
              );
            })}

            {/* Nodes */}
            {nodes.map((node) => {
              const state = snapshot.highlights.nodes[node.id] || 'default';
              return (
                <Group key={node.id} x={node.x} y={node.y}>
                  <Circle 
                    radius={22} 
                    fill="#0f172a" 
                    stroke={getStateColor(state)} 
                    strokeWidth={3}
                    shadowBlur={state !== 'default' ? 10 : 0}
                    shadowColor={getStateColor(state)}
                  />
                  <Text 
                    text={node.value.toString()} 
                    fill="white" 
                    fontSize={14} 
                    fontStyle="bold"
                    align="center" 
                    verticalAlign="middle" 
                    offsetX={node.value.toString().length * 4} 
                    offsetY={7} 
                  />
                  
                  {/* Pointers (e.g., L/R balance factor) */}
                  {snapshot.balanceFactors?.[node.id] !== undefined && (
                    <Text 
                      text={`bf:${snapshot.balanceFactors[node.id]}`} 
                      fill="#94a3b8" 
                      fontSize={10} 
                      x={25} 
                      y={-10}
                    />
                  )}
                </Group>
              );
            })}

            {/* Abstract Pointers (e.g., "Pivot", "Min") */}
            {snapshot.highlights.pointers?.map((p, idx) => {
              const node = nodes.find(n => n.id === p.nodeId);
              if (!node) return null;
              return (
                <Group key={idx} x={node.x} y={node.y - 45}>
                   <Text text="▼" fill="#3b82f6" fontSize={10} align="center" x={-4} />
                   <Text text={p.label} fill="#3b82f6" fontSize={10} fontStyle="bold" align="center" x={-(p.label.length * 2.5)} y={-12} />
                </Group>
              );
            })}
          </Layer>
        </Stage>
      </div>

      <div className="text-center max-w-2xl px-6">
         <h3 className="text-2xl font-semibold text-slate-100 mb-2 leading-tight">
           {snapshot.message}
         </h3>
         {snapshot.rotationType && (
           <span className="bg-rose-500/20 text-rose-400 border border-rose-500/30 px-3 py-1 rounded-full text-xs font-black uppercase tracking-tighter animate-pulse">
             Rotation: {snapshot.rotationType}
           </span>
         )}
      </div>
    </div>
  );
};

export default TreeVisualizer;
