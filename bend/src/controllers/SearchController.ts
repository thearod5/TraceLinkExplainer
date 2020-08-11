import { SearchItem, SearchSourceRoutePayload, SearchTargetRoutePayload } from '../../../fend/src/shared/types/Search'
import { runFunction } from '../python/controllers/PythonController'

export async function searchForSourceArtifact (
  searchRequest: SearchSourceRoutePayload
): Promise<SearchItem[]> {
  const {
    datasetName,
    query,
    limit
  } = searchRequest
  return runFunction<SearchItem[]>(
    'Search.py',
    'search_for_artifact',
    {
      arguments: [datasetName, query, limit]
    }
  ).catch((e) => {
    throw e
  })
}

export async function searchForTracedArtifacts (
  searchQuery: SearchTargetRoutePayload
): Promise<SearchItem[]> {
  const { datasetName, sourceType, sourceId, query, limit } = searchQuery
  return runFunction<SearchItem[]>(
    'Search.py',
    'search_for_related_artifacts',
    {
      arguments: [datasetName, sourceType, sourceId, query, limit]
    }
  ).catch((e) => {
    throw e
  })
}
