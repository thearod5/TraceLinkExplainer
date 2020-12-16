import React from 'react'
import Graph from 'react-graph-vis'
import { getEdgesInFamilies, getNodesInFamilies } from '../../operations/artifacts/WordCreator'
import { Relationships } from '../../operations/types/Trace'
import NetworkGraphOptions from './ExplanationGraphSettings'

interface TraceExplanationProps {
  families: Relationships
}

export function Explanation (props: TraceExplanationProps) {
  const nodes = getNodesInFamilies(props.families)
  const edges = getEdgesInFamilies(props.families)

  return (
    <div className="flewRowCentered">
      <Graph
        graph={{ nodes, edges }}
        options={NetworkGraphOptions}
      />
    </div>)
}
