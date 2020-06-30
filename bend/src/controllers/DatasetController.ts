import { Response } from 'express'
import { Dataset } from '../../../shared/Dataset'

const mockDataset: Dataset = {
  name: 'Drone',
  summary: '...description about drone dataset...',
  artifactSets: [{
    name: 'Requirements',
    artifacts: [{
      id: 'RE-08',
      body: 'This is test requirements'
    }]
  }]
}

function getDatasetByName (datasetName: string, res: Response<Dataset>) {
  res.send(mockDataset)
};

export { getDatasetByName }
