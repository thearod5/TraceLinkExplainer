import {
  clearData,
  selectDataset,
  setSelectedSources,
  setSelectedTargets,
} from "../../redux/actions";
import store, { createEmptyState } from "../../redux/store";
import { RootState } from "../../redux/types";
import { SELECT_SOURCE_STEP } from "../../shared/pagechanger/constants";
import { getNewStepState } from "../../shared/pagechanger/PageChanger";
import { Artifact, Dataset } from "../../shared/types/Dataset";

let mockState: RootState = createEmptyState();

const mockDataset: Dataset = {
  name: "Test Dataset",
  summary: "Test Summary",
};

const mockArtifact: Artifact = {
  id: "RE-8",
  body: "ARTIFACT BODY",
  type: "Requirement",
};

function assertIsRootState(state: RootState | string): RootState {
  if (typeof state === "string") {
    throw Error(state);
  }
  return state;
}

afterEach(() => {
  store.dispatch(clearData());
});

/*
 * Step 0 -> Step 1: Selecting a dataset
 */

test("+ : getStepChangeError : select a dataset", () => {
  //Test
  store.dispatch(selectDataset(mockDataset));
  const state = store.getState();

  const res: RootState = assertIsRootState(
    getNewStepState(state, SELECT_SOURCE_STEP)
  );
  //Assertions
  expect(res.dataset.name).toEqual(mockDataset.name);
});

test("- : getStepChangeError : select an empty dataset", () => {
  //Test
  const res: RootState | string = getNewStepState(
    mockState,
    SELECT_SOURCE_STEP
  );

  expect(typeof res).toEqual("string");
});

/*
 * Step 1 -> Step 2: Selecting a source artifact
 */

test("+ : getStepChangeError : select a dataset", () => {
  const currentState: RootState = store.getState();
  expect(currentState.currentStep).toEqual(0);
  expect(currentState.selectedSources.length).toEqual(0);
  expect(currentState.selectedTargets.length).toEqual(0);

  expect(currentState.dataset.name).toBe("");
  expect(currentState.dataset.summary).toBe("");
});

test("+ : setDataset", () => {
  let currentState: RootState = store.getState();

  //Test
  store.dispatch(selectDataset(mockDataset));
  //Assertions
  currentState = store.getState();
  expect(currentState.dataset.name).toEqual(mockDataset.name);
});

test("+ : setSelectedSources: default", () => {
  let currentState: RootState = store.getState();
  expect(currentState.selectedSources.length).toEqual(0);

  //Test
  store.dispatch(setSelectedSources([mockArtifact]));

  //Assertions
  currentState = store.getState();
  assertEqualToMock(currentState.selectedSources[0]);
  expect(currentState.selectedSources.length).toEqual(1);
  expect(currentState.selectedTargets.length).toEqual(0);
});

test("+ : selectTargetArtifacts : default", () => {
  let currentState: RootState = store.getState();

  //Test
  store.dispatch(setSelectedTargets([mockArtifact]));

  //Assertions
  currentState = store.getState();
  assertEqualToMock(currentState.selectedTargets[0]);
  expect(currentState.selectedTargets.length).toEqual(1);
  expect(currentState.selectedSources.length).toEqual(0);
});

function assertEmptyArtifact(artifact: Artifact) {
  expect(artifact.id).toBe("");
  expect(artifact.body).toBe("");
  expect(artifact.type).toBe("");
}

function assertEqualToMock(artifact: Artifact) {
  expect(artifact.id).toBe(mockArtifact.id);
  expect(artifact.body).toBe(mockArtifact.body);
  expect(artifact.type).toBe(mockArtifact.type);
}
