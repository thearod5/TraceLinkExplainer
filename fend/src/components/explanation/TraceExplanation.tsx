import React from 'react'
import Graph from 'react-graph-vis'
import { useDispatch, useSelector } from 'react-redux'
import { getEdgesInFamilies, getNodesInFamilies } from '../../operations/artifacts/WordCreator'
import { Relationships } from '../../operations/types/Trace'
import { setTrace } from '../../redux/actions'
import { getTrace } from '../../redux/selectors'
import { primaryColor, secondaryColor } from '../../styles/theme'
import ViewerModal from './ViewerModal'

const NETWORK_GRAPH_LENGTH = '600px'
const NETWORK_GRAPH_OPTIONS = {
  edges: {
    color: primaryColor
  },
  nodes: {
    color: secondaryColor
  },
  width: NETWORK_GRAPH_LENGTH,
  height: NETWORK_GRAPH_LENGTH,
  layout: {
    randomSeed: 42,
    hierarchical: {
      enabled: true,
      levelSeparation: 200,
      nodeSpacing: 100,
      treeSpacing: 200, // distance between independant trees
      direction: 'LR', // UD, DU, LR, RL
      sortMethod: 'directed' // hubsize, directed
    }
  },
  interaction: {
    dragNodes: true
  }
}

interface WordModalProps {
  open: boolean
}

export function WordModal (
  props: WordModalProps
) {
  const trace = useSelector(getTrace)
  const { selectedWord, relationships } = trace
  const dispatch = useDispatch()

  if (selectedWord === null || relationships === null || relationships === null) { return null }

  const handleClose = () => {
    dispatch(setTrace({ ...trace, selectedWord: null }))
  }

  const body = (
    <div className="padSmall">
      <TraceExplanation families={relationships.filter(relationship => selectedWord.relationshipIds.includes(relationship.title))} />
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

export function TraceExplanation (props: TraceExplanationProps) {
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
