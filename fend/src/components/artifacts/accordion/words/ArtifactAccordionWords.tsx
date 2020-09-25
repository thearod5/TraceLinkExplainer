
import React from "react";
import { Relationships, WordDescriptorDisplay, Words } from "../../../../shared/types/Trace";
import { WordModal } from "../TraceExplanation";
import { Word } from "./Word";

interface ArtifactWordsProps {
  words: Words;
  families: Relationships;
  colorSelected: boolean;
  sizeSelected: boolean;
  defaultSize: number;
  selectedWord: WordDescriptorDisplay | null;
  setSelectedWord: ((newValue: null | WordDescriptorDisplay) => void) | null
}

export default function ArtifactAccordionWords(props: ArtifactWordsProps) {

  const handleClose = () => props.setSelectedWord !== null ? props.setSelectedWord(null) : () => null

  const body = createWords(
    props.words,
    props.selectedWord,
    props.colorSelected,
    props.sizeSelected,
    props.defaultSize,
    props.setSelectedWord,
    handleClose);
  const open = props.selectedWord !== null
  return (
    <div className="textAlignLeft overflowScroll">
      <div className="sizeFull padLight overflowScroll">{body}</div>
      <WordModal
        open={open}
        handleClose={handleClose}
        selectedWord={props.selectedWord}
        families={props.families}
      />
    </div>
  );
}

export type WordCallback = (word: WordDescriptorDisplay) => void

function createWords(
  words: Words,
  selectedWord: WordDescriptorDisplay | null,
  colorSelected: boolean,
  sizeSelected: boolean,
  defaultSize: number,
  clickHandler: WordCallback | null,
  handleClose: () => void
) {
  return words.map((word: WordDescriptorDisplay, wordIndex: number) => Word({
    word, selectedWord, colorSelected, sizeSelected, defaultSize, wordIndex, clickHandler, handleClose
  }));
}




