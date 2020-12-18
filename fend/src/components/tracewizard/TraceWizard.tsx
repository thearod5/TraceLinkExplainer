
import React, { useState } from 'react'
import DatasetChooserWrapper from '../dataset/DatasetChooserWrapper'
import Wizard from '../wizard/Wizard'
import ExplanationStep from './explanation/ExplanationStep'
import Finder from './finder/Finder'
import { ArtifactSetContext, ArtifactTraceSet } from './types'

export default function TraceWizard () {
  const [traceSet, setTraceSet] = useState<ArtifactTraceSet[]>([])

  const body = (
    <ArtifactSetContext.Provider value={{ traceSet, setTraceSet }}>
      <Wizard stepNames={['Select Dataset', 'Select Artifacts', 'View Traces']}>
        <DatasetChooserWrapper />
        <Finder />
        <ExplanationStep />
      </Wizard>
    </ArtifactSetContext.Provider>
  )
  return <div className="sizeFull">{body}</div>
}
