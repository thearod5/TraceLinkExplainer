import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  FormControlLabel,
  IconButton
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import FullscreenIcon from '@material-ui/icons/Fullscreen'
import React, { useState } from 'react'
import { Artifact } from '../../../../operations/types/Dataset'
import { Relationships, Words } from '../../../../operations/types/Trace'
import ViewerWords from '../../artifact/words/ArtifactWord'
import { ArtifactClickAction } from '../types'
import SearchResultDialog from './SearchResultDialog'

interface SearchResultAccordionProps {
  result: Artifact;
  words: Words;
  families: Relationships;
  selectArtifact: ArtifactClickAction;
  removeArtifact: ArtifactClickAction;
}

export default function SearchResultAccordion (props: SearchResultAccordionProps) {
  const [expanded, setExpanded] = useState(false)
  const [checked, setChecked] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleClose = () => {
    setDialogOpen(false)
    setExpanded(false)
  }

  const onClick = () => {
    const clickCallback = checked ? props.removeArtifact : props.selectArtifact
    clickCallback(props.result)
    setChecked(!checked)
  }

  const handleDialogAccept = () => {
    setDialogOpen(false)
    setExpanded(false)
    setChecked(true)
    props.selectArtifact(props.result)
  }

  const viewExpandedArtifactIcon = (
    <div className="centeredColumn padSmall" >
      <IconButton aria-label="expand" onClick={() => setDialogOpen(!dialogOpen)}>
        <FullscreenIcon/>
      </IconButton>
    </div>)

  return (
    <Accordion
      TransitionProps={{ unmountOnExit: true }}
      expanded={expanded}
      onChange={() => setExpanded(!expanded)}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-label="Expand">
        <FormControlLabel
          aria-label="Select"
          onClick={(event) => event.stopPropagation()} // stops opening of accordion
          onFocus={(event) => event.stopPropagation()}
          control={<Checkbox checked={checked} onClick={onClick} color={'primary'}/>}
          label={props.result.name}
        />
      </AccordionSummary>

      <AccordionDetails style={{ maxHeight: '300px' }}>
        <Box
          className="overflowScroll roundBorder padSmall"
          style={{ width: '90%', maxHeight: '300px' }}
          boxShadow={3}
        >
          <ViewerWords
            words={props.words}
            families={props.families}
            colorSelected={true}
            sizeSelected={false}
            defaultSize={1}
          />
        </Box>

        {viewExpandedArtifactIcon}
      </AccordionDetails>

      <SearchResultDialog
        handleClose={handleClose}
        open={dialogOpen}
        artifact={props.result}
        selectSource={handleDialogAccept}
      />
    </Accordion>
  )
}
