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

const defaultSize = 1;
const defaultColor = "black";
//TODO: Add field to props displaying if page header should be on left or right side.
//TODO: Add line that continues all the way after the page header to replicate trace link.

export default function ArtifactDisplay(props: ArtifactDisplayProps) {
  const [sizeSelected, setSizeSelected] = useState(true);
  const [colorSelected, setColorSelected] = useState(true);

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
      <ArtifactDisplayContent>
        <ArtifactToolbar
          title={props.artifactId}
          colorSelected={colorSelected}
          sizeSelected={sizeSelected}
          setSizeSelected={setSizeSelected}
          setColorSelected={setColorSelected}
        />
      </ArtifactDisplayContent>
      <WordContainer>{body}</WordContainer>
    </ArtifactDisplayContainer>
  );
}

const WordContainer = styled.div`
  font-size: 1em;
  text-align: left;
  overflow-x: scroll;
`;

const ArtifactDisplayContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ArtifactDisplayContainer = styled(Box)`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Word = styled.pre`
  display: inline-block;
`;
