import { CircularProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SplitPane from "react-split-pane";
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
  SELECT_SOURCE_STEP,
  SELECT_TARGET_STEP,
  VIEW_TRACE_STEP
} from "../../shared/pagechanger/constants";
import { Artifact, Dataset } from "../../shared/types/Dataset";
import { Trace } from "../../shared/types/Trace";
import { NumberSetter } from "../constants";
import SourceArtifactSearch from "../search/SourceArtifactSearchContainer";
import TargetArtifactSearch from "../search/TargetArtifactSearchContainer";
import { WordModal } from "./accordion/TraceExplanation";
import NoSourceMessage from "./NoSourceMessage";
import { TraceSourceArtifactDisplay } from "./PanelFactory";
import { handleTraceInformationRequest, updatePanel } from "./TraceArtifactController";

export default function ArtifactSelector() {
  const trace: Trace = useSelector(getTrace)
  const dataset: Dataset = useSelector(getDataset);
  const selectedSources: Artifact[] = useSelector(getSelectedSources);
  const selectedTargets: Artifact[] = useSelector(getSelectedTargets);
  const currentStep: number = useSelector(getCurrentStep);

  const [loading, setLoading] = useState(false);
  const [leftPanel, setLeftPanel] = useState<JSX.Element | null>(null);
  const [rightPanel, setRightPanel] = useState<JSX.Element | null>(null);
  const [sourceIndex, setSourceIndex] = useState(0);
  const [targetIndex, setTargetIndex] = useState(0);
  const [lastSelectedSourceIndex, setLastSelectedSourceIndex] = useState(-1);
  const [lastSelectedTargetIndex, setLastSelectedTargetIndex] = useState(-1);

  const dispatch = useDispatch()

  useEffect(() => {
    if (currentStep === SELECT_SOURCE_STEP) {
      setLeftPanel(<SourceArtifactSearch />);
      setRightPanel(<NoSourceMessage />);
    }
  }, [currentStep])

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

  const body = <SplitPane split="vertical">
    {leftPanel}
    {rightPanel}
  </SplitPane>
  const loadingBar =
    <div className="flexColumn heightFull justifyContentCenter">
      <div className="flexRow justifyContentCenter">
        <div className="flexColumn justifyContentCenter">
          <h1 className="padLight" style={{ paddingBottom: "100px" }}>Retrieving Trace Information...</h1>
          <div className="flexRowCentered">
            <CircularProgress color="secondary" size="10rem" />
          </div>
        </div>
      </div>
    </div>

  const open = trace.selectedWord !== null

  let modal = trace.selectedWord === null ? null : <WordModal
    open={open}
  />

  return (
    <div className="flexColumn heightFull overflowYHidden">
      {loading ? loadingBar : body}
      {modal}
    </div>
  );
}
