import { Box } from "@material-ui/core";
import React, { useState } from "react";
import styled from "styled-components";
import { FamilyColors, WordDescriptors } from "../../../../../shared/Dataset";
import ArtifactToolbar from "../ArtifactToolbar";

interface ArtifactDisplayProps {
  words: WordDescriptors;
  artifactType: string;
  artifactId: string;
  familyColors: FamilyColors;
  showToolbar: boolean;
}

const defaultColor = "black";
const fontSizeDelta = 0.1;

//TODO: Add field to props displaying if page header should be on left or right side.
//TODO: Add line that continues all the way after the page header to replicate trace link.

export default function ArtifactDisplay(props: ArtifactDisplayProps) {
  const [sizeSelected, setSizeSelected] = useState(true);
  const [colorSelected, setColorSelected] = useState(true);
  const [defaultSize, setDefaultSize] = useState(1);

  const calcWordSize = (weight: number) =>
    sizeSelected ? weight + defaultSize : defaultSize;

  const body = props.words.map((word) => {
    const wordSize = calcWordSize(word.weight);
    const wordColor =
      word.family in props.familyColors && colorSelected
        ? props.familyColors[word.family]
        : defaultColor;
    if (word.word === "\n") {
      return <br></br>;
    }
    return (
      <Word style={{ fontSize: `${wordSize}em`, color: wordColor }}>
        {word.word}
      </Word>
    );
  });
  return (
    <ArtifactDisplayContainer>
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

      <WordContainer boxShadow={3}>
        <div className="paddingContainer">{body}</div>
      </WordContainer>
    </ArtifactDisplayContainer>
  );
}

const ToolbarHeightPercentage = 15;

const ArtifactDisplayContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const ToolbarContainer = styled.div`
  height: ${ToolbarHeightPercentage}%;
`;

const WordContainer = styled(Box)`
  font-size: 1em;
  text-align: left;
  width: 100%;
  height: ${100 - ToolbarHeightPercentage}%;
  overflow-y: scroll;
  word-wrap: initial;
`;

const Word = styled.pre`
  display: inline-block;
  word-wrap: initial;
`;
