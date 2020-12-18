import React, { useContext, useEffect, useState } from 'react'
import { getTraceInformation } from '../../../api/trace'
import { AppContext } from '../../../App'
import { UNSELECTED_INDEX } from '../../../constants'
import { initializeEmptyTrace } from '../../../operations/initializers'
import { Artifact } from '../../../operations/types/Project'
import { Trace } from '../../../operations/types/Trace'
import SplitPanelView from '../../meta/SplitPanelView'
import { createRelationshipColors } from '../artifact/accordion/ArtifactAccordionFactory'
import { SelectedArtifactsContainer } from './TracedArtifactsDisplay'
import { ArtifactSetContext, TraceContext } from '../types'
import ExplanationPanel from './graph/ExplanationPanel'

export default function ExplanationStep () {
  const { dataset, setError } = useContext(AppContext)
  const { traceSet } = useContext(ArtifactSetContext)
  const [trace, setTrace] = useState<Trace>(initializeEmptyTrace())

  const modalOpen = trace.selectedWord !== null

  const [selectedSource, setSelectedSource] = useState<number>(-1)
  const [selectedTarget, setSelectedTarget] = useState<number>(-1)
  const [isLoading, setIsLoading] = useState(false)
  const [sourceArtifacts, setSourceArtifacts] = useState<Artifact[]>([])
  const [targetArtifacts, setTargetArtifacts] = useState<Artifact[]>([])

  useEffect(() => {
    setSourceArtifacts(traceSet.map(ts => ts.sourceArtifact))
    setTargetArtifacts(traceSet.map(ts => ts.tracedArtifacts).flat())
    setSelectedSource(0)
    setSelectedTarget(0)
  }, [traceSet]) // trace set does not change once in this step

  useEffect(() => {
    if (selectedSource !== UNSELECTED_INDEX && selectedTarget !== UNSELECTED_INDEX) {
      setIsLoading(true)
      getTraceInformation(dataset.name, sourceArtifacts[selectedSource], targetArtifacts[selectedTarget]) // change with state index
        .then((traceInformation) => {
          const relationshipColors = createRelationshipColors(
            traceInformation
              .relationships
              .map(relationship => relationship.title))
          setTrace((t) => {
            return {
              ...t,
              relationships: traceInformation.relationships,
              relationshipColors: relationshipColors,
              sourceWords: traceInformation.sourceDescriptors,
              targetWords: traceInformation.targetDescriptors,
              selectedWord: null
            }
          })
          setIsLoading(false)
        })
        .catch((e) => {
          setIsLoading(false)
          setError(e)
        })
    } else {
      setTrace(initializeEmptyTrace())
    }
  }, [selectedTarget, selectedSource, dataset.name, setError, sourceArtifacts, targetArtifacts])

  return (
    <TraceContext.Provider value={{ trace, setTrace }}>
      <SplitPanelView
        left={ <SelectedArtifactsContainer
          artifacts={sourceArtifacts}
          traceWords={trace.sourceWords}
          onItemClick={setSelectedSource}
          selectedIndex={selectedSource}
          onSelectIndex={setSelectedSource}
          isLoading={isLoading}
        />}
        right={<SelectedArtifactsContainer
          artifacts={targetArtifacts}
          traceWords={trace.targetWords}
          onItemClick={setSelectedTarget}
          selectedIndex={selectedTarget}
          onSelectIndex={setSelectedTarget}
          isLoading={isLoading}
        />}
      />
      <ExplanationPanel open={modalOpen} />
    </TraceContext.Provider>

  )
}
