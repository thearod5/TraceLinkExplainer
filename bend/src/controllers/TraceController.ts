import { TraceInformation, TraceRetrievalPayload } from '../../../fend/src/shared/types/Trace'
import { runFunction } from '../python/controllers/PythonController'

export function getTrace (
  retrievalRequest: TraceRetrievalPayload
): Promise<TraceInformation> {
  return new Promise((resolve, reject) => {
    const {
      datasetName,
      sourceType,
      sourceId,
      targetType,
      targetId
    } = retrievalRequest
    runFunction<TraceInformation>(
      'TraceExplanation.py',
      'get_trace_information',
      {
        arguments: [datasetName, sourceType.toLowerCase(), sourceId, targetType.toLowerCase(), targetId]
      }
    )
      .then((result) => {
        resolve(result)
      })
      .catch(reject)
  })
}
