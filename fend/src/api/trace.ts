import { Artifact } from '../types/Project'
import { TraceInformation } from '../types/Trace'
import { BASE_URL, get } from './base'
import { isError } from './errors'

export function getTraceInformation (
  projectName: string,
  sourceArtifact: Artifact,
  targetArtifact: Artifact
): Promise<TraceInformation> {
  if (sourceArtifact === undefined) { throw Error('Source artifact is undefined') }
  if (targetArtifact === undefined) { throw Error('Source artifact is undefined') }
  const names = [projectName, sourceArtifact.name, targetArtifact.name]
  if (names.some(name => name === '')) {
    throw Error('one of these is undefined:' + names.join(' '))
  }
  const TRACE_URL = [BASE_URL, projectName, 'traces', sourceArtifact.name, targetArtifact.name].join('/')

  return new Promise((resolve, reject) => {
    get(TRACE_URL).then((response) => {
      if (isError(response)) {
        reject(response.message)
      } else resolve(response as TraceInformation)
    }).catch(e => {
      reject(e)
    })
  })
}
