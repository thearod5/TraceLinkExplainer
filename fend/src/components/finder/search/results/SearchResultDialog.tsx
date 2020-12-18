import {
  Box,
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
import { Artifact } from '../../../../types/Project'

interface SearchItemDialogProps {
  selectSource: () => void;
  handleClose: () => void;
  open: boolean;
  artifact: Artifact;
}

export default function SearchResultDialog (props: SearchItemDialogProps) {
  const isCode = props.artifact.type === 'code'
  const bodyContainer = isCode ? (
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

  const dialogOptionsBar = (
    <div className="flexRowSpaceAround widthFull">

      <IconButton aria-label="select" onClick={props.selectSource} color='primary'>
        <DoneIcon />
      </IconButton>
    </div>)

  const dialogHeader = (
    <DialogTitle>
      <Box className='flexRow justifyContentSpaceBetween'>{props.artifact.name}
        <IconButton aria-label="exit" onClick={props.handleClose}>
          <CloseIcon />
        </IconButton>
      </Box>

    </DialogTitle>
  )

  return (
    <Dialog
      fullWidth
      maxWidth={isCode ? 'lg' : 'sm'}
      onClose={props.handleClose}
      aria-labelledby="artifact-expanded-view"
      open={props.open}
    >
      {dialogHeader}
      <DialogContent dividers>{bodyContainer}</DialogContent>
      <DialogActions>
        {dialogOptionsBar}
      </DialogActions>
    </Dialog>
  )
}
