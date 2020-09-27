import { Accordion } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { useState } from "react";
import { createWords, getDefaultFamilyColors } from "../../../shared/artifacts/WordCreator";
import { RelationshipColors, Relationships, WordDescriptors, Words } from "../../../shared/types/Trace";
import { primaryColor } from "../../../styles/theme";
import { DEFAULT_FONT_COLOR, DEFAULT_FONT_SIZE, FONT_SIZE_DELTA } from "../../constants";
import ArtifactAccordionDetails from "./ArtifactAccordionDetails";
import ArtifactAccordionSummary from "./ArtifactAccordionSummary";
import { createToolbarIcons } from "./ArtifactAccordionToolbar";

/*
 * Accordion for TraceInformation. Manages state changes in accordion.
 */
const ACCORDION_MAX_HEIGHT = 600 //px

interface ArtifactAccordionProps {
  artifactType: string;
  artifactId: string;
  wordDescriptors: WordDescriptors | null;
  relationships: Relationships | null;
  relationshipColors: RelationshipColors | null;
  expanded: boolean;
  onExpand: () => void;
  onShrink: () => void;
}

export default function ArtifactAccordion(props: ArtifactAccordionProps) {
  const [sizeSelected, setSizeSelected] = useState(true);
  const [colorSelected, setColorSelected] = useState(true);
  const [fontSize, setFontSize] = useState(DEFAULT_FONT_SIZE);

  const { artifactId, expanded, onExpand,
    onShrink, relationships, relationshipColors, wordDescriptors,
  } = props

  const handleZoomIn = () => setFontSize(fontSize + FONT_SIZE_DELTA);
  const handleZoomOut = () => setFontSize(fontSize - FONT_SIZE_DELTA)

  const toolbarIcons: JSX.Element[] = createToolbarIcons(
    handleZoomIn,
    handleZoomOut,
    colorSelected,
    setColorSelected,
    sizeSelected,
    setSizeSelected)

  let words: Words | null;

  const colors = relationshipColors === null ? getDefaultFamilyColors() : relationshipColors
  const relationshipsToo = relationships === null ? [] : relationships

  if (wordDescriptors !== null) {
    words = createWords(
      wordDescriptors,
      relationshipsToo,
      fontSize,
      colors,
      DEFAULT_FONT_COLOR
    )
  } else {
    words = null;
  }

  const handleAccordionExpandClick = (event: React.ChangeEvent<{}>, newExpanded: boolean) => {
    const callBack = newExpanded ? onExpand : onShrink
    callBack()
  };

  return (
    <Accordion
      className="flexColumn"
      TransitionProps={{ unmountOnExit: true }}
      expanded={expanded}
      onChange={handleAccordionExpandClick}
    >
      <ArtifactAccordionSummary
        style={{ backgroundColor: primaryColor }}
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
      />
    </Accordion>
  );
}