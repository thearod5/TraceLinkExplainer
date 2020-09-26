
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedWord } from "../../../redux/actions";
import { getSelectedWord } from "../../../redux/selectors";
import { Relationships, WordDescriptorDisplay, Words } from "../../../shared/types/Trace";
import { ViewerWord } from "./ViewerWord";

interface ArtifactWordsProps {
  words: Words;
  families: Relationships;
  colorSelected: boolean;
  sizeSelected: boolean;
  defaultSize: number;
}

export default function ViewerWords(props: ArtifactWordsProps) {
  const selectedWord = useSelector(getSelectedWord)
  const dispatch = useDispatch()

  const { words, colorSelected, sizeSelected, defaultSize } = props

  const handleClose = () => dispatch(setSelectedWord(null))
  const handleOnClick: WordCallback = (word: WordDescriptorDisplay) => dispatch(setSelectedWord(word))

  const body = createWords(
    words,
    selectedWord,
    colorSelected,
    sizeSelected,
    defaultSize,
    handleOnClick,
    handleClose);
  return (
    <div className="textAlignLeft overflowScroll">
      <div className="sizeFull padSmall overflowScroll">{body}</div>
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
  return words.map((word: WordDescriptorDisplay, wordIndex: number) => ViewerWord({
    word, selectedWord, colorSelected, sizeSelected, defaultSize, wordIndex, clickHandler, handleClose
  }));
}




