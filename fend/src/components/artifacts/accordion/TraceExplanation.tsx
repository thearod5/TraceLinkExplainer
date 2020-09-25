import { Backdrop, Dialog, DialogTitle } from "@material-ui/core";
import CancelIcon from '@material-ui/icons/Cancel';
import CloseIcon from '@material-ui/icons/Close';
import React, { useState } from 'react';
import Graph from "react-graph-vis";
import { getEdgesInFamilies, getNodesInFamilies } from "../../../shared/artifacts/WordCreator";
import { Relationships, WordDescriptorDisplay } from "../../../shared/types/Trace";

const NETWORK_GRAPH_OPTIONS = {
  edges: {
    color: "#000000"
  },
  width: "90%",
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
  open: boolean,
  handleClose: () => void,
  selectedWord: WordDescriptorDisplay | null,
  families: Relationships
}

export function WordModal(
  props: WordModalProps
) {
  if (props.selectedWord === null)
    return null

  return (
    <Dialog
      open={props.open}
      fullWidth
      maxWidth={"sm"}
      onClose={props.handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <HoverClose handleClose={props.handleClose} />
      <DialogTitle className="displayInlineBlock textAlignCenter">{props.selectedWord.word}</DialogTitle>
      <div className="padLight">
        <TraceExplanation families={props.families.filter(family => props.selectedWord?.relationshipIds.includes(family.title))} />
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

  const regularElement = <CloseIcon style={{ position: "relative", left: "85%", top: "5px" }} onClick={props.handleClose} />
  const hoverElement = <CancelIcon style={{ position: "relative", left: "85%", top: "5px" }} onClick={props.handleClose} />
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {hover ? hoverElement : regularElement}
    </div>)
}