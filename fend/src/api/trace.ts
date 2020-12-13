import { setError } from '../redux/actions'
import store from '../redux/store'
import { Artifact } from '../operations/types/Dataset'
import { TraceInformation } from '../operations/types/Trace'
import { BASE_URL, get } from './base'
import { isError } from './errors'

export function getTraceInformation (
  datasetName: string,
  sourceArtifact: Artifact,
  targetArtifact: Artifact
): Promise<TraceInformation> {
  const TRACE_URL = [BASE_URL, datasetName, 'traces', sourceArtifact.name, targetArtifact.name].join('/')

  return new Promise((resolve, reject) => {
    get(TRACE_URL).then((response) => {
      if (isError(response)) {
        store.dispatch(setError(`Error occurred on backend: ${response.error}`))
        reject(response.message)
      } else resolve(response as TraceInformation)
    })
  })
}
