import React from "react";
import { WordDescriptorDisplay } from "../../../../shared/types/Trace";
import { DEFAULT_FONT_COLOR } from "../../../constants";
import { WordCallback } from "./ArtifactAccordionWords";

export interface WordProps {
  word: WordDescriptorDisplay
  colorSelected: boolean
  sizeSelected: boolean
  defaultSize: number
  selectedWord: WordDescriptorDisplay | null
  wordIndex: number
  clickHandler: WordCallback | null;
  handleClose: () => void
}

export function Word(props: WordProps) {
  const HAS_FAMILY = props.word.relationshipIds.length > 0;

  const wordId = `${props.word.word}:${props.wordIndex}`;
  if (props.word.word === "\n") {
    return <br key={wordId}></br>;
  }
  const familyIntersection = props.selectedWord !== null ? props.selectedWord.relationshipIds.filter(value => props.word.relationshipIds.includes(value)) : [];
  const isSelectedFamily = familyIntersection.length > 0;

  const WORD_COLOR = props.word.color;
  let border;
  if (isSelectedFamily) {
    border = `3px solid ${WORD_COLOR}`;
  } else {
    border = "none";
  }

  const handleClick = () => {
    if (HAS_FAMILY && props.clickHandler !== null)
      props.clickHandler(props.word)
  }

  const fontSize = props.sizeSelected ? props.word.size : props.defaultSize;
  const fontColor = props.colorSelected ? WORD_COLOR : DEFAULT_FONT_COLOR;
  return (
    <pre
      key={wordId}
      style={{
        fontSize: `${fontSize}em`,
        color: fontColor,
        display: "inline-block",
        wordWrap: "initial",
        borderBottom: border
      }}
      onClick={handleClick}
    >
      {props.word.word}
    </pre>
  );
}
