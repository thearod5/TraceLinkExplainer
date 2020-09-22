import classes from '../../../data/Drone/Classes.json'
import designs from '../../../data/Drone/Designs.json'
import requirements from '../../../data/Drone/Requirements.json'
import tasks from '../../../data/Drone/Tasks.json'
import { Dataset } from '../../../fend/src/shared/types/Dataset'

const artifacts = [
  ...requirements.artifacts,
  ...designs.artifacts,
  ...tasks.artifacts,
  ...classes.artifacts
]

export const mockDroneDataset: Dataset = {
  name: 'Drone',
  summary: '...placeholder description about drone dataset...'
}

export const mockTestDataset: Dataset = {
  name: 'test',
  summary: 'made up dataset used for unit tests'
}
