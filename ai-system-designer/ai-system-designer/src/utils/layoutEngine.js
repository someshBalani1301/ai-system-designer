/**
 * Layout engine for automatic node positioning using Dagre
 */

import dagre from "dagre";
import { NODE_DIMENSIONS, LAYOUT_CONFIG } from "../constants/nodeConfig.js";

export const getLayoutedElements = (nodes, edges) => {
  const g = new dagre.graphlib.Graph();
  g.setDefaultEdgeLabel(() => ({}));

  g.setGraph({
    rankdir: LAYOUT_CONFIG.rankdir,
    nodesep: LAYOUT_CONFIG.nodesep,
    ranksep: LAYOUT_CONFIG.ranksep,
  });

  nodes.forEach((node) => {
    g.setNode(node.id, {
      width: NODE_DIMENSIONS.width,
      height: NODE_DIMENSIONS.height,
    });
  });

  edges.forEach((edge) => {
    g.setEdge(edge.source, edge.target);
  });

  dagre.layout(g);

  return {
    nodes: nodes.map((node) => {
      const pos = g.node(node.id);
      return {
        ...node,
        position: {
          x: pos.x - NODE_DIMENSIONS.width / 2,
          y: pos.y - NODE_DIMENSIONS.height / 2,
        },
      };
    }),
    edges,
  };
};
