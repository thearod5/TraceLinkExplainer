
import React, { useState } from 'react'
import ProjectChooserWrapper from '../projectchooser/ProjectChooserWrapper'
import ExplanationStep from '../explanation/ExplanationStep'
import ArtifactSetFinder from '../finder/ArtifactSetFinder'
import { TraceArtifactsContext, TracedArtifacts } from './types'
import Wizard from './wizard/Wizard'

export default function TraceWizard () {
  const [traceSet, setTraceSet] = useState<TracedArtifacts[]>([]) // represents the traces selected for viewing

  const body = (
    <TraceArtifactsContext.Provider value={{ traceSet, setTraceSet }}>
      <Wizard stepNames={['Select Project', 'Select Source and Target Artifacts', 'View Trace Explanations']}>
        <ProjectChooserWrapper />
        <ArtifactSetFinder />
        <ExplanationStep />
      </Wizard>
    </TraceArtifactsContext.Provider>
  )
  return <div className="sizeFull">{body}</div>
}
