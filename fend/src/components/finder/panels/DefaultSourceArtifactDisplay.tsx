import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createDefaultArtifactAccordion } from '../artifact/accordion/ArtifactAccordionFactory'
import { Artifact } from '../../../operations/types/Dataset'
import { setSelectedSourceIndex, setTraceSourceIndex } from '../../../redux/actions'
import { getSelectedSourceIndex, getSelectedSources } from '../../../redux/selectors'

export function DefaultSourceArtifactDisplay () {
  const selectedSources = useSelector(getSelectedSources)
  const selectedSourceIndex = useSelector(getSelectedSourceIndex)
  const dispatch = useDispatch()
  const setIndex = (index: number) => {
    dispatch(setSelectedSourceIndex(index))
    dispatch(setTraceSourceIndex(index))
  }
  const sourceArtifactDisplays = selectedSources.map(
    (artifact: Artifact, index: number) => createDefaultArtifactAccordion(
      artifact,
      artifact.body,
      index === selectedSourceIndex,
      () => setIndex(index),
      () => setIndex(-1)
    ))
  return (
    <div className='heightFull overflowScroll'>{sourceArtifactDisplays}</div>
  )
}
