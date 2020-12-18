
import React, { useState } from 'react'
import ExplanationStep from '../explanation/ExplanationStep'
import ArtifactSetFinder from '../finder/ArtifactSetFinder'
import ProjectChooserWrapper from '../projectchooser/ProjectChooserWrapper'
import { TraceArtifactsContext, TracedArtifacts } from './types'
import Wizard from './wizard/Wizard'

export default function TraceWizard () {
  const aOne = { project: '8456c3d5-e019-4555-b82e-d9bab3110641', id: 'b46707dc-7541-42ce-85ef-1625091a3b31', type: 'requirements', name: 'RE-8', body: '' }
  const aTwo = { project: '8456c3d5-e019-4555-b82e-d9bab3110641', id: '374cb4f7-c04c-4208-8877-89734e8f0f1a', type: 'designs', name: 'DD-579', body: '' }
  const trace: TracedArtifacts[] = [{ sourceArtifact: aOne, tracedArtifacts: [aTwo] }]
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
