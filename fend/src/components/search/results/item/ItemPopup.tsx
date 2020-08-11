import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import styled from "styled-components";
import { Artifact } from "../../../../shared/types/Dataset";

interface ItemPopupProps {
  selectSource: () => void;
  handleClose: () => void;
  open: boolean;
  artifact: Artifact;
}

export default function ItemPopup(props: ItemPopupProps) {
  const isCode = props.artifact.type === "Classes";
  const createBodyContainer = isCode ? (
    <SyntaxHighlighter
      language="java"
      style={docco}
      customStyle={{ backgroundColor: "white" }}
    >
      {props.artifact.body}
    </SyntaxHighlighter>
  ) : (
    <RegularTextContainer>{props.artifact.body}</RegularTextContainer>
  );

  return (
    <Dialog
      fullWidth
      maxWidth={isCode ? "lg" : "sm"}
      onClose={props.handleClose}
      aria-labelledby="customized-dialog-title"
      open={props.open}
    >
      <DialogTitle id="customized-dialog-title">
        {props.artifact.id}
      </DialogTitle>
      <DialogContent dividers>{createBodyContainer}</DialogContent>
      <DialogActions>
        <ActionContainer>
          <IconButton aria-label="exit">
            <CloseIcon onClick={props.handleClose} />
          </IconButton>
          <IconButton aria-label="select">
            <DoneIcon onClick={props.selectSource} />
          </IconButton>
        </ActionContainer>
      </DialogActions>
    </Dialog>
  );
}

const ActionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
`;

const RegularTextContainer = styled.p`
  white-space: pre-wrap;
`;
