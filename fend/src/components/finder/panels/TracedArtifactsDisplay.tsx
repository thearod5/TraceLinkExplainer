import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createDefaultArtifactAccordion, createTracedArtifactAccordion } from '../artifact/accordion/ArtifactAccordionFactory'
import { setSelectedSourceIndex, setSelectedTargetIndex } from '../../../redux/actions'
import { getSelectedSourceIndex, getSelectedSources, getSelectedTargetIndex, getSelectedTargets, getSourceWords, getTargetWords, getTrace } from '../../../redux/selectors'
import { createDefaultWordDescriptors, getDefaultRelationshipColors, getDefaultRelationships } from '../../../operations/artifacts/WordCreator'

/* Responsibility: Displays all selected artifacts for either Search or Target artifacts.
 *
 */

interface TracedArtifactAccordionDisplayProps {
  type: 'SOURCE' | 'TARGET'
}

export function SelectedArtifactsContainer (props: TracedArtifactAccordionDisplayProps) {
  const trace = useSelector(getTrace)
  const { type } = props
  const { relationships, relationshipColors } = trace
  const index = type === 'SOURCE' ? 0 : 1

  const artifactWords = [getSourceWords, getTargetWords]
  const artifactSelectors = [getSelectedSources, getSelectedTargets]
  const selectors = [getSelectedSourceIndex, getSelectedTargetIndex]
  const setters = [setSelectedSourceIndex, setSelectedTargetIndex]

  const dispatch = useDispatch()
  const selectedIndex = useSelector(selectors[index])
  const artifacts = useSelector(artifactSelectors[index])
  const traceWords = useSelector(artifactWords[index])

  const onSetIndex = (artifactIndex: number) => dispatch(setters[index](artifactIndex))
  return (
    <div className="heightFull overflowScroll"> {
      artifacts.map((artifact, index) => {
        if (index === selectedIndex) {
          const defaultAccordion = relationships === null || relationshipColors === null
          return createTracedArtifactAccordion(
            defaultAccordion ? createDefaultWordDescriptors(artifact.body) : traceWords,
            defaultAccordion ? getDefaultRelationships() : relationships,
            artifact,
            defaultAccordion ? getDefaultRelationshipColors() : relationshipColors,
            true,
            () => onSetIndex(index),
            () => onSetIndex(-1)
          )
        } else {
          return createDefaultArtifactAccordion(
            artifact,
            artifact.body,
            false,
            () => onSetIndex(index),
            () => onSetIndex(-1))
        }
      })
    }
    </div>)
}