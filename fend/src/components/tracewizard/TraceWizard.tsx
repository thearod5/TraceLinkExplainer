
import React, { useState } from 'react'
import Finder, { TraceContext, TraceSet } from '../finder/Finder'
import Trace from '../trace/Trace'
import Wizard from '../wizard/Wizard'

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
