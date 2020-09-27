import { RootState } from "./types";

export const getDataset = (state: RootState) => state.dataset;
export const getSelectedSources = (state: RootState) => state.selectedSources;
export const getSelectedTargets = (state: RootState) => state.selectedTargets;
export const getSelectedSourceIndex = (state: RootState) => state.selectedSourceIndex;
export const getSelectedTargetIndex = (state: RootState) => state.selectedTargetIndex;
export const getTraceSourceIndex = (state: RootState) => state.traceSourceIndex
export const getTraceTargetIndex = (state: RootState) => state.traceTargetIndex
export const getCurrentStep = (state: RootState) => state.currentStep;
export const getError = (state: RootState) => state.error;
export const getTrace = (state: RootState) => state.trace;
export const getSourceWords = (state: RootState) => state.trace.sourceWords
export const getTargetWords = (state: RootState) => state.trace.targetWords
export const getSelectedWord = (state: RootState) => state.trace.selectedWord
export const getRelationships = (state: RootState) => state.trace.relationships
export const getRelationshipColors = (state: RootState) => state.trace.relationshipColors
