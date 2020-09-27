import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedSourceIndex, setSelectedTargetIndex, setTrace, setTraceSourceIndex, setTraceTargetIndex } from "../../../redux/actions";
import { getSelectedSourceIndex, getSelectedSources, getTrace } from "../../../redux/selectors";
import store, { NOT_CACHED } from "../../../redux/store";
import { createDefaultWordDescriptors } from '../../../shared/artifacts/WordCreator';
import { Artifact } from "../../../shared/types/Dataset";
import { Trace, TraceInformation } from "../../../shared/types/Trace";
import { ElementSetter } from "../../constants";
import { createDefaultArtifactAccordion, createFamilyColors as createRelationshipColors, TracedArtifactDisplay } from '../tracedartifacts/TracedArtifactsDisplay';


export function DefaultSourceArtifactDisplay() {
  const selectedSources = useSelector(getSelectedSources)
  const selectedSourceIndex = useSelector(getSelectedSourceIndex)
  const dispatch = useDispatch()
  const setIndex = (index: number) => {
    dispatch(setSelectedSourceIndex(index))
    dispatch(setTraceSourceIndex(index))
  }
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

export function handleTraceInformationRequest(
  traceInformation: TraceInformation,
  sourceIndex: number,
  targetIndex: number
) {
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
  console.log("DEBUG", "SETTING TRACE", trace)
  dispatch(setTraceSourceIndex(sourceIndex))
  dispatch(setTraceTargetIndex(targetIndex))
  if (targetIndex === NOT_CACHED)
    dispatch(setSelectedTargetIndex(targetIndex))
  if (sourceIndex === NOT_CACHED)
    dispatch(setSelectedSourceIndex(sourceIndex))
}

export function updateTraceArtifactDisplayInPanel(
  type: "SOURCE" | "TARGET",
  setPanel: ElementSetter,
  stepsRequired: number[]
) {
  const currentStep = store.getState().currentStep
  if (stepsRequired.includes(currentStep)) {
    const tracePanel = < TracedArtifactDisplay
      type={type}
    />

    setPanel(
      tracePanel
    );
  }
}