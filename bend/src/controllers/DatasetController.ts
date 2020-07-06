import { Response } from 'express'
import { ArtifactSet, Dataset } from '../../../shared/Dataset'

const requirements = require('../../../data/Drone/requirements.json')
const designs = require('../../../data/Drone/designdefinitions.json')
const tasks = require('../../../data/Drone/tasks.json')
const classes = require('../../../data/Drone/classes.json')

const mockDataset: Dataset = {
  name: 'Drone',
  summary: '...placeholder description about drone dataset...',
  artifactSets: [requirements, designs, classes, tasks]
}

const mockDatasetDatabase: Dataset[] = [mockDataset]

function getDatasetByName (res: Response<Dataset>, datasetName: string) {
  res.send(mockDataset)
};

function getDatasetNames (res: Response<Array<string>>) {
  res.send(['Drone'])
}

function getDatasetArtifactSet (datasetNameQuery: string, artifactSetNameQuery: string): ArtifactSet {
  const datasetQuery = mockDatasetDatabase.filter(dataset => dataset.name === datasetNameQuery)
  if (datasetQuery.length !== 1) throw Error(datasetNameQuery + ' not found.')
  const dataset: Dataset = datasetQuery[0]
  const artifactSetQuery = dataset.artifactSets.filter(artifactSet => artifactSet.name === artifactSetNameQuery)
  if (artifactSetQuery.length !== 1) throw Error(artifactSetNameQuery + ' not found.')
  return artifactSetQuery[0]
}

export { getDatasetByName, getDatasetNames }
