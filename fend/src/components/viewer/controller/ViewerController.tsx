import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTraceInformation } from "../../../api/trace";
import { setError } from "../../../redux/actions";
import {
  getCurrentStep,
  getDataset,
  getSelectedSources,
  getSelectedTargets,
  getTrace
} from "../../../redux/selectors";
import { Artifact, Dataset } from "../../../shared/types/Dataset";
import { Trace } from "../../../shared/types/Trace";
import { NumberSetter, SELECT_SOURCE_STEP, SELECT_TARGET_STEP, VIEW_TRACE_STEP } from "../../constants";
import NoSourceMessage from "../intermediate/NoSourceMessage";
import SourceArtifactSearch from "../search/containers/SourceArtifactSearchContainer";
import TargetArtifactSearch from "../search/containers/TargetArtifactSearchContainer";
import { Viewer } from "../Viewer";
import { DefaultTraceArtifactDisplay, handleTraceInformationRequest, updateTraceArtifactDisplayInPanel } from "./ViewerPanelManager";

export default function ViewerController() {
  const INITIAL_LEFT_PANEL = <SourceArtifactSearch />
  const INITIAL_RIGHT_PANEL = <NoSourceMessage />

  const trace: Trace = useSelector(getTrace)
  const dataset: Dataset = useSelector(getDataset);
  const selectedSources: Artifact[] = useSelector(getSelectedSources);
  const selectedTargets: Artifact[] = useSelector(getSelectedTargets);
  const currentStep: number = useSelector(getCurrentStep);

  const [loading, setLoading] = useState(false)
  const [leftPanel, setLeftPanel] = useState<JSX.Element>(INITIAL_LEFT_PANEL);
  const [rightPanel, setRightPanel] = useState<JSX.Element>(INITIAL_RIGHT_PANEL);
  const [sourceIndex, setSourceIndex] = useState(0);
  const [targetIndex, setTargetIndex] = useState(0);
  const [lastSelectedSourceIndex, setLastSelectedSourceIndex] = useState(-1);
  const [lastSelectedTargetIndex, setLastSelectedTargetIndex] = useState(-1);

  const dispatch = useDispatch()

  const setSelectedSourceIndexAdapter: NumberSetter = useCallback((index: number) => {
    if (sourceIndex !== -1)
      setLastSelectedSourceIndex(sourceIndex)
    setSourceIndex(index);
  }, [sourceIndex])

  const setSelectedTargetIndexAdapter = useCallback((index: number) => {
    if (targetIndex !== -1)
      setLastSelectedTargetIndex(targetIndex)
    setTargetIndex(index);
  }, [targetIndex])

  /*
  * Step. 1 - select sources
  */
  useEffect(() => {
    if (currentStep === SELECT_SOURCE_STEP) {
      setLeftPanel(INITIAL_LEFT_PANEL)
      setRightPanel(INITIAL_RIGHT_PANEL)
    }
  }, [currentStep])

  console.log(currentStep)

  /*
  * Step. 2 - select targets
  */
  useEffect(() => {
    if (currentStep === SELECT_TARGET_STEP) {
      setLeftPanel(
        <DefaultTraceArtifactDisplay
          selectedSources={selectedSources}
          setIndex={setSelectedSourceIndexAdapter}
          sourceIndex={sourceIndex}
        />)
    }
  }, [currentStep, sourceIndex])
  //separate so reloading one does not affect the other
  useEffect(() => {
    if (currentStep === SELECT_TARGET_STEP) {
      setRightPanel(<TargetArtifactSearch />);
    }
  }, [currentStep])

  /*
   * Step 3. View Trace
   */
  const stateIsCached = () =>
    sourceIndex === lastSelectedSourceIndex &&
    targetIndex === lastSelectedTargetIndex

  useEffect(() => {
    if (
      currentStep === VIEW_TRACE_STEP &&
      sourceIndex > -1 &&
      targetIndex > -1 &&
      !stateIsCached()) {
      const sourceArtifact = selectedSources[sourceIndex];
      const targetArtifact = selectedTargets[targetIndex];
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
  }, [dataset.name, currentStep, selectedSources, sourceIndex, selectedTargets, targetIndex]);

  useEffect(() => {
    updateTraceArtifactDisplayInPanel(
      "SOURCE",
      sourceIndex,
      setSelectedSourceIndexAdapter,
      setLeftPanel,
      [SELECT_TARGET_STEP, VIEW_TRACE_STEP]
    )
  }, [currentStep, selectedSources, sourceIndex, trace, setSelectedSourceIndexAdapter]);

  useEffect(() => {
    updateTraceArtifactDisplayInPanel(
      "TARGET",
      targetIndex,
      setSelectedTargetIndexAdapter,
      setRightPanel,
      [VIEW_TRACE_STEP]
    )
  }, [currentStep, selectedTargets, targetIndex, trace, setSelectedTargetIndexAdapter]);

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
