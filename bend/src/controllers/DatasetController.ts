import { Response } from 'express'
import { Dataset } from '../../../fend/src/shared/types/Dataset'
import { mockDataset } from '../mockdata/MockData'

function getDatasetByName (res: Response<Dataset>, datasetName: string) {
  res.send(mockDataset) // TODO: Query for dataset name and throw error if not found
};

function getDatasetNames (res: Response<string[]>) {
  res.send(['Drone']) // TODO: Query for all datasets
}

export { getDatasetByName, getDatasetNames }
