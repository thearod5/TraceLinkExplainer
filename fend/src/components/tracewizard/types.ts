import React from 'react'
import { initializeEmptyTrace } from '../../operations/initializers'
import { Artifact } from '../../operations/types/Project'
import { Trace } from '../../operations/types/Trace'

export interface TracedArtifacts {
  sourceArtifact: Artifact
  tracedArtifacts: Artifact[]
}

export const TraceArtifactsContext = React.createContext({
  traceSet: [] as TracedArtifacts[],
  setTraceSet: (traceSets: TracedArtifacts[]) => console.error('not implemented')
})

export const TraceContext = React.createContext({
  trace: initializeEmptyTrace(),
  setTrace: (trace: Trace) => console.error('not implemented')
})
