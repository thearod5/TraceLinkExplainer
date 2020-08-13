import { getStepsInQuery } from '../../../fend/src/shared/query/QueryStepParser'
import { isValidQuery } from '../../../fend/src/shared/query/QueryValidator'
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
  return new Promise((resolve, reject) => {
    const [isValid, error] = isValidQuery(query)
    if (!isValid) {
      return reject(error)
    }

    resolve(runFunction<SearchItem[]>('Search.py', 'search_for_artifact', {
      arguments: [datasetName, getStepsInQuery(query), limit]
    }).catch((e) => {
      throw e
    }))
  })
}

export async function searchForTracedArtifacts (
  searchQuery: SearchTargetRoutePayload
): Promise<SearchItem[]> {
  const { datasetName, sources, query, limit } = searchQuery
  return runFunction<SearchItem[]>(
    'Search.py',
    'search_for_related_artifacts',
    {
      arguments: [datasetName, sources, query, limit]
    }
  ).catch((e) => {
    throw e
  })
}
