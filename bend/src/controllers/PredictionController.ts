import { SearchItem } from '../../../shared/Dataset'
import { runFunction } from './pythonController'

interface SimilarityMatrixResponse {
  similarities: number[]
}

export async function makePredictionsForArtifact (
  dataset: string,
  artifactType: string,
  artifactId: string,
  query: string,
  limit: string
): Promise<SearchItem[]> {
  return runFunction<SearchItem[]>(
    'Search.py',
    'search_for_related_artifacts',
    dataset,
    artifactType,
    artifactId,
    query,
    limit
  ).catch((e) => e)
}

export async function searchForArtifact (
  dataset: string,
  query: string,
  limit: string
): Promise<SearchItem[]> {
  return runFunction<SearchItem[]>(
    'Search.py',
    'search_for_artifact',
    dataset,
    query,
    limit
  ).catch((e) => e)
}
// TODO: thing
