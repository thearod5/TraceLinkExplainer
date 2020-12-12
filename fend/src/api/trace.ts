import { setError } from '../redux/actions'
import store from '../redux/store'
import { Artifact } from '../operations/types/Dataset'
import { TraceInformation, TraceRetrievalPayload } from '../operations/types/Trace'
import { BASE_URL, post } from './base'
import { isError } from './errors'

const TRACE_URL = [BASE_URL, 'trace'].join('/')

export function getTraceInformation (
  datasetName: string,
  sourceArtifact: Artifact,
  targetArtifact: Artifact
): Promise<TraceInformation> {
  const body: TraceRetrievalPayload = {
    datasetName,
    sourceType: sourceArtifact.type,
    sourceId: sourceArtifact.id,
    targetType: targetArtifact.type,
    targetId: targetArtifact.id
  }
  return new Promise((resolve, reject) => {
    post(TRACE_URL, body).then((response) => {
      if (isError(response)) {
        store.dispatch(setError(`Error occurred on backend: ${response.error}`))
        reject(response.message)
      } else resolve(response as TraceInformation)
    })
  })
}
