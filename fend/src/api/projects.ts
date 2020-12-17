import { Project } from '../operations/types/Project'
import { BASE_URL, DATASET_ENDPOINT, get } from './base'

export async function getProjects (): Promise<Project[]> {
  return await get(
    [BASE_URL, DATASET_ENDPOINT].join('/')
  ).then((response) => response as Project[])
}
