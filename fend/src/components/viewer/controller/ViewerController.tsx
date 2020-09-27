import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTraceInformation } from "../../../api/trace";
import { setError, setSelectedSourceIndex, setSelectedTargetIndex } from "../../../redux/actions";
import {
  getCurrentStep,
  getDataset,
  getSelectedSourceIndex,
  getSelectedSources,
  getSelectedTargetIndex,
  getSelectedTargets,
  getTrace
} from "../../../redux/selectors";
import { NOT_CACHED } from "../../../redux/store";
import { Artifact, Dataset } from "../../../shared/types/Dataset";
import { Trace } from "../../../shared/types/Trace";
import { SELECT_SOURCE_STEP, SELECT_TARGET_STEP, VIEW_TRACE_STEP } from "../../constants";
import NoSourceMessage from "../intermediate/NoSourceMessage";
import SourceArtifactSearch from "../search/containers/SourceArtifactSearchContainer";
import TargetArtifactSearch from "../search/containers/TargetArtifactSearchContainer";
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

  const [loading, setLoading] = useState(false)
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

  /*
   * Step 3. View Trace
   */
  useEffect(() => {
    if (
      currentStep === VIEW_TRACE_STEP &&
      selectedSourceIndex !== -1 &&
      selectedTargetIndex !== -1
    ) {
      const DEFAULT_INDEX = 0
      const sourceArtifact = selectedSources[selectedSourceIndex === NOT_CACHED ? DEFAULT_INDEX : selectedSourceIndex];
      const targetArtifact = selectedTargets[selectedTargetIndex === NOT_CACHED ? DEFAULT_INDEX : selectedTargetIndex];
      if (selectedTargetIndex === NOT_CACHED) {
        dispatch(setSelectedTargetIndex(DEFAULT_INDEX))
      }

      if (selectedSourceIndex === NOT_CACHED) {
        dispatch(setSelectedSourceIndex(DEFAULT_INDEX))
      }

      setLoading(true)
      getTraceInformation(dataset.name, sourceArtifact, targetArtifact) // change with state index
        .then((traceInformation) => {
          handleTraceInformationRequest(traceInformation)
          setLoading(false)
        })
        .catch((e) => {
          setLoading(false)
          dispatch(setError(e.toString()))
        });
    }
    // eslint-disable-next-line
  }, [currentStep, selectedSourceIndex, selectedTargetIndex]);

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
      loading={loading}
      modalOpen={modalOpen}
    />
  );
}
