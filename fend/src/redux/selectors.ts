import { RootState } from "./types";

export const getDataset = (state: RootState) => state.dataset;
export const getSelectedSources = (state: RootState) => state.selectedSources;
export const getSelectedTargets = (state: RootState) => state.selectedTargets;
export const getCurrentStep = (state: RootState) => state.currentStep;
export const getError = (state: RootState) => state.error;
