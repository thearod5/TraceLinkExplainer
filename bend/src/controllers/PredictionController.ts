import { SearchItem } from '../../../shared/Dataset'
import { runFunction } from './pythonController'
import { FunctionArguments } from './types'

export async function makePredictionsForArtifact (
  dataset: string,
  artifactType: string,
  artifactId: string,
  query: string,
  limit: string
): Promise<SearchItem[]> {
  const functionArguments: FunctionArguments = {
    arguments: [dataset, artifactType, artifactId, query, limit]
  }
  return runFunction<SearchItem[]>(
    'Search.py',
    'search_for_related_artifacts',
    functionArguments
  ).catch((e) => { throw e })
}

export async function searchForArtifact (
  dataset: string,
  query: string,
  limit: string
): Promise<SearchItem[]> {
  const functionArguments: FunctionArguments = {
    arguments: [dataset, query, limit]
  }
  return runFunction<SearchItem[]>(
    'Search.py',
    'search_for_artifact',
    functionArguments
  ).catch((e) => { throw e })
}
// TODO: thing
