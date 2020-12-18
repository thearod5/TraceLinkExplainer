import React, { useContext } from 'react'
import { NumberSetter } from '../../../../constants'
import { createDefaultWordDescriptors, getDefaultRelationshipColors, getDefaultRelationships } from '../../../../operations/artifacts/WordCreator'
import { Artifact } from '../../../../operations/types/Project'
import { WordDescriptors } from '../../../../operations/types/Trace'
import { createDefaultArtifactAccordion, createTracedArtifactAccordion } from '../../artifact/accordion/ArtifactAccordionFactory'
import { TraceContext } from '../../types'

/* Responsibility: Displays all selected artifacts for either Search or Target artifacts.
 *
 */

interface TracedArtifactAccordionDisplayProps {
  artifacts: Artifact[]
  onItemClick: NumberSetter
  traceWords: WordDescriptors | null
  selectedIndex: number
  onSelectIndex: NumberSetter
  isLoading: boolean
}

export function SelectedArtifactsContainer (props: TracedArtifactAccordionDisplayProps) {
  const { trace } = useContext(TraceContext)
  const { relationships, relationshipColors } = trace
  const { artifacts, onSelectIndex, selectedIndex, traceWords, isLoading } = props

  return (
    <div className="sizeFull overflowScroll">      {
      artifacts.map((artifact, index) => {
        if (index === selectedIndex) {
          const defaultAccordion = relationships === null || relationshipColors === null
          return createTracedArtifactAccordion(
            defaultAccordion ? createDefaultWordDescriptors(artifact.body) : traceWords,
            defaultAccordion ? getDefaultRelationships() : relationships,
            artifact,
            defaultAccordion ? getDefaultRelationshipColors() : relationshipColors,
            true,
            () => onSelectIndex(index),
            () => onSelectIndex(-1),
            isLoading
          )
        } else {
          return createDefaultArtifactAccordion(
            artifact,
            artifact.body,
            false,
            () => onSelectIndex(index),
            () => onSelectIndex(-1))
        }
      })
    }
    </div>)
}
