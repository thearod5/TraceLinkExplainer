import { Artifact, TraceInformation } from '../../../shared/Dataset'
import { runFunction } from './PythonController'
import { FunctionArguments } from './types'

const dummyInformation: TraceInformation = {
  wordRootMapping: {
    thingy: 'thing'
  },
  wordDescriptorsMapping: {
    thing: {
      color: 'blue',
      weight: 0.5
    }
  },
  traceType: 'VSM',
  score: 0.5
}

export function getInitialTraceInformation (
  dataset: string,
  sourceId: string,
  sourceType: string,
  targetId: string,
  targetType: string
): Promise<TraceInformation> {
  return new Promise((resolve, reject) => {
    const functionArguments: FunctionArguments = {
      arguments: [dataset, sourceType, sourceId, targetType, targetId]
    }
    runFunction<Artifact>(
      'DataLoader.py',
      'get_trace_information',
      functionArguments
    ).then(result => {
      console.log(result)
      resolve(dummyInformation)
    })
  })
}
