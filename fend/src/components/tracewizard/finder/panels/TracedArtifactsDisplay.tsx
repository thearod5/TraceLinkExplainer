import React, { useContext } from 'react'
import { NumberSetter } from '../../../../constants'
import { createDefaultWordDescriptors, getDefaultRelationshipColors, getDefaultRelationships } from '../../../../operations/artifacts/WordCreator'
import { Artifact } from '../../../../operations/types/Dataset'
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
}

export function SelectedArtifactsContainer (props: TracedArtifactAccordionDisplayProps) {
  const { trace } = useContext(TraceContext)
  const { relationships, relationshipColors } = trace

  return (
    <div className="heightFull overflowScroll">      {
      props.artifacts.map((artifact, index) => {
        if (index === props.selectedIndex) {
          const defaultAccordion = relationships === null || relationshipColors === null
          return createTracedArtifactAccordion(
            defaultAccordion ? createDefaultWordDescriptors(artifact.body) : props.traceWords,
            defaultAccordion ? getDefaultRelationships() : relationships,
            artifact,
            defaultAccordion ? getDefaultRelationshipColors() : relationshipColors,
            true,
            () => props.onSelectIndex(index),
            () => props.onSelectIndex(-1), false
          )
        } else {
          return createDefaultArtifactAccordion(
            artifact,
            artifact.body,
            false,
            () => props.onSelectIndex(index),
            () => props.onSelectIndex(-1))
        }
      })
    }
    </div>)
}
