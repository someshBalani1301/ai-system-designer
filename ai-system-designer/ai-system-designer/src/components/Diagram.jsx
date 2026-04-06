/**
 * Diagram component - ReactFlow diagram with controls
 */

import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  MarkerType,
} from "reactflow";
import { BlockNode } from "./BlockNode";

export function Diagram({ nodes, edges, onNodeClick }) {
  return (
    <div className="flow-container">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodeClick={onNodeClick}
        nodeTypes={{ block: BlockNode }}
        fitView
      >
        <Background gap={20} />
        <Controls />
        {nodes.length > 0 && <MiniMap />}
      </ReactFlow>
    </div>
  );
}
