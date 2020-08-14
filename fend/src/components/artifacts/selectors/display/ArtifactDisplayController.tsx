import React, { useState } from "react";
import styled from "styled-components";
import { createWords } from "../../../../shared/artifacts/WordCreator";
import { FamilyColors, WordDescriptors } from "../../../../shared/types/Trace";
import ArtifactToolbar from "./ArtifactToolbar";
import ArtifactWords from "./ArtifactWords";

interface ArtifactDisplayProps {
  words: WordDescriptors;
  artifactType: string;
  artifactId: string;
  familyColors: FamilyColors;
  showToolbar: boolean;
}

export const defaultColor = "black";
const fontSizeDelta = 0.2;

//TODO: Add field to props displaying if page header should be on left or right side.
//TODO: Add line that continues all the way after the page header to replicate trace link.

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
    <div className="flexColumn sizeFull">
      {props.showToolbar ? (
        <ToolbarContainer>
          <ArtifactToolbar
            title={props.artifactId}
            colorSelected={colorSelected}
            sizeSelected={sizeSelected}
            setSizeSelected={setSizeSelected}
            setColorSelected={setColorSelected}
            handleZoomIn={() => setDefaultSize(defaultSize + fontSizeDelta)}
            handleZoomOut={() => setDefaultSize(defaultSize - fontSizeDelta)}
          />
        </ToolbarContainer>
      ) : null}

      <ArtifactWords words={words} />
    </div>
  );
}

const ToolbarHeightPercentage = 15;

const ToolbarContainer = styled.div`
  height: ${ToolbarHeightPercentage}%;
`;
