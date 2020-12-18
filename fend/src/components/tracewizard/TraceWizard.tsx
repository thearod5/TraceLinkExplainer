
import React, { useState } from 'react'
import DatasetChooserWrapper from '../dataset/DatasetChooserWrapper'
import Wizard from '../wizard/Wizard'
import ExplanationStep from './explanation/ExplanationStep'
import ArtifactSetFinder from './finder/ArtifactSetFinder'
import { TraceArtifactsContext, TracedArtifacts } from './types'

export default function TraceWizard () {
  const [traceSet, setTraceSet] = useState<TracedArtifacts[]>([]) // represents the traces selected for viewing

  const body = (
    <TraceArtifactsContext.Provider value={{ traceSet, setTraceSet }}>
      <Wizard stepNames={['Select Dataset', 'Select Artifacts', 'View Traces']}>
        <DatasetChooserWrapper />
        <ArtifactSetFinder />
        <ExplanationStep />
      </Wizard>
    </TraceArtifactsContext.Provider>
  )
  return <div className="sizeFull">{body}</div>
}
