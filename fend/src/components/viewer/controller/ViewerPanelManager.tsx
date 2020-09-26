import React from 'react';
import { setTrace } from "../../../redux/actions";
import { getTrace } from "../../../redux/selectors";
import store from "../../../redux/store";
import { createDefaultWordDescriptors } from '../../../shared/artifacts/WordCreator';
import { VIEW_TRACE_STEP } from "../../../shared/pagechanger/constants";
import { Artifact } from "../../../shared/types/Dataset";
import { Trace, TraceInformation } from "../../../shared/types/Trace";
import { ElementSetter, NumberSetter } from "../../constants";
import { createFamilyColors, createTraceArtifactDisplays, getDefaultArtifactDisplay } from '../accordion/ArtifactAccordionFactory';

interface TraceSourceArtifactDisplayProps {
  selectedSources: Artifact[],
  setIndex: NumberSetter,
  sourceIndex: number
}

export function TraceSourceArtifactDisplay(
  props: TraceSourceArtifactDisplayProps
) {
  const { selectedSources, setIndex, sourceIndex } = props
  const sourceArtifactDisplays = selectedSources.map(
    (artifact: Artifact, index: number) =>
      getDefaultArtifactDisplay(
        artifact,
        createDefaultWordDescriptors(artifact.body),
        index === sourceIndex,
        () => setIndex(sourceIndex),
        () => setIndex(-1)
      ))
  return (
    <div className='heightFull overflowScroll'>{sourceArtifactDisplays}</div>
  )
}



export function handleTraceInformationRequest(traceInformation: TraceInformation) {
  const { dispatch } = store
  const trace: Trace = getTrace(store.getState())
  const familyColors = createFamilyColors(
    traceInformation
      .relationships
      .map(relationship => relationship.title));
  dispatch(setTrace({
    ...trace,
    relationships: traceInformation.relationships,
    relationshipColors: familyColors,
    sourceWords: traceInformation.sourceDescriptors,
    targetWords: traceInformation.targetDescriptors,
    selectedWord: null
  }))
}

export function updatePanel(
  type: "SOURCE" | "TARGET",
  selectedArtifactIndex: number,
  setSelectedArtifactIndex: NumberSetter,
  setPanel: ElementSetter
) {
  const state = store.getState();
  const currentStep = store.getState().currentStep
  const trace = store.getState().trace

  const { relationships, relationshipColors, sourceWords, targetWords } = trace;
  const typeIndex = type === "SOURCE" ? 0 : 1

  const selectedArtifactsTuple = [state.selectedSources, state.selectedTargets]
  const artifactWordsTuple = [sourceWords, targetWords]

  const selectedArtifacts: Artifact[] = selectedArtifactsTuple[typeIndex]
  const artifactWords = artifactWordsTuple[typeIndex]

  if (
    currentStep >= VIEW_TRACE_STEP &&
    artifactWords !== null &&
    relationshipColors !== null &&
    relationships !== null
  ) {
    const tracePanel = createTraceArtifactDisplays(
      selectedArtifacts,//artifacts
      relationships,
      selectedArtifactIndex, //selectedArtifact
      artifactWords, //
      relationshipColors,
      setSelectedArtifactIndex
    )
    setPanel(
      tracePanel
    );
  }
}