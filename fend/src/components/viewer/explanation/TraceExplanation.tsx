import { Backdrop, Dialog, DialogTitle } from "@material-ui/core";
import CancelIcon from '@material-ui/icons/Cancel';
import CloseIcon from '@material-ui/icons/Close';
import React, { useState } from 'react';
import Graph from "react-graph-vis";
import { useDispatch, useSelector } from "react-redux";
import { setTrace } from "../../../redux/actions";
import { getTrace } from "../../../redux/selectors";
import { getEdgesInFamilies, getNodesInFamilies } from "../../../shared/artifacts/WordCreator";
import { Relationships } from "../../../shared/types/Trace";

const NETWORK_GRAPH_OPTIONS = {
  edges: {
    color: "#000000"
  },
  width: "100%",
  height: "400px",
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

  return (
    <Dialog
      open={true}
      fullWidth
      maxWidth={"sm"}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      className='debug'
    >
      <HoverClose handleClose={handleClose} />
      <DialogTitle className="displayInlineBlock textAlignCenter">{selectedWord.word}</DialogTitle>
      <div className="padSmall">
        <TraceExplanation families={relationships.filter(family => selectedWord.relationshipIds.includes(family.title))} />
      </div>
    </Dialog >
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

interface HoverCloseProps {
  handleClose: () => void
}

function HoverClose(props: HoverCloseProps) {
  const [hover, setHover] = useState(false)

  const regularElement = <CloseIcon onClick={props.handleClose} />
  const hoverElement = <CancelIcon onClick={props.handleClose} />
  return (
    <div
      className='flexRow justifyContentFlexEnd debugBlue'
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {hover ? hoverElement : regularElement}
    </div>)
}