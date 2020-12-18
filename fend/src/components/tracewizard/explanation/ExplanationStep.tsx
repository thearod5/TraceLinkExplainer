import React, { useContext, useEffect, useState } from 'react'
import { getTraceInformation } from '../../../api/trace'
import { AppContext } from '../../../App'
import { UNSELECTED_INDEX } from '../../../constants'
import { initializeEmptyTrace } from '../../../operations/initializers'
import { Artifact } from '../../../operations/types/Project'
import { Trace } from '../../../operations/types/Trace'
import SplitPanelView from '../../meta/SplitPanelView'
import { createRelationshipColors } from '../artifact/accordion/ArtifactAccordionFactory'
import { TraceArtifactsContext, TraceContext } from '../types'
import ExplanationPanel from './graph/ExplanationPanel'
import { TraceExplanationsContainer } from './TraceExplanationsContainer'

export default function ExplanationStep () {
  const { dataset, setError } = useContext(AppContext)
  const { traceSet } = useContext(TraceArtifactsContext)
  const [trace, setTrace] = useState<Trace>(initializeEmptyTrace())

  const [selectedSource, setSelectedSource] = useState<number>(-1)
  const [selectedTarget, setSelectedTarget] = useState<number>(-1)
  const [isLoading, setIsLoading] = useState(false)
  const [sourceArtifacts, setSourceArtifacts] = useState<Artifact[]>([])
  const [targetArtifacts, setTargetArtifacts] = useState<Artifact[]>([])

  useEffect(() => { // only want to do this calculation once
    setSourceArtifacts(traceSet.map(ts => ts.sourceArtifact))
    setTargetArtifacts(traceSet.map(ts => ts.tracedArtifacts).flat())
    setSelectedSource(0)
    setSelectedTarget(0)
  }, []) // trace set does not change once in this step

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

  console.log('explanation render', trace.selectedWord)
  return (
    <TraceContext.Provider value={{ trace, setTrace }}>
      <SplitPanelView>
        <TraceExplanationsContainer
          artifacts={sourceArtifacts}
          traceWords={trace.sourceWords}
          onItemClick={setSelectedSource}
          selectedIndex={selectedSource}
          onSelectIndex={setSelectedSource}
          isLoading={isLoading}
        />
        <TraceExplanationsContainer
          artifacts={targetArtifacts}
          traceWords={trace.targetWords}
          onItemClick={setSelectedTarget}
          selectedIndex={selectedTarget}
          onSelectIndex={setSelectedTarget}
          isLoading={isLoading}
        />
      </SplitPanelView>
      <ExplanationPanel />
    </TraceContext.Provider>

  )
}
