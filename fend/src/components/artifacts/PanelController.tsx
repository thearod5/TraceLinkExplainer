import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTraceInformation } from "../../api/trace";
import { setError } from "../../redux/actions";
import {
  getCurrentStep,
  getDataset,
  getSelectedSources,
  getSelectedTargets,
  getTrace
} from "../../redux/selectors";
import {
  SELECT_TARGET_STEP,
  VIEW_TRACE_STEP
} from "../../shared/pagechanger/constants";
import { Artifact, Dataset } from "../../shared/types/Dataset";
import { Trace } from "../../shared/types/Trace";
import { NumberSetter } from "../constants";
import SourceArtifactSearch from "../search/SourceArtifactSearchContainer";
import TargetArtifactSearch from "../search/TargetArtifactSearchContainer";
import NoSourceMessage from "./NoSourceMessage";
import { TraceSourceArtifactDisplay } from "./PanelFactory";
import { PanelView } from "./PanelView";
import { handleTraceInformationRequest, updatePanel } from "./TraceArtifactController";



export default function ArtifactSelector() {
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

  const setSelectedSourceIndexAdapter: NumberSetter = (index: number) => {
    if (sourceIndex !== -1)
      setLastSelectedSourceIndex(sourceIndex)
    setSourceIndex(index);
  }

  const setSelectedTargetIndexAdapter = (index: number) => {
    if (targetIndex !== -1)
      setLastSelectedTargetIndex(targetIndex)
    setTargetIndex(index);
  }

  useEffect(() => {
    if (currentStep === SELECT_TARGET_STEP) {
      setLeftPanel(
        <TraceSourceArtifactDisplay
          selectedSources={selectedSources}
          setIndex={setSelectedSourceIndexAdapter}
          sourceIndex={sourceIndex}
        />)
    }
  }, [currentStep, selectedSources, sourceIndex])

  useEffect(() => {
    if (currentStep === SELECT_TARGET_STEP) {
      setRightPanel(<TargetArtifactSearch />);
    }
  }, [currentStep])

  /*
   * Makes Async API call for both panels defined below
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

  /*
   * Asyncronously sets the LEFT and RIGHT panels
   */
  useEffect(() => {
    updatePanel(
      "SOURCE",
      sourceIndex,
      setSelectedSourceIndexAdapter,
      setLeftPanel)
  }, [currentStep, selectedSources, sourceIndex, trace]);

  useEffect(() => {
    updatePanel(
      "TARGET",
      targetIndex,
      setSelectedTargetIndexAdapter,
      setRightPanel)
  }, [currentStep, selectedTargets, targetIndex, trace]);


  const modalOpen = trace.selectedWord !== null

  return (
    <PanelView
      leftPanel={leftPanel}
      rightPanel={rightPanel}
      loading={loading}
      modalOpen={modalOpen}
    />
  );
}
