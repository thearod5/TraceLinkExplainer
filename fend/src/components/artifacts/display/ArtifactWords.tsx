import { Backdrop, Dialog, DialogTitle } from "@material-ui/core";
import CancelIcon from '@material-ui/icons/Cancel';
import CloseIcon from '@material-ui/icons/Close';
import React, { useState } from "react";
import { Word, Words } from "../../../shared/types/Trace";
interface ArtifactWordsProps {
  words: Words;
}

export default function ArtifactWords(props: ArtifactWordsProps) {
  const [selectedWord, setSelectedWord] = useState<null | Word>(null)

  const handleClose = () => setSelectedWord(null)

  const body = createWords(props.words, selectedWord, setSelectedWord, handleClose);
  const open = selectedWord !== null
  return (
    <div className="textAlignLeft overflowScroll">
      <div className="sizeFull padLight overflowScroll">{body}</div>
      {createWordModal(open, handleClose, selectedWord)}
    </div>
  );
}

type WordCallback = (word: Word) => void

function createWords(
  words: Words,
  selectedWord: Word | null,
  selectWord: WordCallback,
  handleClose: () => void
) {
  return words.map((word: Word, wordIndex: number) => WordComponent({ word, selectedWord, wordIndex, selectWord, handleClose }));
}

interface WordProps {
  word: Word
  selectedWord: Word | null
  wordIndex: number
  selectWord: WordCallback
  handleClose: () => void
}

function WordComponent(props: WordProps) { //TODO: Rename to Word after BEND model renamed from Word 
  const CONTAINS_DESCRIPTION = props.word.description !== ""
  const [hover, setHover] = useState(false);

  const wordId = `${props.word.word}:${props.wordIndex}`;
  if (props.word.word === "\n") {
    return <br key={wordId}></br>;
  }
  const isSelectedWord = props.selectedWord !== null && (props.word.word === props.selectedWord.word)
  const isSelectedFamily = props.selectedWord !== null && (props.word.family === props.selectedWord.family)

  const WORD_COLOR = props.word.color
  let border;
  if ((hover && CONTAINS_DESCRIPTION)) {
    border = `3px solid ${WORD_COLOR}`
  } else if (isSelectedWord) {
    border = `3px solid ${WORD_COLOR}`
  } else if (isSelectedFamily) {
    border = `1px solid ${WORD_COLOR}`
  } else {
    border = "none"
  }

  return (
    <pre
      key={wordId}
      style={{
        fontSize: `${props.word.size}em`,
        color: props.word.color,
        display: "inline-block",
        wordWrap: "initial",
        borderBottom: border
      }}
      onClick={() => CONTAINS_DESCRIPTION ? props.selectWord(props.word) : null}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {props.word.word}
    </pre>
  );
}

function createWordModal(open: boolean, handleClose: () => void, word: Word | null) {
  return (
    word === null ? null :
      <Dialog
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <HoverClose handleClose={handleClose} />
        <DialogTitle className="displayInlineBlock textAlignCenter">{word.word}</DialogTitle>
        <p className="padLight ">{word.description.split("\n").map(subDescription => <p>{subDescription}</p>)}</p>
      </Dialog >
  )
}

interface HoverCloseProps {
  handleClose: () => void
}

function HoverClose(props: HoverCloseProps) {
  const [hover, setHover] = useState(false)

  const regularElement = <CloseIcon style={{ position: "relative", left: "85%", top: "5px" }} onClick={props.handleClose} />
  const hoverElement = <CancelIcon style={{ position: "relative", left: "85%", top: "5px" }} onClick={props.handleClose} />
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {hover ? hoverElement : regularElement}
    </div>)
}
