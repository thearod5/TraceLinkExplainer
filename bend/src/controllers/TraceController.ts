import { TraceInformation } from '../../../shared/Dataset'
import { runFunction } from './PythonController'
import { FunctionArguments } from './types'

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
    runFunction<TraceInformation>(
      'TraceExplanation.py',
      'get_trace_information',
      functionArguments
    ).then(result => {
      resolve(result)
    })
  })
}
