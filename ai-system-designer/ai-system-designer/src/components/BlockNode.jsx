/**
 * BlockNode component - Custom React Flow node for block diagram layout
 */

import { Handle, Position } from "reactflow";

export function BlockNode({ data }) {
  return (
    <>
      <Handle type="target" position={Position.Left} />
      <div className="node-content">
        <span className="node-icon">{data.icon}</span>
        <span className="node-label">{data.label}</span>
      </div>
      <Handle type="source" position={Position.Right} />
    </>
  );
}
