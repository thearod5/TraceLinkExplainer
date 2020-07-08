import { Dataset } from '../../../shared/Dataset'

const requirements = require('../../../data/Drone/Requirements.json')
const designs = require('../../../data/Drone/Designs.json')
const tasks = require('../../../data/Drone/Tasks.json')
const classes = require('../../../data/Drone/Classes.json')

const artifacts = [
  ...requirements.artifacts,
  ...designs.artifacts,
  ...tasks.artifacts,
  ...classes.artifacts
]

export const mockDataset: Dataset = {
  name: 'Drone',
  summary: '...placeholder description about drone dataset...',
  artifacts: artifacts
}
