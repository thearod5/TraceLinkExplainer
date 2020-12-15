import React from 'react'
import { DATASET_NOT_SELECTED_ERROR, SOURCE_NOT_SELECTED_ERROR, TARGET_NOT_SELECTED_ERROR } from '../../operations/pagechanger/PageChanger'
import { isNonEmptyDataset } from '../../operations/types/Dataset'
import { SelectedArtifactsContainer } from '../../pagecontainers/TracedArtifactsDisplay'
import store from '../../redux/store'
import { StepChangeHandler, StepHook, StepRender, StepValidator } from '../useStepWizard'

const useViewTraceStep: StepHook = (onStepDone: StepChangeHandler) => {
  const render : StepRender = () => {
    return [<SelectedArtifactsContainer key='left' type="SOURCE"/>, <SelectedArtifactsContainer key='right'type="TARGET"/>]
  }

  const isValid :StepValidator = () => {
    const state = store.getState()
    const datasetSelected = isNonEmptyDataset(state.dataset)
    const sourceSelected = state.selectedSources.length > 0
    const targetSelected = state.selectedTargets.length > 0

    if (!datasetSelected) return DATASET_NOT_SELECTED_ERROR
    else if (!sourceSelected) return SOURCE_NOT_SELECTED_ERROR
    else if (!targetSelected) return TARGET_NOT_SELECTED_ERROR
    else return null
  }

  return [render, isValid]
}

export default useViewTraceStep
