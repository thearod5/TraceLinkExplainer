import { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTraceInformation } from '../../../../api/trace'
import { AppContext } from '../../../../App'
import { NOT_CACHED, UNSELECTED_INDEX, VIEW_TRACE_STEP } from '../../../../constants'
import { Artifact, Dataset } from '../../../../operations/types/Dataset'
import { Trace, TraceInformation } from '../../../../operations/types/Trace'
import { setLoading, setSelectedSourceIndex, setSelectedTargetIndex, setTrace, setTraceSourceIndex, setTraceTargetIndex } from '../../../../redux/actions'
import { getCurrentStep, getDataset, getSelectedSourceIndex, getSelectedSources, getSelectedTargetIndex, getSelectedTargets, getTrace, getTraceSourceIndex, getTraceTargetIndex } from '../../../../redux/selectors'
import store from '../../../../redux/store'
import { createRelationshipColors } from '../../artifact/accordion/ArtifactAccordionFactory'

/* Manages fetching and updating trace information
 *
 */
export default function useLoadTraceData () {
  const [hasStaleData, setHasStaleData] = useState(true)
  const { setError } = useContext(AppContext)
  const dispatch = useDispatch()
  const dataset: Dataset = useSelector(getDataset)
  const currentStep: number = useSelector(getCurrentStep)
  const selectedSources: Artifact[] = useSelector(getSelectedSources)
  const selectedTargets: Artifact[] = useSelector(getSelectedTargets)
  const selectedSourceIndex = useSelector(getSelectedSourceIndex)
  const selectedTargetIndex = useSelector(getSelectedTargetIndex)
  const traceSourceIndex = useSelector(getTraceSourceIndex)
  const traceTargetIndex = useSelector(getTraceTargetIndex)

  const containsUndefinedTraceIndices = () => selectedSourceIndex === UNSELECTED_INDEX ||
    selectedTargetIndex === UNSELECTED_INDEX

  const traceInformationCached = () => {
    if (traceTargetIndex === NOT_CACHED || traceSourceIndex === NOT_CACHED) { return false }
    if (traceSourceIndex === selectedSourceIndex &&
      traceTargetIndex === selectedTargetIndex) { return true }
    return false
  }

  const fetchTraceInformation = () => {
    const DEFAULT_INDEX = 0
    const sourceIndex = selectedSourceIndex < 0 ? DEFAULT_INDEX : selectedSourceIndex
    const targetIndex = selectedTargetIndex < 0 ? DEFAULT_INDEX : selectedTargetIndex
    const sourceArtifact = selectedSources[sourceIndex]
    const targetArtifact = selectedTargets[targetIndex]

    dispatch(setSelectedSourceIndex(sourceIndex))
    dispatch(setSelectedTargetIndex(targetIndex))
    dispatch(setLoading(true))
    getTraceInformation(dataset.name, sourceArtifact, targetArtifact) // change with state index
      .then((traceInformation) => {
        traceResponseHandler(traceInformation, sourceIndex, targetIndex)
        dispatch(setLoading(false))
      })
      .catch((e) => {
        dispatch(setLoading(false))
        setError(e)
      })
  }

  useEffect(() => {
    if (currentStep === VIEW_TRACE_STEP &&
      selectedSources.length > 0 &&
      selectedTargets.length > 0) {
      if (!containsUndefinedTraceIndices() && !traceInformationCached()) { fetchTraceInformation() }
      if (hasStaleData) {
        fetchTraceInformation()
        setHasStaleData(false)
      }
    }

    // eslint-disable-next-line
  }, [currentStep, selectedSourceIndex, selectedTargetIndex, selectedSources, selectedTargets]);

  useEffect(() => {
    if (currentStep < VIEW_TRACE_STEP) {
      setHasStaleData(true)
    }
  }, [currentStep])
}

function traceResponseHandler (
  traceInformation: TraceInformation,
  sourceIndex: number,
  targetIndex: number
) {
  const { dispatch } = store
  const trace: Trace = getTrace(store.getState())
  const relationshipColors = createRelationshipColors(
    traceInformation
      .relationships
      .map(relationship => relationship.title))
  dispatch(setTrace({
    ...trace,
    relationships: traceInformation.relationships,
    relationshipColors: relationshipColors,
    sourceWords: traceInformation.sourceDescriptors,
    targetWords: traceInformation.targetDescriptors,
    selectedWord: null
  }))
  dispatch(setTraceSourceIndex(sourceIndex))
  dispatch(setTraceTargetIndex(targetIndex))
}
