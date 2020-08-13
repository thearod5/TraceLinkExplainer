import React, { useState } from "react";
import styled from "styled-components";
import {
  FamilyColors,
  WordDescriptor,
  WordDescriptors,
} from "../../../../shared/types/Trace";
import ArtifactToolbar from "./ArtifactToolbar";

function createWords(
  words: WordDescriptor[],
  sizeSelected: boolean,
  defaultSize: number,
  familyColors: FamilyColors,
  colorSelected: boolean
) {
  return words.map((word: WordDescriptor, wordIndex: Number) => {
    const wordId = `${word.word}:${wordIndex}`;
    const wordSize = calculateWordSize(word.weight, sizeSelected, defaultSize);
    const wordColor =
      word.family in familyColors && colorSelected
        ? familyColors[word.family]
        : defaultColor;
    if (word.word === "\n") {
      return <br key={wordId}></br>;
    }
    return (
      <Word
        key={wordId}
        style={{ fontSize: `${wordSize}em`, color: wordColor }}
      >
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

      <div className="textAlignLeft">
        <div className="sizeFull padLight overflowScroll">{body}</div>
      </div>
    </div>
  );
}

const ToolbarHeightPercentage = 15;

const ToolbarContainer = styled.div`
  height: ${ToolbarHeightPercentage}%;
`;

const Word = styled.pre`
  display: inline-block;
  word-wrap: initial;
`;
