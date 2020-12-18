import { useState } from 'react'
import { DEFAULT_FONT_COLOR, DEFAULT_FONT_SIZE, FONT_SIZE_DELTA, Icons } from '../../../constants'
import { Words } from '../../../types/Trace'
import { createWords } from '../words/WordCreator'
import { ArtifactAccordionProps, ArtifactDisplaySettings } from './ArtifactAccordion'
import { createToolbarIcons } from './ArtifactAccordionToolbar'

export function useArtifactSettings (props: ArtifactAccordionProps): [Words | null, ArtifactDisplaySettings, Icons] {
  const { wordDescriptors, relationships, relationshipColors } = props
  const [sizeSelected, setSizeSelected] = useState(true)
  const [colorSelected, setColorSelected] = useState(true)
  const [fontSize, setFontSize] = useState(DEFAULT_FONT_SIZE)

  const handleZoomIn = () => setFontSize(fontSize + FONT_SIZE_DELTA)
  const handleZoomOut = () => setFontSize(fontSize - FONT_SIZE_DELTA)

  let words: Words | null
  if (wordDescriptors !== null && relationships != null && relationshipColors !== null) {
    words = createWords(
      wordDescriptors,
      relationships,
      fontSize,
      relationshipColors,
      DEFAULT_FONT_COLOR
    )
  } else {
    words = null
  }

  const toolbarIcons: Icons = createToolbarIcons(
    handleZoomIn,
    handleZoomOut,
    colorSelected,
    setColorSelected,
    sizeSelected,
    setSizeSelected)
  const artifactDisplaySettings: ArtifactDisplaySettings = { colorSelected, sizeSelected, fontSize }

  return [words, artifactDisplaySettings, toolbarIcons]
}
