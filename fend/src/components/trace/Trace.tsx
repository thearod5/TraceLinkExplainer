import { Grid } from '@material-ui/core'
import React from 'react'
import { TraceContext } from '../finder/Finder'
import { SelectedArtifactsContainer } from '../finder/panels/TracedArtifactsDisplay'
import ExplanationPanel from './ExplanationPanel'
import useLoadTraceData from './hooks/useLoadTraceData'
import useTraceExplanationListener from './hooks/useTraceExplanationListener'

export default function Trace () {
  useLoadTraceData()
  const [modalOpen] = useTraceExplanationListener()

  return (
    <div>
      <TraceContext.Consumer>
        {({ traceSet, setTraceSet }) => (
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <SelectedArtifactsContainer type="SOURCE" artifacts={traceSet.map(ts => ts.sourceArtifact)}/>
            </Grid>
            <Grid item xs={6}>
              <SelectedArtifactsContainer type="TARGET" artifacts={traceSet.map(ts => ts.tracedArtifacts).flat()}/>
            </Grid>
            <Grid item xs={12}>
              <ExplanationPanel open={modalOpen} />
            </Grid>
          </Grid>)}
      </TraceContext.Consumer>
    </div>
  )
}
