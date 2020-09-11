import { RootState } from "./types";

export const getDataset = (state: RootState) => state.dataset;
export const getSelectedSources = (state: RootState) => state.selectedSources;
export const getSelectedTargets = (state: RootState) => state.selectedTargets;
export const getSourceIndex = (state: RootState) => state.sourceIndex;
export const getTargetIndex = (state: RootState) => state.targetIndex;
export const getCurrentStep = (state: RootState) => state.currentStep;
export const getError = (state: RootState) => state.error;
