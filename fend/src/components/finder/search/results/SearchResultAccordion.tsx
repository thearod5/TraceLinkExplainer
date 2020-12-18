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
import React, { useContext, useEffect, useState } from 'react'
import { ArtifactCallback } from '../../../../types/constants'
import { Artifact } from '../../../../types/Project'
import { Relationships } from '../../../../types/Trace'
import ViewerWords from '../../../artifact/words/ArtifactWord'
import { createArtifactDisplayModel } from '../../../artifact/words/WordCreator'
import { ArtifactSelectContext } from '../../ArtifactSetFinder'
import SearchResultDialog from './SearchResultDialog'

interface SearchResultAccordionProps {
  artifact: Artifact;
  families: Relationships;
  onSelectArtifact: ArtifactCallback;
  onRemoveArtifact: ArtifactCallback;
}

export default function SearchResultAccordion (props: SearchResultAccordionProps) {
  const { artifactsSelected } = useContext(ArtifactSelectContext)
  const { artifact, families, onSelectArtifact, onRemoveArtifact } = props
  const [expanded, setExpanded] = useState(false)
  const [checked, setChecked] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)

  const onSelectArtifactWrapper = () => {
    const newState = !checked
    setChecked(newState)
    const clickCallback = checked ? onRemoveArtifact : onSelectArtifact
    clickCallback(artifact)
  }

  const onDialogAccept = () => {
    setDialogOpen(false)
    setExpanded(false)
    setChecked(true)
    onSelectArtifact(artifact)
  }

  const onDialogExit = () => {
    setDialogOpen(false)
    setExpanded(false)
  }

  useEffect(() => {
    if (!checked) {
      if (artifactsSelected.some(a => a.id === artifact.id)) {
        setChecked(true)
      }
    }
  }, [checked, artifact.id, artifactsSelected])

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
          control={<Checkbox checked={checked} onClick={onSelectArtifactWrapper} color={'primary'}/>}
          label={artifact.name}
        />
      </AccordionSummary>

      <AccordionDetails style={{ maxHeight: '300px' }}>
        <Box
          className="overflowScroll roundBorder padSmall"
          style={{ width: '90%', maxHeight: '300px' }}
          boxShadow={3}
        >
          <ViewerWords
            words={createArtifactDisplayModel(artifact).words}
            families={families}
            colorSelected={true}
            sizeSelected={false}
            defaultSize={1}
          />
        </Box>

        <div className="centeredColumn padSmall" >
          <IconButton aria-label="expand" onClick={() => setDialogOpen(!dialogOpen)}>
            <FullscreenIcon/>
          </IconButton>
        </div>
      </AccordionDetails>

      <SearchResultDialog
        handleClose={onDialogExit}
        open={dialogOpen}
        artifact={artifact}
        selectSource={onDialogAccept}
      />
    </Accordion>
  )
}
