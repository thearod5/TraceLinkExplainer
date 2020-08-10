import { Box } from "@material-ui/core";
import React, { useState } from "react";
import styled from "styled-components";
import {
  FamilyColors,
  WordDescriptor,
  WordDescriptors,
} from "../../../../../shared/Dataset";
import ArtifactToolbar from "../ArtifactToolbar";

function createWords(
  words: WordDescriptor[],
  sizeSelected: boolean,
  defaultSize: number,
  familyColors: FamilyColors,
  colorSelected: boolean
) {
  return words.map((word: WordDescriptor) => {
    const wordSize = calculateWordSize(word.weight, sizeSelected, defaultSize);
    const wordColor =
      word.family in familyColors && colorSelected
        ? familyColors[word.family]
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
}

interface ArtifactDisplayProps {
  words: WordDescriptors;
  artifactType: string;
  artifactId: string;
  familyColors: FamilyColors;
  showToolbar: boolean;
}

const defaultColor = "black";
const fontSizeDelta = 0.2;

function calculateWordSize(
  weight: number,
  sizeSelected: boolean,
  defaultSize: number
) {
  return sizeSelected ? weight + defaultSize : defaultSize;
}

//TODO: Add field to props displaying if page header should be on left or right side.
//TODO: Add line that continues all the way after the page header to replicate trace link.

export default function ArtifactDisplay(props: ArtifactDisplayProps) {
  const [sizeSelected, setSizeSelected] = useState(true);
  const [colorSelected, setColorSelected] = useState(true);
  const [defaultSize, setDefaultSize] = useState(1);

  const body = createWords(
    props.words,
    sizeSelected,
    defaultSize,
    props.familyColors,
    colorSelected
  );

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
  height: 100%;
  overflow-y: scroll;
  word-wrap: initial;
  border-radius: 5px;
`;

const Word = styled.pre`
  display: inline-block;
  word-wrap: initial;
`;
