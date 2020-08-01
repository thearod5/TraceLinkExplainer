import { TraceInformation } from '../../../shared/Dataset'
import { runFunction } from './PythonController'
import { FunctionArguments } from './types'

export function getInitialTraceInformation (
  dataset: string,
  sourceType: string,
  sourceId: string,
  targetType: string,
  targetId: string
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
      console.log(result.wordRootMapping)
      resolve(result)
    })
  })
}
