import React, { useContext, useState } from 'react'
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
}

export function SelectedArtifactsContainer (props: TracedArtifactAccordionDisplayProps) {
  const { trace } = useContext(TraceContext)
  const { relationships, relationshipColors } = trace

  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <div className="heightFull overflowScroll">      {
      props.artifacts.map((artifact, index) => {
        if (index === selectedIndex) {
          const defaultAccordion = relationships === null || relationshipColors === null
          return createTracedArtifactAccordion(
            defaultAccordion ? createDefaultWordDescriptors(artifact.body) : props.traceWords,
            defaultAccordion ? getDefaultRelationships() : relationships,
            artifact,
            defaultAccordion ? getDefaultRelationshipColors() : relationshipColors,
            true,
            () => setSelectedIndex(index),
            () => setSelectedIndex(-1), false
          )
        } else {
          return createDefaultArtifactAccordion(
            artifact,
            artifact.body,
            false,
            () => setSelectedIndex(index),
            () => setSelectedIndex(-1))
        }
      })
    }
    </div>)
}
