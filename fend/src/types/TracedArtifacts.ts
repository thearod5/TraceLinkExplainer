import React from 'react'
import { initializeEmptyTrace } from './initializers'
import { Artifact } from './Project'
import { Trace } from './Trace'

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
