import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTraceInformation } from '../../api/trace'
import { NOT_CACHED, UNSELECTED_INDEX, VIEW_TRACE_STEP } from '../../constants'
import { Artifact, Dataset } from '../../operations/types/Dataset'
import { setError, setLoading, setSelectedSourceIndex, setSelectedTargetIndex } from '../../redux/actions'
import { getCurrentStep, getDataset, getSelectedSourceIndex, getSelectedSources, getSelectedTargetIndex, getSelectedTargets, getTraceSourceIndex, getTraceTargetIndex } from '../../redux/selectors'
import { handleTraceInformationRequest } from './controller/PageManagerControllerHelper'

/* Manages fetching and updating trace information
 *
 */
export default function useMaintainFreshTraceData () {
  const [hasStaleData, setHasStaleData] = useState(true)

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
        handleTraceInformationRequest(traceInformation, sourceIndex, targetIndex)
        dispatch(setLoading(false))
      })
      .catch((e) => {
        dispatch(setLoading(false))
        dispatch(setError(e))
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
}
