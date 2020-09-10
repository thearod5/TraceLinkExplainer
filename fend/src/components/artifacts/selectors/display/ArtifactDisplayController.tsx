import React, { useState } from "react";
import { createWords } from "../../../../shared/artifacts/WordCreator";
import { FamilyColors, WordDescriptors } from "../../../../shared/types/Trace";
import ArtifactToolbar from "./ArtifactToolbar";
import ArtifactWords from "./ArtifactWords";
import { AccordionDetails, AccordionSummary, Accordion } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { primaryColor } from "../../../../styles/theme";

interface ArtifactDisplayProps {
  words: WordDescriptors;
  artifactType: string;
  artifactId: string;
  familyColors: FamilyColors;
  showToolbar: boolean;
}

export const defaultColor = "black";
const fontSizeDelta = 0.2;
const ToolbarHeightPercentage = 15;

export default function ArtifactDisplayController(props: ArtifactDisplayProps) {
  const [sizeSelected, setSizeSelected] = useState(true);
  const [colorSelected, setColorSelected] = useState(true);
  const [defaultSize, setDefaultSize] = useState(1);

  const words = createWords(
    props.words,
    sizeSelected,
    colorSelected,
    defaultSize,
    props.familyColors,
    defaultColor
  );

  return (
    <Accordion
      className="flexColumn"
    >
      {props.showToolbar ? (
        <AccordionSummary
          style={{
            height: `${ToolbarHeightPercentage}%`,
            backgroundColor: primaryColor
          }}
          expandIcon={<ExpandMoreIcon />}
        >
          <ArtifactToolbar
            title={props.artifactId}
            colorSelected={colorSelected}
            sizeSelected={sizeSelected}
            setSizeSelected={setSizeSelected}
            setColorSelected={setColorSelected}
            handleZoomIn={() => setDefaultSize(defaultSize + fontSizeDelta)}
            handleZoomOut={() => setDefaultSize(defaultSize - fontSizeDelta)}
          />
        </AccordionSummary>
      ) : null}
      <AccordionDetails>
        <ArtifactWords words={words} />
      </AccordionDetails>
    </Accordion>
  );
}
