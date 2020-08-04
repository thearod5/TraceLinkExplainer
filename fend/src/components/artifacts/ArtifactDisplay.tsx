import { Box } from "@material-ui/core";
import React, { useState } from "react";
import styled from "styled-components";
import { FamilyColors, WordDescriptors } from "../../../../shared/Dataset";
import ArtifactToolbar from "./ArtifactToolbar";

interface ArtifactDisplayProps {
  words: WordDescriptors;
  artifactType: string;
  artifactId: string;
  familyColors: FamilyColors;
}

const defaultColor = "black";
const fontSizeDelta = 0.1;

//TODO: Add field to props displaying if page header should be on left or right side.
//TODO: Add line that continues all the way after the page header to replicate trace link.

export default function ArtifactDisplay(props: ArtifactDisplayProps) {
  const [sizeSelected, setSizeSelected] = useState(true);
  const [colorSelected, setColorSelected] = useState(true);
  const [defaultSize, setDefaultSize] = useState(1);

  const body = props.words.map((word) => {
    const wordSize = sizeSelected ? word.weight + defaultSize : defaultSize;
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
      <ArtifactToolbar
        title={props.artifactId}
        colorSelected={colorSelected}
        sizeSelected={sizeSelected}
        setSizeSelected={setSizeSelected}
        setColorSelected={setColorSelected}
        handleZoomIn={() => setDefaultSize(defaultSize + fontSizeDelta)}
        handleZoomOut={() => setDefaultSize(defaultSize - fontSizeDelta)}
      />
      <WordContainer>
        <div className="paddingContainer">{body}</div>
      </WordContainer>
    </ArtifactDisplayContainer>
  );
}

const ArtifactDisplayContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const WordContainer = styled.div`
  font-size: 1em;
  text-align: left;
  width: 100%;
  height: 80%;
  word-wrap: break-word;
`;

const Word = styled.pre`
  display: inline-block;
  word-wrap: break-word;
`;
