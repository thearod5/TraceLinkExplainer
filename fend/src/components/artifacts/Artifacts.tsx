import { CircularProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SplitPane from "react-split-pane";
import { getTraceInformation } from "../../api/trace";
import { setError } from "../../redux/actions";
import {
  getCurrentStep,
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
import { Artifact } from "../../shared/types/Dataset";
import { Families, WordDescriptors } from "../../shared/types/Trace";
import { createFamilyColors, createTraceArtifactDisplays, getDefaultArtifactDisplay } from "./ArtifactDisplayFactory";
import NoSourceMessage from "./NoSourceMessage";
import SourceArtifactSearch from "./search/SourceArtifactSearch";
import TargetArtifactSearch from "./search/TargetArtifactSearch";

export default function ArtifactSelector() {
  const selectedSources: Artifact[] = useSelector(getSelectedSources);
  const selectedTargets: Artifact[] = useSelector(getSelectedTargets);
  const currentStep: number = useSelector(getCurrentStep);

  const [loading, setLoading] = useState(false);
  const [leftPanel, setLeftPanel] = useState<JSX.Element | null>(null);
  const [rightPanel, setRightPanel] = useState<JSX.Element | null>(null);
  const [sourceIndex, setSourceIndex] = useState(0);
  const [targetIndex, setTargetIndex] = useState(0);
  const [targetWords, setTargetWords] = useState<WordDescriptors | null>(null);
  const [sourceWords, setSourceWords] = useState<WordDescriptors | null>(null);
  const [families, setFamilies] = useState<Families | null>(null);
  const [traceFamilyColors, setTraceFamilyColors] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    if (currentStep === SELECT_SOURCE_STEP) {
      setLeftPanel(<SourceArtifactSearch />);
      setRightPanel(<NoSourceMessage />);
    }
  }, [currentStep])

  useEffect(() => {
    if (currentStep === SELECT_TARGET_STEP) {
      setLeftPanel(
        <div className='heightFull overflowScroll'>
          {selectedSources.map((artifact: Artifact, index: number) =>
            getDefaultArtifactDisplay(
              artifact,
              createDefaultWordDescriptors(artifact.body),
              index === sourceIndex,
              () => setSourceIndex(index),
              () => setSourceIndex(-1)
            ))}
        </div>
      )
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
  useEffect(() => {
    if (
      currentStep === VIEW_TRACE_STEP &&
      sourceIndex > -1 &&
      targetIndex > -1) {
      const sourceArtifact = selectedSources[sourceIndex];
      const targetArtifact = selectedTargets[targetIndex];
      setLoading(true)
      getTraceInformation("Drone", sourceArtifact, targetArtifact) // change with state index
        .then((traceInformation) => {
          const familyColors = createFamilyColors(Object.keys(traceInformation.families));
          setTraceFamilyColors(familyColors)
          setSourceWords(traceInformation.sourceDescriptors)
          setTargetWords(traceInformation.targetDescriptors)
          setFamilies(traceInformation.families)
          setLoading(false)
        })
        .catch((e) => {
          setLoading(false)
          console.error(e)
        });
    }
  }, [currentStep, selectedSources, sourceIndex, selectedTargets, targetIndex]);

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
        setSourceIndex)
      setLeftPanel(
        leftTracePanel
      );
    } else {
      setError(`SourceWords: ${sourceWords === null}`)
    }
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
        setTargetIndex)
      setRightPanel(
        rightTracePanel
      );
    }
  }, [currentStep, selectedTargets, targetIndex, targetWords, traceFamilyColors, families]);


  const body = <SplitPane split="vertical">
    {leftPanel}
    {rightPanel}
  </SplitPane>
  const loadingBar = <div className="flexColumn heightFull justifyContentCenter">
    <div className="flexRow justifyContentCenter"><CircularProgress color="secondary" size="10rem" /></div>
  </div>
  return (
    <div className="flexColumn heightFull overflowYHidden">
      {loading ? loadingBar : body}
    </div>
  );
}
