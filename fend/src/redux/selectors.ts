import { RootState } from "./index";

// TODO: Find and replace everywhere
export const getDataset = (state: RootState) => state.dataset;
export const getSourceArtifact = (state: RootState) =>
  state.metaData.sourceArtifact;
export const getTargetArtifact = (state: RootState) =>
  state.metaData.targetArtifact;

export const getCurrentStep = (state: RootState) => state.metaData.currentStep;

export const getError = (state: RootState) => state.metaData.error;
