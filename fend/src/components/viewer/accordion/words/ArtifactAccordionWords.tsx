
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTrace } from "../../../../redux/actions";
import { getSelectedWord, getTrace } from "../../../../redux/selectors";
import { Relationships, Trace, WordDescriptorDisplay, Words } from "../../../../shared/types/Trace";
import { Word } from "./Word";

interface ArtifactWordsProps {
  words: Words;
  families: Relationships;
  colorSelected: boolean;
  sizeSelected: boolean;
  defaultSize: number;
}

export default function ArtifactAccordionWords(props: ArtifactWordsProps) {
  const trace: Trace = useSelector(getTrace)
  const selectedWord = useSelector(getSelectedWord)
  const dispatch = useDispatch()

  const handleClose = () => dispatch(setTrace({ ...trace, selectedWord: null }))
  const setSelectedWord: WordCallback = (word: WordDescriptorDisplay) => dispatch(setTrace({ ...trace, selectedWord: word }))

  const body = createWords(
    props.words,
    selectedWord,
    props.colorSelected,
    props.sizeSelected,
    props.defaultSize,
    setSelectedWord,
    handleClose);
  return (
    <div className="textAlignLeft overflowScroll">
      <div className="sizeFull padLight overflowScroll">{body}</div>
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




