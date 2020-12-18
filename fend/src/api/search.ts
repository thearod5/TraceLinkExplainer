import {
  Artifact,
  ArtifactIdentifier,



  isNonEmptyDataset, Project
} from '../types/Project';
import {
  SearchResponse
} from '../types/Search';
import { BASE_URL, get } from './base';
import { CustomError, isError } from './errors';

export type ServerResponse = CustomError | SearchResponse;

export async function searchForSourceArtifact (
  project: Project,
  query: string
): Promise<Artifact[]> {
  return new Promise((resolve, reject) => {
    if (!isNonEmptyDataset(project)) {
      const message = 'no project is selected'
      return reject(Error(message))
    }
    const queryString = query.length === 0 ? '' : '?query=' + query
    const searchUrl = [BASE_URL, 'projects', project.name, 'artifacts' + queryString].join('/')
    baseSearchFunction(searchUrl).then(obj => resolve(obj)).catch(e => reject(e))
  })
}

export async function searchForTracedArtifacts (
  project: Project,
  sources: ArtifactIdentifier[],
  query: string
): Promise<Artifact[]> {
  return new Promise((resolve, reject) => {
    if (sources.length === 0) {
      resolve([])
      return
    }

    if (!isNonEmptyDataset(project)) {
      throw Error('Dataset not selected.')
    }

    const baseQuery = '?' + sources.map(source => 'source_name=' + source.name).join('&')
    const queryString = query.length === 0 ? baseQuery : baseQuery + '&query=' + query
    const searchUrl = [BASE_URL, 'projects', project.name, 'artifacts' + queryString].join('/')
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
