import { Accordion } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import React from 'react'
import { RelationshipColors, Relationships, WordDescriptors } from '../../../../operations/types/Trace'
import { primaryColor } from '../../../../styles/theme'
import ArtifactAccordionDetails from './ArtifactAccordionDetails'
import ArtifactAccordionSummary from './ArtifactAccordionSummary'
import { useArtifactSettings } from './useArtifactSettings'

/*
 * Accordion for TraceInformation. Manages state changes in accordion.
 */
const ACCORDION_MAX_HEIGHT = 600 // px

export interface ArtifactAccordionProps {
  artifactType: string;
  artifactId: string;
  wordDescriptors: WordDescriptors | null;
  relationships: Relationships | null;
  relationshipColors: RelationshipColors | null;
  expanded: boolean;
  onExpand: () => void;
  onShrink: () => void;
  isLoading: boolean
}

export interface ArtifactDisplaySettings {
  sizeSelected: boolean;
  colorSelected:boolean;
  fontSize: number;
}

export default function ArtifactAccordion (props: ArtifactAccordionProps) {
  const { artifactId, expanded, relationships } = props

  const [words, artifactDisplaySettings, toolbarIcons] = useArtifactSettings(props)
  const { colorSelected, sizeSelected, fontSize } = artifactDisplaySettings

  const handleAccordionExpandClick = (event: React.ChangeEvent<{}>, newExpanded: boolean) => {
    const callBack = newExpanded ? props.onExpand : props.onShrink
    callBack()
  }

  return (
    <Accordion
      className="flexColumn"
      TransitionProps={{ unmountOnExit: true }}
      expanded={expanded}
      onChange={handleAccordionExpandClick}
    >
      <ArtifactAccordionSummary
        style={{ backgroundColor: primaryColor, color: 'white' }}
        expandIcon={<ExpandMoreIcon />}
        title={artifactId}
      />
      <ArtifactAccordionDetails
        style={{ maxHeight: `${ACCORDION_MAX_HEIGHT}px` }}
        words={words}
        families={relationships}
        colorSelected={colorSelected}
        sizeSelected={sizeSelected}
        fontSize={fontSize}
        toolbarIcons={toolbarIcons}
        isLoading={props.isLoading}
      />
    </Accordion>
  )
}
