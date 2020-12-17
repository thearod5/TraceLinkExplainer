import { VIEW_TRACE_STEP } from '../constants'
import { getNewStepState } from '../operations/pagechanger/PageChanger'
import { areArtifacts, isDataset } from '../operations/types/Dataset'
import { isTrace, isWordDescriptorDisplay } from '../operations/types/Trace'
import {
  CHANGE_STEP_ACTION,
  CLEAR_DATA,
  CustomAction,
  SELECT_DATASET,
  SET_LOADING_ACTION,
  SET_SELECTED_SOURCES_ACTION,
  SET_SELECTED_SOURCE_INDEX_ACTION,
  SET_SELECTED_TARGETS_ACTION,
  SET_SELECTED_TARGET_INDEX_ACTION,
  SET_SELECTED_WORD_ACTION,
  SET_TRACE_ACTION,
  SET_TRACE_SOURCE_INDEX_ACTION,
  SET_TRACE_TARGET_INDEX_ACTION,
  UNSELECT_DATASET
} from './actions'
import { initializeEmptyDataset } from './initializers'
import { createEmptyState } from './store'
import { RootState } from './types'

function rootReducer (
  state = createEmptyState(),
  action: CustomAction
): RootState {
  switch (action.type) {
    case SELECT_DATASET:
      if (isDataset(action.payload)) {
        return {
          ...state,
          dataset: action.payload
        }
      } else throw new Error(createReducerError(SELECT_DATASET, 'Dataset', action.payload))

    case UNSELECT_DATASET:
      return {
        ...state,
        dataset: initializeEmptyDataset()
      }

    case CHANGE_STEP_ACTION:
      // eslint-disable-next-line no-case-declarations
      const newStep = action.payload
      if (typeof newStep === 'number') {
        const result = getNewStepState(state, newStep)
        return typeof result === 'string'
          ? { ...state, error: result }
          : result
      } else throw new Error(createReducerError(CHANGE_STEP_ACTION, 'Number', newStep))

    case SET_SELECTED_SOURCES_ACTION:
      if (areArtifacts(action.payload)) {
        return {
          ...state,
          selectedSources: action.payload
        }
      } else throw new Error(createReducerError(SET_SELECTED_SOURCES_ACTION, 'Artifact[]', action.payload))

    case SET_SELECTED_SOURCE_INDEX_ACTION:
      if (typeof action.payload === 'number') {
        return {
          ...state,
          selectedSourceIndex: action.payload
        }
      } else throw new Error(createReducerError(SET_SELECTED_SOURCE_INDEX_ACTION, 'number', action.payload))

    case SET_SELECTED_TARGET_INDEX_ACTION:
      if (typeof action.payload === 'number') {
        return {
          ...state,
          selectedTargetIndex: action.payload
        }
      } else throw new Error(createReducerError(SET_SELECTED_TARGET_INDEX_ACTION, 'number', action.payload))

    case SET_TRACE_SOURCE_INDEX_ACTION:
      if (typeof action.payload === 'number') {
        return {
          ...state,
          traceSourceIndex: action.payload
        }
      } else throw new Error(createReducerError(SET_TRACE_SOURCE_INDEX_ACTION, 'number', action.payload))

    case SET_TRACE_TARGET_INDEX_ACTION:
      if (typeof action.payload === 'number') {
        return {
          ...state,
          traceTargetIndex: action.payload
        }
      } else throw new Error(createReducerError(SET_TRACE_TARGET_INDEX_ACTION, 'number', action.payload))

    case SET_SELECTED_TARGETS_ACTION:
      if (areArtifacts(action.payload)) {
        return {
          ...state,
          selectedTargets: action.payload
        }
      } else throw new Error(createReducerError(SET_SELECTED_TARGETS_ACTION, 'Artifact[]', action.payload))

    case SET_LOADING_ACTION:
      if (typeof action.payload === 'boolean') {
        return {
          ...state,
          loading: action.payload
        }
      } else {
        throw new Error(createReducerError(SET_LOADING_ACTION, 'boolean', action.payload))
      }

    case SET_TRACE_ACTION:
      if (isTrace(action.payload)) {
        return {
          ...state,
          trace: action.payload
        }
      } else {
        throw new Error(createReducerError(SET_TRACE_ACTION, 'Trace', action.payload))
      }
    case SET_SELECTED_WORD_ACTION:
      if (isWordDescriptorDisplay(action.payload)) {
        if (state.currentStep !== VIEW_TRACE_STEP) { return state }
        return {
          ...state,
          trace: {
            ...state.trace,
            selectedWord: action.payload
          }
        }
      } else {
        throw new Error(createReducerError(SET_SELECTED_WORD_ACTION, 'WordDescriptorDisplay', action.payload))
      }
    case CLEAR_DATA:
      return createEmptyState()
    default:
      return state
  }
}

export default rootReducer

function createReducerError (name: string, error: string, payload: any) {
  return `Expected a ${error}. Given: ${JSON.stringify(payload)}.`
}
