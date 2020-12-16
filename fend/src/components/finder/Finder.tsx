import { Button, Grid } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { searchForSourceArtifact, searchForTracedArtifacts } from '../../api/search'
import { TracesSetCallback } from '../../constants'
import { Artifact } from '../../operations/types/Dataset'
import { setError } from '../../redux/actions'
import { StepActionsContext } from '../wizard/Wizard'
import Search from './search/too/Search'
import useArtifactSearch from './search/too/useArtifactSearch'

export interface TraceSet {
  sourceArtifact: Artifact
  tracedArtifacts: Artifact[]
}

export const TraceContext = React.createContext({
  traceSet: [] as TraceSet[],
  setTraceSet: (traceSets: TraceSet[]) => console.error('not implemented')
})

export default function Finder () {
  const dispatch = useDispatch()
  const [sources, setSources] = useState<Artifact[]>([])
  const [sourceQueryArtifacts, sourceIsLoading, sourceOnSearch] = useArtifactSearch(searchForSourceArtifact)

  const targetArtifactQuery = (query: string) => {
    const affectedSources = sources // TODO: Replace with tab sources
    return searchForTracedArtifacts(affectedSources, query)
  }
  const [targetQueryArtifacts, targetIsLoading, targetOnSearch] = useArtifactSearch(targetArtifactQuery)
  const [traces, setTraces] = useState<TraceSet[]>([])

  const onAddSource = (sourceArtifact: Artifact, traceSetCallback: TracesSetCallback) => {
    searchForTracedArtifacts([sourceArtifact], '').then(tracedArtifacts => {
      const sourceWithNew = [...sources, sourceArtifact]
      setSources(sourceWithNew)
      const traceWithNew: TraceSet[] = [...traces, { sourceArtifact, tracedArtifacts }]
      setTraces(traceWithNew)
      traceSetCallback(traceWithNew)
    }).catch(e => dispatch(setError(e)))
  }

  const onRemoveSource = (artifact: Artifact, traceSetCallback: TracesSetCallback) => {
    setSources(sources.filter(s => s.id !== artifact.id))
    const newTraces = traces.filter(t => t.sourceArtifact.id === artifact.id)
    setTraces(newTraces)
    traceSetCallback(newTraces)
  }

  const onAddTarget = (artifact: Artifact, traceSetCallback: TracesSetCallback) => {
    const newTraces = traces.map(t => addArtifactToTraceSet(t, artifact)) // TODO: Replace with tab artifact id of target
    setTraces(newTraces)
    traceSetCallback(newTraces)
  }

  const onRemoveTarget = (artifact: Artifact, traceSetCallback: TracesSetCallback) => {
    const affectedSourceIds = traces.map(t => t.sourceArtifact.id) // TODO: Replace with tab artifact id of target
    const newTraces = traces.map(t => affectedSourceIds.includes(t.sourceArtifact.id) ? removeArtifactFromTraceSet(t, artifact) : t)
    setTraces(newTraces)
    traceSetCallback(newTraces)
  }

  function addArtifactToTraceSet (trace: TraceSet, artifact: Artifact): TraceSet {
    return {
      ...trace,
      tracedArtifacts: [...trace.tracedArtifacts, artifact]
    }
  }

  function removeArtifactFromTraceSet (trace: TraceSet, artifact: Artifact): TraceSet {
    return {
      ...trace,
      tracedArtifacts: trace.tracedArtifacts.filter(a => a.id === artifact.id)
    }
  }

  useEffect(() => {
    targetOnSearch('')
  }, [targetOnSearch])

  return (
    <TraceContext.Consumer>
      {({ setTraceSet }) => (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <StepActionsContext.Consumer>
              {({ onNextStep }) => (<Button onClick={onNextStep}>View Traces</Button>)}
            </StepActionsContext.Consumer>
          </Grid>
          <Grid item xs={6}>
            <Search
              artifacts={sourceQueryArtifacts}
              onSearch={sourceOnSearch}
              isLoading={sourceIsLoading}
              addArtifact={(a) => onAddSource(a, setTraceSet)}
              removeArtifact={(a) => onRemoveSource(a, setTraceSet)}
            />
          </Grid>
          <Grid item xs={6}>
            <Search
              artifacts={targetQueryArtifacts}
              onSearch={targetOnSearch}
              isLoading={targetIsLoading}
              addArtifact={(a) => onAddTarget(a, setTraceSet)}
              removeArtifact={(a) => onRemoveTarget(a, setTraceSet)}
            />
          </Grid>
        </Grid>
      )}
    </TraceContext.Consumer>
  )
}
