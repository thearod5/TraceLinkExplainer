import React from 'react'
import { DATASET_NOT_SELECTED_ERROR, SOURCE_NOT_SELECTED_ERROR } from '../../operations/pagechanger/PageChanger'
import { isNonEmptyDataset } from '../../operations/types/Dataset'
import { DefaultSourceArtifactDisplay } from '../../pagecontainers/manager/controller/PageManagerControllerHelper'
import TargetArtifactSearch from '../../pagecontainers/TargetArtifactSearch'
import store from '../../redux/store'
import { StepChangeHandler, StepHook, StepRender, StepValidator } from '../useStepWizard'

const useSelectTargets: StepHook = (onStepDone: StepChangeHandler) => {
  const render : StepRender = () => {
    return [<DefaultSourceArtifactDisplay key='left'/>, <TargetArtifactSearch key='right' onStepDone={onStepDone}/>]
  }

  const isValid :StepValidator = () => {
    const state = store.getState()
    const datasetSelected = isNonEmptyDataset(state.dataset)
    const sourceSelected = state.selectedSources.length > 0
    if (!datasetSelected) return DATASET_NOT_SELECTED_ERROR
    else if (!sourceSelected) { return SOURCE_NOT_SELECTED_ERROR } else return null
  }

  return [render, isValid]
}

export default useSelectTargets
