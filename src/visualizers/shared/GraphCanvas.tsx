import { Stage, Layer, Circle, Line, Text, Group } from 'react-konva';
import type { GraphSnapshot } from '../../core/types/snapshot.dsa';

export function GraphCanvas({ snapshot }: { snapshot: GraphSnapshot }) {
  const { nodes, edges } = snapshot.structure;
  const hl = snapshot.highlights;

  const getStateColor = (state: string) => {
    switch (state) {
      case 'visited': return '#6366f1';
      case 'current': return '#3b82f6';
      case 'path': return '#06b6d4';
      default: return '#475569';
    }
  };

  return (
    <div className="bg-slate-900 rounded-lg overflow-hidden border border-slate-700 w-full flex justify-center">
      <Stage width={800} height={500}>
        <Layer>
          {edges.map((e, i) => {
            const fromNode = nodes.find((n) => n.id === e.from);
            const toNode = nodes.find((n) => n.id === e.to);
            if (!fromNode || !toNode) return null;

            const edgeId = `${e.from}→${e.to}`;
            const state = hl.edges[edgeId] || 'default';

            return (
              <Group key={i}>
                <Line
                  points={[fromNode.x, fromNode.y, toNode.x, toNode.y]}
                  stroke={getStateColor(state)}
                  strokeWidth={state !== 'default' ? 4 : 2}
                />
                {e.weight !== undefined && (
                  <Text
                    x={(fromNode.x + toNode.x) / 2}
                    y={(fromNode.y + toNode.y) / 2 - 12}
                    text={e.weight.toString()}
                    fill="#94a3b8"
                    fontSize={12}
                    fontStyle="bold"
                  />
                )}
              </Group>
            );
          })}
          {nodes.map((n) => {
            const state = hl.nodes[n.id] || 'default';
            // nodeLabels could be distances like { node1: 'dist: 5' }
            const label = snapshot.nodeLabels?.[n.id];
            
            return (
              <Group key={n.id} x={n.x} y={n.y}>
                <Circle 
                  radius={20} 
                  fill="#0f172a" 
                  stroke={getStateColor(state)} 
                  strokeWidth={3}
                />
                <Text text={n.label} fill="white" align="center" verticalAlign="middle" offsetX={n.label.length * 4} offsetY={6} />
                
                {label && (
                   <Text text={label} fill="#60a5fa" fontSize={10} x={22} y={-10} fontStyle="bold" />
                )}
              </Group>
            );
          })}
        </Layer>
      </Stage>
    </div>
  );
}
