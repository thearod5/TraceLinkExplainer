import { Grid } from '@material-ui/core'
import React, { useContext } from 'react'
import { SelectedArtifactsContainer } from '../finder/panels/TracedArtifactsDisplay'
import { TraceContext } from '../types'
import ExplanationPanel from './ExplanationPanel'
import useLoadTraceData from './hooks/useLoadTraceData'
import useTraceExplanationListener from './hooks/useTraceExplanationListener'

export default function Trace () {
  useLoadTraceData()
  const { traceSet } = useContext(TraceContext)
  const [modalOpen] = useTraceExplanationListener()

  return (
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
    </Grid>
  )
}
