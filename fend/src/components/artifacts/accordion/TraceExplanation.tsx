import React from 'react';
import Graph from "react-graph-vis";
import { getEdgesInFamilies, getNodesInFamilies } from "../../../shared/artifacts/WordCreator";
import { Relationships } from "../../../shared/types/Trace";

const NETWORK_GRAPH_OPTIONS = {
  edges: {
    color: "#000000"
  },
  width: "90%",
  height: "400px",
  clickToUse: true.valueOf,
  hierarchical: {
    enabled: true,
    levelSeparation: 150,
    nodeSpacing: 200,
    treeSpacing: 200, //distance between independant trees
    direction: 'RL',        // UD, DU, LR, RL
    sortMethod: 'directed',  // hubsize, directed
    shakeTowards: 'leaves'  // roots, leaves
  },
  interaction: {
    dragNodes: true,
    dragView: true
  }
};

interface TraceExplanationProps {
  families: Relationships
}

export function TraceExplanation(props: TraceExplanationProps) {
  const nodes = getNodesInFamilies(props.families)
  const edges = getEdgesInFamilies(props.families)

  return (
    <div className="flewRowCentered">
      <Graph
        graph={{ nodes, edges }}
        options={NETWORK_GRAPH_OPTIONS}
      />
    </div>)
}