import { Response } from 'express'
import { Dataset } from '../../../shared/Dataset'

const requirements = require('../../../data/Drone/requirements.json')
const designs = require('../../../data/Drone/designdefinitions.json')
const tasks = require('../../../data/Drone/tasks.json')
const classes = require('../../../data/Drone/classes.json')

const mockDataset: Dataset = {
  name: 'Drone',
  summary: '...placeholder description about drone dataset...',
  artifactSets: [requirements, designs, classes, tasks]
}

function getDatasetByName (datasetName: string, res: Response<Dataset>) {
  res.send(mockDataset)
};

function getDatasetNames (res: Response<Array<string>>) {
  res.send(['Drone'])
}
export { getDatasetByName, getDatasetNames }
