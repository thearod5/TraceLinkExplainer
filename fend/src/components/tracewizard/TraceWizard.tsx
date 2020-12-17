
import React, { useState } from 'react'
import Wizard from '../wizard/Wizard'
import Trace from './explanation/Trace'
import Finder from './finder/Finder'
import { TraceContext, TraceSet } from './types'

export default function TraceWizard () {
  const [traceSet, setTraceSet] = useState<TraceSet[]>([])

  const body = (
    <TraceContext.Provider value={{ traceSet, setTraceSet }}>
      <Wizard>
        <Finder />
        <Trace />
      </Wizard>
    </TraceContext.Provider>
  )
  return body
}
