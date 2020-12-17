import { Artifact } from '../operations/types/Project'
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
        reject(response.message)
      } else resolve(response as TraceInformation)
    }).catch(e => reject(e))
  })
}
