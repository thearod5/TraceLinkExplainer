import { Backdrop, Dialog, DialogTitle } from "@material-ui/core";
import CancelIcon from '@material-ui/icons/Cancel';
import CloseIcon from '@material-ui/icons/Close';
import React, { useState } from "react";
import { Relationships, Word, Words } from "../../../shared/types/Trace";
import { DEFAULT_FONT_COLOR } from "./ArtifactAccordion";

interface ArtifactWordsProps {
  words: Words;
  families: Relationships;
  colorSelected: boolean;
  sizeSelected: boolean;
  defaultSize: number;
  selectedWord: Word | null;
  setSelectedWord: ((newValue: null | Word) => void) | null
}

export default function ArtifactWords(props: ArtifactWordsProps) {

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
      {createWordModal(open, handleClose, props.selectedWord, props.families)}
    </div>
  );
}

type WordCallback = (word: Word) => void

function createWords(
  words: Words,
  selectedWord: Word | null,
  colorSelected: boolean,
  sizeSelected: boolean,
  defaultSize: number,
  clickHandler: WordCallback | null,
  handleClose: () => void
) {
  return words.map((word: Word, wordIndex: number) => WordComponent({
    word, selectedWord, colorSelected, sizeSelected, defaultSize, wordIndex, clickHandler, handleClose
  }));
}

interface WordProps {
  word: Word
  colorSelected: boolean
  sizeSelected: boolean
  defaultSize: number
  selectedWord: Word | null
  wordIndex: number
  clickHandler: WordCallback | null;
  handleClose: () => void
}

function WordComponent(props: WordProps) { //TODO: Rename to Word after BEND model renamed from Word 
  const HAS_FAMILY = props.word.relationshipIds.length > 0

  const wordId = `${props.word.word}:${props.wordIndex}`;
  if (props.word.word === "\n") {
    return <br key={wordId}></br>;
  }
  const familyIntersection = props.selectedWord !== null ? props.selectedWord.relationshipIds.filter(value => props.word.relationshipIds.includes(value)) : []
  const isSelectedWord = props.selectedWord !== null && (props.word.word === props.selectedWord.word)
  const isSelectedFamily = familyIntersection.length > 0

  const WORD_COLOR = props.word.color
  let border;
  if (isSelectedWord) {
    border = `3px solid ${WORD_COLOR}`
  } else if (isSelectedFamily) {
    border = `1px solid ${WORD_COLOR}`
  } else {
    border = "none"
  }

  const fontSize = props.sizeSelected ? props.word.size : props.defaultSize
  const fontColor = props.colorSelected ? props.word.color : DEFAULT_FONT_COLOR
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
      onClick={() => HAS_FAMILY && props.clickHandler !== null ? props.clickHandler(props.word) : null}
    >
      {props.word.word}
    </pre>
  );
}

function createWordModal(
  open: boolean,
  handleClose: () => void,
  word: Word | null,
  families: Relationships
) {
  if (word === null)
    return null

  return (
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
      <div className="padLight">
        {createRelationshipDescription(families.filter(family => word.relationshipIds.includes(family.title)))}
      </div>
    </Dialog >
  )
}

function createRelationshipDescription(family: Relationships) {

  return <p className="padLight ">test</p>
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
