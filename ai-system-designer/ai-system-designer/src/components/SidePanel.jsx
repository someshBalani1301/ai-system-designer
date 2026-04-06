/**
 * SidePanel component - Displays selected node details
 */

export function SidePanel({ selectedNode }) {
  return (
    <div className="side-panel">
      {selectedNode ? (
        <div className="side-panel-content">
          <div className="node-details">
            <div className="node-details-header">
              <h3 className="node-details-title">{selectedNode.data.label}</h3>
              <span className="node-details-badge">Component</span>
            </div>
            {selectedNode.data.description && (
              <p className="node-details-description">
                {selectedNode.data.description}
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="side-panel-empty">
          <div>
            <p style={{ fontSize: "16px", marginBottom: "12px" }}>
              No component selected
            </p>
            <p style={{ fontSize: "13px", opacity: "0.7" }}>
              Click on any node in the diagram to view its details
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
