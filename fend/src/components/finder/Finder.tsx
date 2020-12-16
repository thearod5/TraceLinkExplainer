import React from 'react'
import { SplitPanelView } from '../explanation/tracepanel/SplitPanelView'
import SourceArtifactSearch from './panels/SourceArtifactSearch'
import TargetArtifactSearch from './panels/TargetArtifactSearch'

export default function Finder () {
  return <SplitPanelView
    leftPanel={<SourceArtifactSearch />}
    rightPanel={<TargetArtifactSearch />}
  />
}
