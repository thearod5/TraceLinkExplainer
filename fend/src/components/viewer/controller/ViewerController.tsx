import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTraceInformation } from "../../../api/trace";
import { setError, setLoading, setSelectedSourceIndex, setSelectedTargetIndex } from "../../../redux/actions";
import {
  getCurrentStep,
  getDataset,
  getSelectedSourceIndex,
  getSelectedSources,
  getSelectedTargetIndex,
  getSelectedTargets,
  getTrace,
  getTraceSourceIndex,
  getTraceTargetIndex
} from "../../../redux/selectors";
import { Artifact, Dataset } from "../../../shared/types/Dataset";
import { Trace } from "../../../shared/types/Trace";
import { NOT_CACHED, SELECT_SOURCE_STEP, SELECT_TARGET_STEP, UNSELECTED_INDEX, VIEW_TRACE_STEP } from "../../constants";
import NoSourceMessage from "../panels/NoSourceMessage";
import SourceArtifactSearch from "../panels/SourceArtifactSearchContainer";
import TargetArtifactSearch from "../panels/TargetArtifactSearchContainer";
import { Viewer } from "../Viewer";
import { DefaultSourceArtifactDisplay, handleTraceInformationRequest, updateTraceArtifactDisplayInPanel } from "./ViewerPanelManager";


export default function ViewerController() {
  const trace: Trace = useSelector(getTrace)
  const dataset: Dataset = useSelector(getDataset);
  const selectedSources: Artifact[] = useSelector(getSelectedSources);
  const selectedTargets: Artifact[] = useSelector(getSelectedTargets);
  const currentStep: number = useSelector(getCurrentStep);

  const dispatch = useDispatch()
  const selectedSourceIndex = useSelector(getSelectedSourceIndex)
  const selectedTargetIndex = useSelector(getSelectedTargetIndex)
  const traceSourceIndex = useSelector(getTraceSourceIndex)
  const traceTargetIndex = useSelector(getTraceTargetIndex)

  const [initialStartup, setInitialStartup] = useState(true)
  const [leftPanel, setLeftPanel] = useState<JSX.Element | null>(null);
  const [rightPanel, setRightPanel] = useState<JSX.Element | null>(null);

  /*
  * Step. 1 - select sources
  */
  useEffect(() => {
    if (currentStep === SELECT_SOURCE_STEP) {
      setLeftPanel(<SourceArtifactSearch />)
      setRightPanel(<NoSourceMessage />)
    }
  }, [currentStep])

  /*
  * Step. 2 - select targets
  */
  useEffect(() => {
    if (currentStep === SELECT_TARGET_STEP) {
      setLeftPanel(
        <DefaultSourceArtifactDisplay />)
    }
    // eslint-disable-next-line
  }, [currentStep, selectedSources])
  //separate so reloading one does not affect the other
  useEffect(() => {
    if (currentStep === SELECT_TARGET_STEP) {
      setRightPanel(<TargetArtifactSearch />);
    }
  }, [currentStep])

  const containsUndefinedTraceIndices = () => selectedSourceIndex === UNSELECTED_INDEX ||
    selectedTargetIndex === UNSELECTED_INDEX

  const traceInformationCached = () => {
    if (traceTargetIndex === NOT_CACHED || traceSourceIndex === NOT_CACHED)
      return false
    if (traceSourceIndex === selectedSourceIndex &&
      traceTargetIndex === selectedTargetIndex)
      return true
    return false
  }
  /*
 * Step 3. View Trace
 */

  useEffect(() => {
    const update = () => {
      const DEFAULT_INDEX = 0
      const sourceIndex = selectedSourceIndex < 0 ? DEFAULT_INDEX : selectedSourceIndex
      const targetIndex = selectedTargetIndex < 0 ? DEFAULT_INDEX : selectedTargetIndex
      const sourceArtifact = selectedSources[sourceIndex];
      const targetArtifact = selectedTargets[targetIndex];

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
          dispatch(setError(e.toString()))
        });
    }

    if (currentStep === VIEW_TRACE_STEP
      && selectedSources.length > 0
      && selectedTargets.length > 0) {
      if (!containsUndefinedTraceIndices() && !traceInformationCached())
        update()
      if (initialStartup) {
        update()
        setInitialStartup(false)
      }
    }

    // eslint-disable-next-line
  }, [currentStep, selectedSourceIndex, selectedTargetIndex, selectedSources, selectedTargets]);

  useEffect(() => {
    if (currentStep < VIEW_TRACE_STEP) {
      setInitialStartup(true)
    }
  }, [currentStep])

  useEffect(() => {
    updateTraceArtifactDisplayInPanel(
      "SOURCE",
      setLeftPanel,
      [SELECT_TARGET_STEP, VIEW_TRACE_STEP]
    )
  }, [currentStep, selectedSources, trace]);

  useEffect(() => {
    updateTraceArtifactDisplayInPanel(
      "TARGET",
      setRightPanel,
      [VIEW_TRACE_STEP]
    )
  }, [currentStep, selectedTargets, trace]);

  const modalOpen = trace.selectedWord !== null
  return (
    <Viewer
      leftPanel={leftPanel}
      rightPanel={rightPanel}
      modalOpen={modalOpen}
    />
  );
}
