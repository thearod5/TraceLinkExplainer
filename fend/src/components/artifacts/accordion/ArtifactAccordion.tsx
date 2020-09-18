import { Accordion } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { useState } from "react";
import { createWords } from "../../../shared/artifacts/WordCreator";
import { Families, FamilyColors, Word, WordDescriptors, Words } from "../../../shared/types/Trace";
import { primaryColor } from "../../../styles/theme";
import ArtifactAccordionDetails from "./ArtifactAccordionDetails";
import ArtifactAccordionSummary from "./ArtifactAccordionSummary";
import { createToolbarIcons } from "./ToolbarIcons";

/*
 * Accordion for TraceInformation. Manages state changes in accordion.
 */

export const DEFAULT_FONT_COLOR = "black";
const FONT_SIZE_DELTA = 0.2;
const ACCORDION_MAX_HEIGHT = 500 //px
const DEFAULT_FONT_SIZE = 1;
const SIZE_SELECTED_DEFAULT_VALUE = true;
const COLOR_SELECTED_DEFAULT_VALUE = true;

interface ArtifactAccordionProps {
  artifactType: string;
  artifactId: string;
  words: WordDescriptors;
  families: Families;
  familyColors: FamilyColors;
  expanded: boolean;
  onExpand: () => void;
  onShrink: () => void;
}

export default function ArtifactAccordion(props: ArtifactAccordionProps) {
  const [sizeSelected, setSizeSelected] = useState(SIZE_SELECTED_DEFAULT_VALUE);
  const [colorSelected, setColorSelected] = useState(COLOR_SELECTED_DEFAULT_VALUE);
  const [fontSize, setFontSize] = useState(DEFAULT_FONT_SIZE);
  const [selectedWord, setSelectedWord] = useState<Word | null>(null)

  const handleZoomIn = () => setFontSize(fontSize + FONT_SIZE_DELTA);
  const handleZoomOut = () => setFontSize(fontSize - FONT_SIZE_DELTA)

  const toolbarIcons: JSX.Element[] = createToolbarIcons(
    handleZoomIn,
    handleZoomOut,
    colorSelected,
    setColorSelected,
    sizeSelected,
    setSizeSelected)

  const words: Words = createWords(
    props.words,
    props.families,
    fontSize,
    props.familyColors,
    DEFAULT_FONT_COLOR
  );

  const handleAccordionExpandClick = (event: React.ChangeEvent<{}>, newExpanded: boolean) => {
    const callBack = newExpanded ? props.onExpand : props.onShrink
    callBack()
  };

  return (
    <Accordion
      className="flexColumn"
      TransitionProps={{ unmountOnExit: true }}
      expanded={props.expanded}
      onChange={handleAccordionExpandClick}
    >
      <ArtifactAccordionSummary
        style={{ backgroundColor: primaryColor }}
        expandIcon={<ExpandMoreIcon />}
        title={props.artifactId}
      />
      <ArtifactAccordionDetails
        style={{ maxHeight: `${ACCORDION_MAX_HEIGHT}px` }}
        words={words}
        families={props.families}
        colorSelected={colorSelected}
        sizeSelected={sizeSelected}
        fontSize={fontSize}
        selectedWord={selectedWord}
        setSelectedWord={setSelectedWord}
        toolbarIcons={toolbarIcons}
      />
    </Accordion>
  );
}
