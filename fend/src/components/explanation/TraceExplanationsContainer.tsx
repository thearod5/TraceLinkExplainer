import React, { useContext } from 'react'
import { NumberSetter } from '../../constants'
import { createDefaultWordDescriptors, getDefaultRelationshipColors, getDefaultRelationships } from '../artifact/words/WordCreator'
import { Artifact } from '../../types/Project'
import { WordDescriptors } from '../../types/Trace'
import { createDefaultArtifactAccordion, createTraceExplanationAccordion } from '../artifact/accordion/ArtifactAccordionFactory'
import { TraceContext } from '../tracewizard/types'

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

export function TraceExplanationsContainer (props: TracedArtifactAccordionDisplayProps) {
  const { trace } = useContext(TraceContext)
  const { relationships, relationshipColors } = trace
  const { artifacts, onSelectIndex, selectedIndex, traceWords, isLoading } = props

  return (
    <div className="sizeFull overflowScroll">      {
      artifacts.map((artifact, index) => {
        if (index === selectedIndex) {
          const defaultAccordion = relationships === null || relationshipColors === null
          return createTraceExplanationAccordion(
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
