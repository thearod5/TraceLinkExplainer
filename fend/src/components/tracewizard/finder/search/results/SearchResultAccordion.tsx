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
import { createArtifactDisplayModel } from '../../../../../operations/artifacts/WordCreator'
import { Artifact } from '../../../../../operations/types/Project'
import { Relationships } from '../../../../../operations/types/Trace'
import ViewerWords from '../../../artifact/words/ArtifactWord'
import { ArtifactClickAction } from '../types'
import SearchResultDialog from './SearchResultDialog'

interface SearchResultAccordionProps {
  artifact: Artifact;
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
    clickCallback(props.artifact)
    setChecked(!checked)
  }

  const handleDialogAccept = () => {
    setDialogOpen(false)
    setExpanded(false)
    setChecked(true)
    props.selectArtifact(props.artifact)
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
          label={props.artifact.name}
        />
      </AccordionSummary>

      <AccordionDetails style={{ maxHeight: '300px' }}>
        <Box
          className="overflowScroll roundBorder padSmall"
          style={{ width: '90%', maxHeight: '300px' }}
          boxShadow={3}
        >
          <ViewerWords
            words={createArtifactDisplayModel(props.artifact).words}
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
        artifact={props.artifact}
        selectSource={handleDialogAccept}
      />
    </Accordion>
  )
}
