import React from 'react';
import Graph from "react-graph-vis";
import { useDispatch, useSelector } from "react-redux";
import { setTrace } from "../../../redux/actions";
import { getTrace } from "../../../redux/selectors";
import { getEdgesInFamilies, getNodesInFamilies } from "../../../shared/artifacts/WordCreator";
import { Relationships } from "../../../shared/types/Trace";
import ViewerModal from "./ViewerModal";


const NETWORK_GRAPH_OPTIONS = {
  edges: {
    color: "#000000"
  },
  width: "600px",
  height: "600px",
  layout: {
    hierarchical: {
      enabled: true,
      levelSeparation: 250,
      nodeSpacing: 100,
      treeSpacing: 200, //distance between independant trees
      direction: 'LR',        // UD, DU, LR, RL
      sortMethod: 'directed',  // hubsize, directed
    },
  },
  interaction: {
    dragNodes: true,
    dragView: true
  }
};

interface WordModalProps {
  open: boolean
}

export function WordModal(
  props: WordModalProps
) {
  const trace = useSelector(getTrace)
  const { selectedWord, relationships } = trace
  const dispatch = useDispatch()

  if (selectedWord === null || relationships === null || relationships === null)
    return null

  const handleClose = () => {
    dispatch(setTrace({ ...trace, selectedWord: null }))
  }

  const body = (
    <div className="padSmall">
      <TraceExplanation families={relationships.filter(family => selectedWord.relationshipIds.includes(family.title))} />
    </div>)

  return (
    <ViewerModal
      title={selectedWord.word}
      open={props.open}
      handleClose={handleClose}
      body={body}
    />
  )
}

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

