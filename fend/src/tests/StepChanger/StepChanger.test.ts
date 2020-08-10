import { Artifact, Dataset } from "../../../../shared/Dataset";
import {
  clearData,
  selectDataset,
  setSourceArtifact,
  setTargetArtifact,
} from "../../redux/actions";
import { RootState } from "../../redux/index";
import { initializeEmptyDataset } from "../../redux/initializers";
import { createEmptyState } from "../../redux/reducers";
import { SELECT_SOURCE_STEP } from "../../redux/stepmanager/constants";
import { getNewStepState } from "../../redux/stepmanager/PageChanger";
import store from "../../redux/store";

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
  const mockState: RootState = createEmptyState();

  //Test
  const res: RootState = assertIsRootState(
    getNewStepState(mockState, SELECT_SOURCE_STEP, mockDataset)
  );
  //Assertions
  expect(res.dataset.name).toEqual(mockDataset.name);
});

test("- : getStepChangeError : select an empty dataset", () => {
  const currentDataset = initializeEmptyDataset();

  //Test
  const res: RootState | string = getNewStepState(
    mockState,
    SELECT_SOURCE_STEP,
    currentDataset
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
  expect(currentState.dataset.name).toBe("");
  expect(currentState.dataset.summary).toBe("");
});

test("+ : setDataset", () => {
  let currentState: RootState = store.getState();
  expect(currentState.dataset.name).toEqual("");

  //Test
  store.dispatch(selectDataset(mockDataset));
  //Assertions
  currentState = store.getState();
  expect(currentState.dataset.name).toEqual(mockDataset.name);
});

test("+ : selectSourceArtifact", () => {
  let currentState: RootState = store.getState();
  expect(currentState.metaData.sourceArtifact.id).toBe("");
  expect(currentState.metaData.selectedSources.length).toBe(0);

  //Test
  store.dispatch(setSourceArtifact(mockArtifact));

  //Assertions
  currentState = store.getState();
  expect(currentState.metaData.sourceArtifact.id).toEqual(mockArtifact.id);
  expect(currentState.metaData.sourceArtifact.body).toEqual(mockArtifact.body);
  expect(currentState.metaData.sourceArtifact.type).toEqual(mockArtifact.type);
  expect(currentState.metaData.selectedSources.length).toEqual(1);

  expect(currentState.metaData.targetArtifact.id).toEqual("");
  expect(currentState.metaData.targetArtifact.body).toEqual("");
  expect(currentState.metaData.targetArtifact.type).toEqual("");
  expect(currentState.metaData.selectedTargets.length).toEqual(0);
});

test("+ : selectTargetArtifact", () => {
  let currentState: RootState = store.getState();
  expect(currentState.metaData.targetArtifact.id).toBe("");
  expect(currentState.metaData.selectedTargets.length).toBe(0);

  //Test
  store.dispatch(setTargetArtifact(mockArtifact));

  //Assertions
  currentState = store.getState();
  expect(currentState.metaData.targetArtifact.id).toEqual(mockArtifact.id);
  expect(currentState.metaData.targetArtifact.body).toEqual(mockArtifact.body);
  expect(currentState.metaData.targetArtifact.type).toEqual(mockArtifact.type);
  expect(currentState.metaData.selectedTargets.length).toEqual(1);

  expect(currentState.metaData.sourceArtifact.id).toEqual("");
  expect(currentState.metaData.sourceArtifact.body).toEqual("");
  expect(currentState.metaData.sourceArtifact.type).toEqual("");
  expect(currentState.metaData.selectedSources.length).toEqual(0);
});
