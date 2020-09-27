import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedSourceIndex, setTrace } from "../../../redux/actions";
import { getSelectedSourceIndex, getSelectedSources, getTrace } from "../../../redux/selectors";
import store from "../../../redux/store";
import { createDefaultWordDescriptors } from '../../../shared/artifacts/WordCreator';
import { Artifact } from "../../../shared/types/Dataset";
import { Trace, TraceInformation } from "../../../shared/types/Trace";
import { ElementSetter } from "../../constants";
import { createDefaultArtifactAccordion, createFamilyColors as createRelationshipColors, TracedArtifactDisplay } from '../tracedartifacts/TracedArtifactsDisplay';


export function DefaultSourceArtifactDisplay() {
  const selectedSources = useSelector(getSelectedSources)
  const selectedSourceIndex = useSelector(getSelectedSourceIndex)
  const dispatch = useDispatch()
  const setIndex = (index: number) => dispatch(setSelectedSourceIndex(index))

  const sourceArtifactDisplays = selectedSources.map(
    (artifact: Artifact, index: number) =>
      createDefaultArtifactAccordion(
        artifact,
        createDefaultWordDescriptors(artifact.body),
        index === selectedSourceIndex,
        () => setIndex(index),
        () => setIndex(-1)
      ))
  return (
    <div className='heightFull overflowScroll'>{sourceArtifactDisplays}</div>
  )
}

export function handleTraceInformationRequest(traceInformation: TraceInformation) {
  const { dispatch } = store
  const trace: Trace = getTrace(store.getState())
  const relationshipColors = createRelationshipColors(
    traceInformation
      .relationships
      .map(relationship => relationship.title));
  dispatch(setTrace({
    ...trace,
    relationships: traceInformation.relationships,
    relationshipColors: relationshipColors,
    sourceWords: traceInformation.sourceDescriptors,
    targetWords: traceInformation.targetDescriptors,
    selectedWord: null
  }))
}

export function updateTraceArtifactDisplayInPanel(
  type: "SOURCE" | "TARGET",
  setPanel: ElementSetter,
  stepsRequired: number[]
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
    stepsRequired.includes(currentStep) &&
    artifactWords !== null &&
    relationshipColors !== null &&
    relationships !== null
  ) {
    const tracePanel = < TracedArtifactDisplay
      type={type}
      artifacts={selectedArtifacts}
      relationships={relationships}
      traceWords={artifactWords}
      relationshipColors={relationshipColors}
    />

    setPanel(
      tracePanel
    );
  }
}