import {
  clearData,
  removeSelectedSource,
  removeSelectedTarget,
  selectDataset,
  setSelectedSources,
  setSelectedTargets,
} from "../../redux/actions";
import { RootState } from "../../redux/index";
import { createEmptyState } from "../../redux/reducers";
import store from "../../redux/store";
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
  expect(currentState.metaData.oldStep).toEqual(-1);
  expect(currentState.metaData.currentStep).toEqual(0);
  expect(currentState.metaData.selectedSources.length).toEqual(0);
  expect(currentState.metaData.selectedTargets.length).toEqual(0);
  assertEmptyArtifact(currentState.metaData.sourceArtifact);
  assertEmptyArtifact(currentState.metaData.targetArtifact);
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

test("+ : selectSourceArtifact", () => {
  let currentState: RootState = store.getState();
  expect(currentState.metaData.selectedSources.length).toEqual(0);

  //Test
  store.dispatch(setSelectedSources(mockArtifact));

  //Assertions
  currentState = store.getState();
  assertEqualToMock(currentState.metaData.sourceArtifact);
  expect(currentState.metaData.selectedSources.length).toEqual(1);

  assertEmptyArtifact(currentState.metaData.targetArtifact);
  expect(currentState.metaData.selectedTargets.length).toEqual(0);
});

test("+ : selectTargetArtifact", () => {
  let currentState: RootState = store.getState();

  //Test
  store.dispatch(setSelectedTargets(mockArtifact));

  //Assertions
  currentState = store.getState();
  assertEqualToMock(currentState.metaData.targetArtifact);
  expect(currentState.metaData.selectedTargets.length).toEqual(1);
  assertEmptyArtifact(currentState.metaData.sourceArtifact);
  expect(currentState.metaData.selectedSources.length).toEqual(0);
});

/*
 * Remove selected artifacts
 */

test("+ : selectTargetArtifact", () => {
  let currentState: RootState = store.getState();

  //Test
  store.dispatch(setSelectedTargets(mockArtifact));
  store.dispatch(removeSelectedTarget(mockArtifact));

  //Assertions
  currentState = store.getState();
  assertEmptyArtifact(currentState.metaData.targetArtifact);
  expect(currentState.metaData.selectedTargets.length).toEqual(0);
});

test("+ : selectTargetArtifact: remove nonexistent artifact", () => {
  let currentState: RootState = store.getState();

  //Test
  store.dispatch(removeSelectedSource(mockArtifact));

  //Assertions
  currentState = store.getState();
  assertEmptyArtifact(currentState.metaData.sourceArtifact);
  expect(currentState.metaData.selectedSources.length).toEqual(0);
});

test("+ : selectTargetArtifact", () => {
  let currentState: RootState = store.getState();

  //Test
  store.dispatch(setSelectedTargets(mockArtifact));
  store.dispatch(removeSelectedTarget(mockArtifact));

  //Assertions
  currentState = store.getState();
  assertEmptyArtifact(currentState.metaData.targetArtifact);
  expect(currentState.metaData.selectedTargets.length).toEqual(0);
});

test("+ : selectTargetArtifact: remove nonexistent artifact", () => {
  let currentState: RootState = store.getState();

  //Test
  store.dispatch(removeSelectedSource(mockArtifact));

  //Assertions
  currentState = store.getState();
  assertEmptyArtifact(currentState.metaData.sourceArtifact);
  expect(currentState.metaData.selectedSources.length).toEqual(0);
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
