import React from 'react'
import { createDefaultWordDescriptors } from '../../shared/artifacts/WordCreator'
import { Artifact } from '../../shared/types/Dataset'
import { NumberSetter } from '../constants'
import { getDefaultArtifactDisplay } from './accordion/ArtifactAccordionFactory'


interface TraceSourceArtifactDisplayProps {
  selectedSources: Artifact[],
  setIndex: NumberSetter,
  sourceIndex: number
}

export function TraceSourceArtifactDisplay(
  props: TraceSourceArtifactDisplayProps
) {
  const { selectedSources, setIndex, sourceIndex } = props
  const sourceArtifactDisplays = selectedSources.map(
    (artifact: Artifact, index: number) =>
      getDefaultArtifactDisplay(
        artifact,
        createDefaultWordDescriptors(artifact.body),
        index === sourceIndex,
        () => setIndex(sourceIndex),
        () => setIndex(-1)
      ))
  return (
    <div className='heightFull overflowScroll'>{sourceArtifactDisplays}</div>
  )
}