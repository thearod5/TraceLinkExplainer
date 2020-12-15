import React from 'react'
import { DATASET_NOT_SELECTED_ERROR } from '../../operations/pagechanger/PageChanger'
import { isNonEmptyDataset } from '../../operations/types/Dataset'
import NoSourceMessage from '../../pagecontainers/NoSourceMessage'
import SourceArtifactSearch from '../../pagecontainers/SourceArtifactSearch'
import store from '../../redux/store'
import { StepChangeHandler, StepHook, StepRender, StepValidator } from '../useStepWizard'

const useSelectSources: StepHook = (onStepDone: StepChangeHandler) => {
  const render : StepRender = () => {
    return [<SourceArtifactSearch key='left' onStepDone={onStepDone}/>, <NoSourceMessage key='right'/>]
  }

  const isValid :StepValidator = () => {
    const state = store.getState()
    const datasetSelected = isNonEmptyDataset(state.dataset)
    if (!datasetSelected) return DATASET_NOT_SELECTED_ERROR
    else return null
  }

  return [render, isValid]
}

export default useSelectSources
