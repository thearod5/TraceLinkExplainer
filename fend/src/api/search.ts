import {
  Artifact,
  ArtifactIdentifier,
  Dataset,
  isNonEmptyDataset
} from '../operations/types/Dataset'
import {
  SearchResponse
} from '../operations/types/Search'
import store from '../redux/store'
import { BASE_URL, get } from './base'
import { CustomError, isError } from './errors'

export type ServerResponse = CustomError | SearchResponse;

export async function searchForSourceArtifact (
  query: string,
  limit: number
): Promise<Artifact[]> {
  return new Promise((resolve, reject) => {
    const dataset: Dataset = store.getState().dataset
    if (!isNonEmptyDataset(dataset)) {
      return reject(Error('Dataset not selected.'))
    }
    const queryString = query.length === 0 ? '' : '?query=' + query
    const searchUrl = [BASE_URL, 'projects', dataset.name, 'artifacts' + queryString].join('/')
    baseSearchFunction(searchUrl).then(obj => resolve(obj)).catch(e => reject(e))
  })
}

export async function searchForTargetArtifact (
  query: string,
  limit: number
): Promise<Artifact[]> {
  return new Promise((resolve, reject) => {
    const dataset: Dataset = store.getState().dataset

    if (!isNonEmptyDataset(dataset)) {
      return reject(Error('Dataset not selected.'))
    }

    const sources: ArtifactIdentifier[] = store.getState().selectedSources
    if (sources.length === 0) {
      return reject(
        Error(
          'cannot search for target artifact without a source artifact selected'
        )
      )
    }
    const baseQuery = '?' + sources.map(source => 'source_name=' + source.name).join('&')
    const queryString = query.length === 0 ? baseQuery : baseQuery + 'query=' + query
    const searchUrl = [BASE_URL, 'projects', dataset.name, 'artifacts' + queryString].join('/')
    return resolve(baseSearchFunction(searchUrl))
  })
}

async function baseSearchFunction (
  url: string
): Promise<Artifact[]> {
  return new Promise((resolve, reject) => {
    (get(url) as Promise<Artifact[]>).then(
      (artifacts: Artifact[]) => {
        if (artifacts === undefined) {
          return reject(Error('Backend is off. Please see system administrator.'))
        } else if (isError(artifacts)) {
          return reject(artifacts.error)
        } else {
          return resolve(artifacts)
        }
      }
    ).catch(resolve)
  })
}
