
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Relationships, WordDescriptorDisplay, Words } from '../../../operations/types/Trace'
import { setSelectedWord } from '../../../redux/actions'
import { getSelectedWord } from '../../../redux/selectors'
import { ArtifactDisplaySettings } from '../accordion/ArtifactAccordion'
import { ArtifactWord } from './ArtifactWord'

interface ArtifactWordsProps {
  words: Words;
  families: Relationships;
  settings: ArtifactDisplaySettings;
}

export default function ArtifactWordContainer (props: ArtifactWordsProps) {
  const selectedWord = useSelector(getSelectedWord)
  const dispatch = useDispatch()

  const { words, settings } = props
  const { colorSelected, sizeSelected, fontSize } = settings

  const handleClose = () => dispatch(setSelectedWord(null))
  const handleOnClick: WordCallback = (word: WordDescriptorDisplay) => dispatch(setSelectedWord(word))

  const body = createWords(
    words,
    selectedWord,
    colorSelected,
    sizeSelected,
    fontSize,
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
  return words.map((word: WordDescriptorDisplay, wordIndex: number) => ArtifactWord({
    word, selectedWord, colorSelected, sizeSelected, defaultSize, wordIndex, clickHandler, handleClose
  }))
}
