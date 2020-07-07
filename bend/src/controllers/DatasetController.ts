import { Response } from 'express'
import { Dataset } from '../../../shared/Dataset'

const requirements = require('../../../data/Drone/requirements.json')
const designs = require('../../../data/Drone/designdefinitions.json')
const tasks = require('../../../data/Drone/tasks.json')
const classes = require('../../../data/Drone/classes.json')

const artifacts = [...requirements.artifacts, ...designs.artifacts, ...tasks.artifacts, ...classes.artifacts]

const mockDataset: Dataset = {
  name: 'Drone',
  summary: '...placeholder description about drone dataset...',
  artifacts: artifacts
}

const mockDatasetDatabase: Dataset[] = [mockDataset]

function getDatasetByName (res: Response<Dataset>, datasetName: string) {
  res.send(mockDataset)
};

function getDatasetNames (res: Response<string[]>) {
  res.send(['Drone'])
}

export { getDatasetByName, getDatasetNames }
