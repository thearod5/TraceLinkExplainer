import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import DoneIcon from '@material-ui/icons/Done'
import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { Artifact } from '../../../operations/types/Dataset'

interface SearchItemDialogProps {
  selectSource: () => void;
  handleClose: () => void;
  open: boolean;
  artifact: Artifact;
}

export default function SearchResultDialog (props: SearchItemDialogProps) {
  const isCode = props.artifact.type === 'code'
  const createBodyContainer = isCode ? (
    <SyntaxHighlighter
      language="java"
      style={docco}
      customStyle={{ backgroundColor: 'white' }}
    >
      {props.artifact.body}
    </SyntaxHighlighter>
  ) : (
    <p style={{ whiteSpace: 'pre-wrap' }}>{props.artifact.body}</p>
  )

  return (
    <Dialog
      fullWidth
      maxWidth={isCode ? 'lg' : 'sm'}
      onClose={props.handleClose}
      aria-labelledby="customized-dialog-title"
      open={props.open}
    >
      <DialogTitle id="customized-dialog-title">
        {props.artifact.name}
      </DialogTitle>
      <DialogContent dividers>{createBodyContainer}</DialogContent>
      <DialogActions>
        <div className="flexRowSpaceAround widthFull">
          <IconButton aria-label="exit" onClick={props.handleClose}>
            <CloseIcon />
          </IconButton>
          <IconButton aria-label="select" onClick={props.selectSource}>
            <DoneIcon />
          </IconButton>
        </div>
      </DialogActions>
    </Dialog>
  )
}
