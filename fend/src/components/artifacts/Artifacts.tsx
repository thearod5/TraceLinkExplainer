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
  getSelectedTargets
} from "../../redux/selectors";
import {
  createDefaultWordDescriptors
} from "../../shared/artifacts/WordCreator";
import {
  SELECT_SOURCE_STEP,
  SELECT_TARGET_STEP,
  VIEW_TRACE_STEP
} from "../../shared/pagechanger/constants";
import { Artifact, Dataset } from "../../shared/types/Dataset";
import { Relationships, WordDescriptors } from "../../shared/types/Trace";
import SourceArtifactSearch from "../search/SourceArtifactSearchContainer";
import TargetArtifactSearch from "../search/TargetArtifactSearchContainer";
import { createFamilyColors, createTraceArtifactDisplays, getDefaultArtifactDisplay } from "./accordion/ArtifactAccordionFactory";
import NoSourceMessage from "./NoSourceMessage";

export default function ArtifactSelector() {
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

  const [targetWords, setTargetWords] = useState<WordDescriptors | null>(null);
  const [sourceWords, setSourceWords] = useState<WordDescriptors | null>(null);
  const [families, setFamilies] = useState<Relationships | null>(null);
  const [traceFamilyColors, setTraceFamilyColors] = useState<Record<string, string> | null>(null);

  const dispatch = useDispatch()

  useEffect(() => {
    if (currentStep === SELECT_SOURCE_STEP) {
      setLeftPanel(<SourceArtifactSearch />);
      setRightPanel(<NoSourceMessage />);
    }
  }, [currentStep])

  const setSelectedSourceIndexAdapter = (index: number) => {
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
        <div className='heightFull overflowScroll'>
          {selectedSources.map((artifact: Artifact, index: number) =>
            getDefaultArtifactDisplay(
              artifact,
              createDefaultWordDescriptors(artifact.body),
              index === sourceIndex,
              () => setSelectedSourceIndexAdapter(sourceIndex),
              () => setSelectedSourceIndexAdapter(-1)
            ))}
        </div>
      )
    }
    // eslint-disable-next-line
  }, [currentStep, selectedSources, sourceIndex])

  useEffect(() => {
    if (currentStep === SELECT_TARGET_STEP) {
      setRightPanel(<TargetArtifactSearch />);
    }
  }, [currentStep])

  /*
   * Makes Async API call for both panels defined below
   */

  useEffect(() => {
    if (
      currentStep === VIEW_TRACE_STEP &&
      sourceIndex > -1 &&
      targetIndex > -1 &&
      (sourceIndex !== lastSelectedSourceIndex &&
        targetIndex !== lastSelectedTargetIndex)) {
      const sourceArtifact = selectedSources[sourceIndex];
      const targetArtifact = selectedTargets[targetIndex];
      setLoading(true)
      getTraceInformation(dataset.name, sourceArtifact, targetArtifact) // change with state index
        .then((traceInformation) => {
          console.log(traceInformation.relationships)
          const familyColors = createFamilyColors(
            traceInformation
              .relationships
              .map(relationship => relationship.title));
          setTraceFamilyColors(familyColors)
          setSourceWords(traceInformation.sourceDescriptors)
          setTargetWords(traceInformation.targetDescriptors)
          setFamilies(traceInformation.relationships)
          setLoading(false)
        })
        .catch((e) => {
          setLoading(false)
          dispatch(setError(e))
        });
    }
    // eslint-disable-next-line
  }, [dataset.name, currentStep, selectedSources, sourceIndex, selectedTargets, targetIndex]);

  /*
   * Asyncronously sets the LEFT PANEL
   */
  useEffect(() => {
    if (
      currentStep >= VIEW_TRACE_STEP &&
      sourceWords !== null &&
      traceFamilyColors !== null &&
      families !== null
    ) {
      const leftTracePanel = createTraceArtifactDisplays(
        selectedSources,
        families,
        sourceIndex,
        sourceWords,
        traceFamilyColors,
        setSelectedSourceIndexAdapter)
      setLeftPanel(
        leftTracePanel
      );
    } else {
      setError(`SourceWords: ${sourceWords === null}`)
    }
    // eslint-disable-next-line
  }, [currentStep, selectedSources, sourceIndex, sourceWords, traceFamilyColors, families]);

  /*
  * Asyncronously sets the RIGHT PANEL
  */
  useEffect(() => {
    if (
      currentStep >= VIEW_TRACE_STEP &&
      targetWords !== null &&
      traceFamilyColors !== null &&
      families !== null
    ) {
      const rightTracePanel = createTraceArtifactDisplays(
        selectedTargets,
        families,
        targetIndex,
        targetWords,
        traceFamilyColors,
        setSelectedTargetIndexAdapter)
      setRightPanel(
        rightTracePanel
      );
    }
    // eslint-disable-next-line
  }, [currentStep, selectedTargets, targetIndex, targetWords, traceFamilyColors, families]);


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

  return (
    <div className="flexColumn heightFull overflowYHidden">
      {loading ? loadingBar : body}
    </div>
  );
}
