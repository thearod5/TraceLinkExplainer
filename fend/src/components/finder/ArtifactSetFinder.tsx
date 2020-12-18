import React, { useCallback, useContext, useEffect, useState } from 'react'
import { searchForSourceArtifact, searchForTracedArtifacts } from '../../api/search'
import { AppContext } from '../../App'
import { Artifact } from '../../types/Project'
import SplitPanelView from '../meta/SplitPanelView'
import { TraceArtifactsContext, TracedArtifacts as ArtifactTraces } from '../tracewizard/types'
import { StepActionsContext } from '../tracewizard/wizard/types'
import ArtifactFinder from './search/ArtifactFinder'
import useArtifactSearch from './search/hooks/useArtifactSearch'

export const ArtifactSelectContext = React.createContext({
  artifactsSelected: [] as Artifact[],
  onAddArtifact: (artifact: Artifact) => console.error('not implemented'),
  onRemoveArtifact: (artifact: Artifact) => console.error('not implemented')
})

export default function ArtifactSetFinder () {
  const { project, setError } = useContext(AppContext)
  const { onStepReadyToExit, onStepUnreadyToExit } = useContext(StepActionsContext)
  const { traceSet: selectedTraceSet, setTraceSet: setSelectedTraceSet } = useContext(TraceArtifactsContext)

  const [sources, setSources] = useState<Artifact[]>([])
  const [targets, setTargets] = useState<Artifact[]>([])
  const [selectedArtifactTraces, setTraces] = useState<ArtifactTraces[]>([])

  const searchForSourceArtifactWithDataset = useCallback((query:string) => {
    return searchForSourceArtifact(project, query)
  }, [project])
  const searchForTracedArtifactsWithDataset = useCallback((query: string) => {
    const affectedSources = sources // TODO: Replace with tab sources
    return searchForTracedArtifacts(project, affectedSources, query)
  }, [sources, project])
  const [sourceQueryArtifacts, sourceIsLoading, sourceOnSearch] = useArtifactSearch(searchForSourceArtifactWithDataset)
  const [targetQueryArtifacts, targetIsLoading, targetOnSearch] = useArtifactSearch(searchForTracedArtifactsWithDataset)

  const onAddSource = (sourceArtifact: Artifact) => {
    searchForTracedArtifacts(project, [sourceArtifact], '').then(tracedArtifacts => {
      const sourceWithNew = [...sources, sourceArtifact]
      setSources(sourceWithNew)
      const traceWithNew: ArtifactTraces[] = [...selectedArtifactTraces, { sourceArtifact, tracedArtifacts }]
      setTraces(traceWithNew)
      setSelectedTraceSet([...selectedTraceSet, { sourceArtifact, tracedArtifacts: [] }])
      if (tracedArtifacts.length === 0) {
        setError(sourceArtifact.name + ' contains no traced artifacts')
      }
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
    const affectedSourcesIds = selectedArtifactTraces.filter(t => t.tracedArtifacts.map(a => a.id).includes(artifact.id)).map(t => t.sourceArtifact.id)
    setTraces(selectedArtifactTraces.map(t => affectedSourcesIds.includes(t.sourceArtifact.id) ? addArtifactToTraceSet(t, artifact) : t))
    setSelectedTraceSet(selectedTraceSet.map(t => affectedSourcesIds.includes(t.sourceArtifact.id) ? addArtifactToTraceSet(t, artifact) : t))
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

  useEffect(() => {
    setSelectedTraceSet([])
  }, [setSelectedTraceSet])

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
