import React from 'react'
import { SelectedArtifactsContainer } from '../finder/panels/TracedArtifactsDisplay'
import { SplitPanelView } from '../meta/SplitPanelView'
import ExplanationPanel from './ExplanationPanel'
import useLoadTraceData from './hooks/useLoadTraceData'
import useTraceExplanationListener from './hooks/useTraceExplanationListener'

export default function Trace () {
  useLoadTraceData()
  const [modalOpen] = useTraceExplanationListener()

  return (
    <div>
      <SplitPanelView
        leftPanel={<SelectedArtifactsContainer type="SOURCE"/>}
        rightPanel={<SelectedArtifactsContainer type="TARGET"/>}
      />
      <ExplanationPanel open={modalOpen} />
    </div>
  )
}
