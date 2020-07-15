import { Response } from 'express'
import { Dataset } from '../../../shared/Dataset'
import { mockDataset } from '../mockdata/MockData'

const mockDatasetDatabase: Dataset[] = [mockDataset]

function getDatasetByName (res: Response<Dataset>, datasetName: string) {
  res.send(mockDataset) // TODO: Query for dataset name and throw error if not found
};

function getDatasetNames (res: Response<string[]>) {
  res.send(['Drone']) // TODO: Query for all datasets
}

export { getDatasetByName, getDatasetNames }
