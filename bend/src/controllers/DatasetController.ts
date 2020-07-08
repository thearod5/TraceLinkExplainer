import { Response } from 'express'
import { Dataset } from '../../../shared/Dataset'
import { mockDataset } from '../mockdata/MockData'

const mockDatasetDatabase: Dataset[] = [mockDataset]

function getDatasetByName (res: Response<Dataset>, datasetName: string) {
  res.send(mockDataset)
};

function getDatasetNames (res: Response<string[]>) {
  res.send(['Drone'])
}

export { getDatasetByName, getDatasetNames }
