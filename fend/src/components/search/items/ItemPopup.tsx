import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import styled from "styled-components";
import { Artifact } from "../../../../../shared/Dataset";
import { getCurrentStep } from "../../../redux/selectors";
import { SELECT_TARGET_STEP } from "../../../redux/stepmanager/constants";

interface ItemPopupProps {
  selectSource: () => void;
  handleClose: () => void;
  open: boolean;
  artifact: Artifact;
}

export default function ItemPopup(props: ItemPopupProps) {
  const activeStep = useSelector(getCurrentStep);
  const isCode = props.artifact.type === "Classes";
  const createBodyContainer = isCode ? (
    <SyntaxHighlighter language="java" style={docco}>
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
          <Button
            variant="contained"
            autoFocus
            onClick={props.handleClose}
            color="secondary"
          >
            Exit
          </Button>
          <Button
            variant="contained"
            autoFocus
            onClick={props.selectSource}
            color="primary"
          >
            Select As {activeStep === SELECT_TARGET_STEP ? "Target" : "Source"}
          </Button>
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
