import { useContext } from 'react'
import { v4 } from 'uuid'
import { AppContext } from '../../App'
import { SELECT_SOURCE_STEP } from '../../constants'
import { getNewStepState } from '../../operations/pagechanger/PageChanger'
import { RootState } from '../../types'
import { Artifact, Project } from '../../types/Project'
import {
  clearData,

  setSelectedSources,
  setSelectedTargets
} from '../../redux/actions'
import store, { createEmptyState } from '../../redux/store'

const mockState: RootState = createEmptyState()

const mockDataset: Project = {
  id: v4(),
  name: 'Test Dataset',
  description: 'Test Summary'
}

const mockArtifact: Artifact = {
  project: v4(),
  name: 'RE-8',
  body: 'ARTIFACT BODY',
  type: 'Requirement'
}

function assertIsRootState (state: RootState | string): RootState {
  if (typeof state === 'string') {
    throw Error(state)
  }
  return state
}

afterEach(() => {
  store.dispatch(clearData())
})

/*
 * Step 0 -> Step 1: Selecting a project
 */

test('+ : getStepChangeError : select a project', () => {
  // Test
  const { setDataset } = useContext(AppContext)
  setDataset(mockDataset)
  const state = store.getState()

  const res: RootState = assertIsRootState(
    getNewStepState(state, SELECT_SOURCE_STEP)
  )
  // Assertions
  expect(res.project.name).toEqual(mockDataset.name)
})

test('- : getStepChangeError : select an empty project', () => {
  // Test
  const res: RootState | string = getNewStepState(
    mockState,
    SELECT_SOURCE_STEP
  )

  expect(typeof res).toEqual('string')
})

/*
 * Step 1 -> Step 2: Selecting a source artifact
 */

test('+ : getStepChangeError : select a empty project', () => {
  const currentState: RootState = store.getState()
  expect(currentState.currentStep).toEqual(0)
  expect(currentState.selectedSources.length).toEqual(0)
  expect(currentState.selectedTargets.length).toEqual(0)

  expect(currentState.project.name).toBe('')
  expect(currentState.project.description).toBe('')
})

test('+ : setDataset', () => {
  let currentState: RootState = store.getState()
  const { setDataset } = useContext(AppContext)

  // Test
  setDataset(mockDataset)
  // Assertions
  currentState = store.getState()
  expect(currentState.project.name).toEqual(mockDataset.name)
})

test('+ : setSelectedSources: default', () => {
  let currentState: RootState = store.getState()
  expect(currentState.selectedSources.length).toEqual(0)

  // Test
  store.dispatch(setSelectedSources([mockArtifact]))

  // Assertions
  currentState = store.getState()
  assertEqualToMock(currentState.selectedSources[0])
  expect(currentState.selectedSources.length).toEqual(1)
  expect(currentState.selectedTargets.length).toEqual(0)
})

test('+ : selectTargetArtifacts : default', () => {
  let currentState: RootState = store.getState()

  // Test
  store.dispatch(setSelectedTargets([mockArtifact]))

  // Assertions
  currentState = store.getState()
  assertEqualToMock(currentState.selectedTargets[0])
  expect(currentState.selectedTargets.length).toEqual(1)
  expect(currentState.selectedSources.length).toEqual(0)
})

function assertEqualToMock (artifact: Artifact) {
  expect(artifact.name).toBe(mockArtifact.name)
  expect(artifact.body).toBe(mockArtifact.body)
  expect(artifact.type).toBe(mockArtifact.type)
}
