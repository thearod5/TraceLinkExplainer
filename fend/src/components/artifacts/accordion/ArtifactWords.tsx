import { Backdrop, Dialog, DialogTitle } from "@material-ui/core";
import CancelIcon from '@material-ui/icons/Cancel';
import CloseIcon from '@material-ui/icons/Close';
import React, { useState } from "react";
import { Families, Family, Word, Words } from "../../../shared/types/Trace";
import { DEFAULT_FONT_COLOR } from "./ArtifactAccordion";

interface ArtifactWordsProps {
  words: Words;
  families: Families;
  colorSelected: boolean;
  sizeSelected: boolean;
  defaultSize: number;
}

export default function ArtifactWords(props: ArtifactWordsProps) {
  const [selectedWord, setSelectedWord] = useState<null | Word>(null)

  const handleClose = () => setSelectedWord(null)

  const body = createWords(
    props.words,
    selectedWord,
    props.colorSelected,
    props.sizeSelected,
    props.defaultSize,
    setSelectedWord,
    handleClose);
  const open = selectedWord !== null
  return (
    <div className="textAlignLeft overflowScroll">
      <div className="sizeFull padLight overflowScroll">{body}</div>
      {createWordModal(open, handleClose, selectedWord, props.families)}
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
  clickHandler: WordCallback,
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
  clickHandler: WordCallback
  handleClose: () => void
}

function WordComponent(props: WordProps) { //TODO: Rename to Word after BEND model renamed from Word 
  const HAS_FAMILY = props.word.families.length > 0
  const [hover, setHover] = useState(false);

  const wordId = `${props.word.word}:${props.wordIndex}`;
  if (props.word.word === "\n") {
    return <br key={wordId}></br>;
  }
  const familyIntersection = props.selectedWord !== null ? props.selectedWord.families.filter(value => props.word.families.includes(value)) : []
  const isSelectedWord = props.selectedWord !== null && (props.word.word === props.selectedWord.word)
  const isSelectedFamily = familyIntersection.length > 0

  const WORD_COLOR = props.word.color
  let border;
  if ((hover && HAS_FAMILY)) {
    border = `3px solid ${WORD_COLOR}`
  } else if (isSelectedWord) {
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
      onClick={() => HAS_FAMILY ? props.clickHandler(props.word) : null}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {props.word.word}
    </pre>
  );
}

function createWordModal(
  open: boolean,
  handleClose: () => void,
  word: Word | null,
  families: Families
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
        {word.families.map((familyId, familyIndex) => {
          return createRelationshipDescription(familyId, families[familyId], familyIndex + 1)
        })}
      </div>
    </Dialog >
  )
}

function createRelationshipDescription(familyId: string, family: Family, index: number) {
  const concepts = family.concepts.join(", ")
  let message;
  switch (family.type) {
    case "ROOT":
      message = <p>{index}. has the same root (<b>{familyId}</b>) as other words in the documents: {concepts}</p>
      break;
    case "CONCEPT":
      message = <p>{index}. is related to {concepts}</p>
      break;
    default:
      throw Error(`Unexpected type: ${family.type}`)
  }
  return <p className="padLight ">{message}</p>
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
