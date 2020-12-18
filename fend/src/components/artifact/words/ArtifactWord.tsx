
import React, { useContext } from 'react'
import { Relationships, WordDescriptorDisplay, Words } from '../../../types/Trace'
import { TraceContext } from '../../../types/TracedArtifacts'
import { ViewerWord } from './ArtifactWords'

interface ArtifactWordsProps {
  words: Words;
  families: Relationships;
  colorSelected: boolean;
  sizeSelected: boolean;
  defaultSize: number;
}

export default function ViewerWords (props: ArtifactWordsProps) {
  const { trace, setTrace } = useContext(TraceContext)
  const { selectedWord } = trace

  const { words, colorSelected, sizeSelected, defaultSize } = props

  const handleClose = () => setTrace({ ...trace, selectedWord: null })
  const handleOnClick: WordCallback = (word: WordDescriptorDisplay) => setTrace({ ...trace, selectedWord: word })

  const body = createWords(
    words,
    selectedWord,
    colorSelected,
    sizeSelected,
    defaultSize,
    handleOnClick,
    handleClose)
  return (
    <div className="textAlignLeft overflowScroll">
      <div className="sizeFull padSmall overflowScroll">{body}</div>
    </div>
  )
}

export type WordCallback = (word: WordDescriptorDisplay) => void

function createWords (
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
  }))
}
