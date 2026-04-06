import { useState } from "react";
import { MarkerType } from "reactflow";
import { Header } from "./components/Header";
import { Diagram } from "./components/Diagram";
import { SidePanel } from "./components/SidePanel";
import { generateDesign } from "./utils/apiService";
import { getLayoutedElements } from "./utils/layoutEngine";
import { getNodeIcon, getNodeStyle } from "./constants/nodeConfig";

function App() {
  const [prompt, setPrompt] = useState("");
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [loading, setLoading] = useState(false);

  /**
   * Transform API response data to ReactFlow diagram nodes and edges
   */
  const transformToFlow = (data) => {
    const nodes = data.components.map((comp) => ({
      id: comp.id,
      type: "block",
      data: {
        label: comp.label,
        description: comp.description,
        icon: getNodeIcon(comp.label),
      },
      position: { x: 0, y: 0 },
      style: {
        padding: 0,
        borderRadius: "12px",
        fontWeight: "600",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        width: "320px",
        height: "90px",
        ...getNodeStyle(comp.label),
      },
    }));

    const edges = data.connections.map((conn, i) => ({
      id: `e${i}`,
      source: conn.source,
      target: conn.target,
      animated: false,
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
      style: {
        strokeWidth: 1,
        stroke: "#e8e8e8",
        opacity: 0.6,
      },
      labelStyle: { backgroundColor: "#fff", fillOpacity: 1 },
    }));

    return getLayoutedElements(nodes, edges);
  };

  /**
   * Generate system design from prompt
   */
  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    try {
      const data = await generateDesign(prompt);
      const { nodes: layoutNodes, edges: layoutEdges } = transformToFlow(data);
      setNodes(layoutNodes);
      setEdges(layoutEdges);
      setSelectedNode(null);
    } catch (error) {
      alert(error.message || "Failed to generate design. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle node click in diagram
   */
  const handleNodeClick = (_, node) => {
    setSelectedNode(node);
  };

  return (
    <div className="app-container">
      <Header
        prompt={prompt}
        onPromptChange={setPrompt}
        onGenerate={handleGenerate}
        loading={loading}
      />
      <div className="app-main">
        <Diagram nodes={nodes} edges={edges} onNodeClick={handleNodeClick} />
        <SidePanel selectedNode={selectedNode} />
      </div>
    </div>
  );
}

export default App;
