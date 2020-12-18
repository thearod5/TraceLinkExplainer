import React, { useCallback, useContext, useEffect, useState } from 'react'
import { searchForSourceArtifact, searchForTracedArtifacts } from '../../../api/search'
import { AppContext } from '../../../App'
import { Artifact } from '../../../operations/types/Project'
import SplitPanelView from '../../meta/SplitPanelView'
import { StepActionsContext } from '../../wizard/types'
import { TraceArtifactsContext, TracedArtifacts as ArtifactTraces } from '../types'
import ArtifactFinder from './search/ArtifactFinder'
import useArtifactSearch from './search/hooks/useArtifactSearch'

export const ArtifactSelectContext = React.createContext({
  artifactsSelected: [] as Artifact[],
  onAddArtifact: (artifact: Artifact) => console.error('not implemented'),
  onRemoveArtifact: (artifact: Artifact) => console.error('not implemented')
})

export default function ArtifactSetFinder () {
  const { dataset, setError } = useContext(AppContext)
  const { onStepReadyToExit, onStepUnreadyToExit } = useContext(StepActionsContext)
  const { traceSet: selectedTraceSet, setTraceSet: setSelectedTraceSet } = useContext(TraceArtifactsContext)

  const [sources, setSources] = useState<Artifact[]>([])
  const [targets, setTargets] = useState<Artifact[]>([])
  const [selectedArtifactTraces, setTraces] = useState<ArtifactTraces[]>([])

  const searchForSourceArtifactWithDataset = useCallback((query:string) => {
    return searchForSourceArtifact(dataset, query)
  }, [dataset])
  const searchForTracedArtifactsWithDataset = useCallback((query: string) => {
    const affectedSources = sources // TODO: Replace with tab sources
    return searchForTracedArtifacts(dataset, affectedSources, query)
  }, [sources, dataset])
  const [sourceQueryArtifacts, sourceIsLoading, sourceOnSearch] = useArtifactSearch(searchForSourceArtifactWithDataset)
  const [targetQueryArtifacts, targetIsLoading, targetOnSearch] = useArtifactSearch(searchForTracedArtifactsWithDataset)

  const onAddSource = (sourceArtifact: Artifact) => {
    searchForTracedArtifacts(dataset, [sourceArtifact], '').then(tracedArtifacts => {
      const sourceWithNew = [...sources, sourceArtifact]
      setSources(sourceWithNew)
      const traceWithNew: ArtifactTraces[] = [...selectedArtifactTraces, { sourceArtifact, tracedArtifacts }]
      setTraces(traceWithNew)
      setSelectedTraceSet([...selectedTraceSet, { sourceArtifact, tracedArtifacts: [] }])
    }).catch(e => {
      setError(e)
    })
  }
  const onRemoveSource = (artifact: Artifact) => {
    setSources(sources.filter(s => s.id !== artifact.id))
    setTraces(selectedArtifactTraces.filter(t => t.sourceArtifact.id === artifact.id))
    setSelectedTraceSet(selectedTraceSet.filter(t => t.sourceArtifact.id === artifact.id))
  }
  const onAddTarget = (artifact: Artifact) => {
    setTargets([...targets, artifact])
    setTraces(selectedArtifactTraces.map(t => addArtifactToTraceSet(t, artifact)))
    setSelectedTraceSet(selectedTraceSet.map(t => addArtifactToTraceSet(t, artifact)))
  }
  const onRemoveTarget = (artifact: Artifact) => {
    setTargets(targets.filter(t => t.id !== artifact.id))
    const affectedSourceIds = selectedArtifactTraces.map(t => t.sourceArtifact.id) // TODO: Replace with tab artifact id of target
    setTraces(selectedArtifactTraces.map(t => affectedSourceIds.includes(t.sourceArtifact.id) ? removeArtifactFromTraceSet(t, artifact) : t))
    setSelectedTraceSet(selectedTraceSet.map(t => affectedSourceIds.includes(t.sourceArtifact.id) ? removeArtifactFromTraceSet(t, artifact) : t))
  }

  useEffect(() => {
    targetOnSearch('')
  }, [sources, targetOnSearch])
  useEffect(() => {
    if (selectedTraceSet.length > 0 && !selectedTraceSet.every(ts => ts.tracedArtifacts.length === 0)) {
      onStepReadyToExit()
    } else {
      onStepUnreadyToExit()
    }
  }, [selectedTraceSet, onStepReadyToExit, onStepUnreadyToExit])

  return (
    <SplitPanelView>
      <ArtifactSelectContext.Provider value={{ onAddArtifact: onAddSource, onRemoveArtifact: onRemoveSource, artifactsSelected: sources }}>
        <ArtifactFinder
          artifacts={sourceQueryArtifacts}
          onSearch={sourceOnSearch}
          isLoading={sourceIsLoading}
        />
      </ArtifactSelectContext.Provider>
      <ArtifactSelectContext.Provider value={{ onAddArtifact: onAddTarget, onRemoveArtifact: onRemoveTarget, artifactsSelected: targets }}>
        <ArtifactFinder
          artifacts={targetQueryArtifacts}
          onSearch={targetOnSearch}
          isLoading={targetIsLoading}
        />
      </ArtifactSelectContext.Provider>
    </SplitPanelView>
  )
}

function addArtifactToTraceSet (trace: ArtifactTraces, artifact: Artifact): ArtifactTraces {
  return {
    ...trace,
    tracedArtifacts: [...trace.tracedArtifacts, artifact]
  }
}
function removeArtifactFromTraceSet (trace: ArtifactTraces, artifact: Artifact): ArtifactTraces {
  return {
    ...trace,
    tracedArtifacts: trace.tracedArtifacts.filter(a => a.id === artifact.id)
  }
}
