import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedSourceIndex, setTrace, setTraceSourceIndex, setTraceTargetIndex } from "../../../redux/actions";
import { getSelectedSourceIndex, getSelectedSources, getTrace } from "../../../redux/selectors";
import store from "../../../redux/store";
import { createDefaultWordDescriptors } from '../../../shared/artifacts/WordCreator';
import { Artifact } from "../../../shared/types/Dataset";
import { Trace, TraceInformation } from "../../../shared/types/Trace";
import { ElementSetter } from "../../constants";
import { createDefaultArtifactAccordion, createFamilyColors as createRelationshipColors, TracedArtifactDisplay } from '../panels/TracedArtifactsDisplay';


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
  dispatch(setTraceSourceIndex(sourceIndex))
  dispatch(setTraceTargetIndex(targetIndex))
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