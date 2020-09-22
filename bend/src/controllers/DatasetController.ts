import { Response } from 'express'
import { Dataset } from '../../../fend/src/shared/types/Dataset'
import { mockDroneDataset, mockTestDataset } from '../mockdata/MockData'

function getDatasetByName (res: Response<Dataset>, datasetName: string) {
  switch (datasetName.toLowerCase()) {
    case 'drone':
      res.send(mockDroneDataset) // TODO: Query for dataset name and throw error if not found
      break
    case 'test':
      res.send(mockTestDataset)
      break
    default:
      throw Error('Could not identify dataset: ' + datasetName)
  }
};

function getDatasetNames (res: Response<string[]>) {
  res.send(['Drone', 'test']) // TODO: Query for all datasets
}

export { getDatasetByName, getDatasetNames }
