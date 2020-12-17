import React from 'react'
import { Artifact } from '../../operations/types/Dataset'

export interface TraceSet {
  sourceArtifact: Artifact
  tracedArtifacts: Artifact[]
}

export const TraceContext = React.createContext({
  traceSet: [] as TraceSet[],
  setTraceSet: (traceSets: TraceSet[]) => console.error('not implemented')
})
