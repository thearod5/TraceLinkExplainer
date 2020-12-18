import React from 'react'
import { TraceCallback, TracesSetCallback } from '../../constants'
import { Artifact } from '../../operations/types/Project'
import { Trace } from '../../operations/types/Trace'
import { initializeEmptyTrace } from '../../operations/initializers'

export interface ArtifactTraceSet {
  sourceArtifact: Artifact
  tracedArtifacts: Artifact[]
}

interface IArtifactSetContext {
  traceSet: ArtifactTraceSet[],
  setTraceSet: TracesSetCallback
}

interface ITraceContext {
  trace: Trace,
  setTrace: TraceCallback
}

export const ArtifactSetContext = React.createContext<IArtifactSetContext>({
  traceSet: [] as ArtifactTraceSet[],
  setTraceSet: (traceSets: ArtifactTraceSet[]) => console.error('not implemented')
})

export const TraceContext = React.createContext<ITraceContext>({
  trace: initializeEmptyTrace(),
  setTrace: (trace:Trace) => console.error('not implemented')
})
