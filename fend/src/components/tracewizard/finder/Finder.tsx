import React, { useCallback, useContext, useEffect, useState } from 'react'
import { searchForSourceArtifact, searchForTracedArtifacts } from '../../../api/search'
import { AppContext } from '../../../App'
import { Artifact } from '../../../operations/types/Project'
import SplitPanelView from '../../meta/SplitPanelView'
import { StepActionsContext } from '../../wizard/types'
import { ArtifactSetContext, ArtifactTraceSet } from '../types'
import useArtifactSearch from './search/hooks/useArtifactSearch'
import Search from './search/Search'

export default function Finder () {
  const { dataset } = useContext(AppContext)
  const { onStepReadyToExit, onStepUnreadyToExit } = useContext(StepActionsContext)
  const { traceSet: selectedTraceSet, setTraceSet: setSelectedTraceSet } = useContext(ArtifactSetContext)
  const { setError } = useContext(AppContext)

  const onSourceArtifactQuery = useCallback((query:string) => {
    return searchForSourceArtifact(dataset, query)
  }, [dataset])

  const [sources, setSources] = useState<Artifact[]>([])
  const [sourceQueryArtifacts, sourceIsLoading, sourceOnSearch] = useArtifactSearch(onSourceArtifactQuery)

  const onTargetArtifactQuery = useCallback((query: string) => {
    const affectedSources = sources // TODO: Replace with tab sources
    return searchForTracedArtifacts(dataset, affectedSources, query)
  }, [sources, dataset])

  const [targetQueryArtifacts, targetIsLoading, targetOnSearch] = useArtifactSearch(onTargetArtifactQuery)
  const [traces, setTraces] = useState<ArtifactTraceSet[]>([])

  const onAddSource = (sourceArtifact: Artifact) => {
    searchForTracedArtifacts(dataset, [sourceArtifact], '').then(tracedArtifacts => {
      const sourceWithNew = [...sources, sourceArtifact]
      setSources(sourceWithNew)
      const traceWithNew: ArtifactTraceSet[] = [...traces, { sourceArtifact, tracedArtifacts }]
      setTraces(traceWithNew)
      setSelectedTraceSet([...selectedTraceSet, { sourceArtifact, tracedArtifacts: [] }])
    }).catch(e => {
      setError(e)
    })
  }

  const onRemoveSource = (artifact: Artifact) => {
    setSources(sources.filter(s => s.id !== artifact.id))
    setTraces(traces.filter(t => t.sourceArtifact.id === artifact.id))
    setSelectedTraceSet(selectedTraceSet.filter(t => t.sourceArtifact.id === artifact.id))
  }

  const onAddTarget = (artifact: Artifact) => {
    setTraces(traces.map(t => addArtifactToTraceSet(t, artifact)))
    setSelectedTraceSet(selectedTraceSet.map(t => addArtifactToTraceSet(t, artifact)))
  }

  const onRemoveTarget = (artifact: Artifact) => {
    const affectedSourceIds = traces.map(t => t.sourceArtifact.id) // TODO: Replace with tab artifact id of target
    setTraces(traces.map(t => affectedSourceIds.includes(t.sourceArtifact.id) ? removeArtifactFromTraceSet(t, artifact) : t))
    setSelectedTraceSet(selectedTraceSet.map(t => affectedSourceIds.includes(t.sourceArtifact.id) ? removeArtifactFromTraceSet(t, artifact) : t))
  }

  function addArtifactToTraceSet (trace: ArtifactTraceSet, artifact: Artifact): ArtifactTraceSet {
    return {
      ...trace,
      tracedArtifacts: [...trace.tracedArtifacts, artifact]
    }
  }

  function removeArtifactFromTraceSet (trace: ArtifactTraceSet, artifact: Artifact): ArtifactTraceSet {
    return {
      ...trace,
      tracedArtifacts: trace.tracedArtifacts.filter(a => a.id === artifact.id)
    }
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
    <SplitPanelView
      left={<Search
        artifacts={sourceQueryArtifacts}
        onSearch={sourceOnSearch}
        isLoading={sourceIsLoading}
        addArtifact={(a) => onAddSource(a)}
        removeArtifact={(a) => onRemoveSource(a)}
      />}
      right={<Search
        artifacts={targetQueryArtifacts}
        onSearch={targetOnSearch}
        isLoading={targetIsLoading}
        addArtifact={(a) => onAddTarget(a)}
        removeArtifact={(a) => onRemoveTarget(a)}
      />}
    />
  )
}
