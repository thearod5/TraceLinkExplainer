import { Dataset } from '../operations/types/Dataset'
import { BASE_URL, DATASET_ENDPOINT, get } from './base'

export async function getDatasetNames (): Promise<Dataset[]> {
  return await get(
    [BASE_URL, DATASET_ENDPOINT, 'names'].join('/')
  ).then((response) => response as Dataset[])
}
