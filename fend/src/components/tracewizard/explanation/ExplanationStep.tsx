import { Grid } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { getTraceInformation } from '../../../api/trace'
import { AppContext } from '../../../App'
import { UNSELECTED_INDEX } from '../../../constants'
import { Trace } from '../../../operations/types/Trace'
import { initializeEmptyTrace } from '../../../operations/initializers'
import LoadingBar from '../../meta/LoadingBar'
import { createRelationshipColors } from '../artifact/accordion/ArtifactAccordionFactory'
import { SelectedArtifactsContainer } from '../finder/panels/TracedArtifactsDisplay'
import { ArtifactSetContext } from '../types'
import ExplanationPanel from './ExplanationPanel'
import useTraceExplanationListener from './hooks/useTraceExplanationListener'

export default function ExplanationStep () {
  const { dataset, setError } = useContext(AppContext)
  const { traceSet } = useContext(ArtifactSetContext)
  const [modalOpen] = useTraceExplanationListener()
  const [trace, setTrace] = useState<Trace>(initializeEmptyTrace())

  const [selectedSource, setSelectedSource] = useState<number>(UNSELECTED_INDEX)
  const [selectedTarget, setSelectedTarget] = useState<number>(UNSELECTED_INDEX)
  const [isLoading, setIsLoading] = useState(false)

  const sourceArtifacts = traceSet.map(ts => ts.sourceArtifact)
  const targetArtifacts = traceSet.map(ts => ts.tracedArtifacts).flat()

  useEffect(() => {
    if (selectedSource !== UNSELECTED_INDEX && selectedTarget !== UNSELECTED_INDEX) {
      setIsLoading(true)
      getTraceInformation(dataset.name, sourceArtifacts[selectedSource], targetArtifacts[selectedTarget]) // change with state index
        .then((traceInformation) => {
          const relationshipColors = createRelationshipColors(
            traceInformation
              .relationships
              .map(relationship => relationship.title))
          setTrace({
            ...trace,
            relationships: traceInformation.relationships,
            relationshipColors: relationshipColors,
            sourceWords: traceInformation.sourceDescriptors,
            targetWords: traceInformation.targetDescriptors,
            selectedWord: null
          })
          setIsLoading(false)
        })
        .catch((e) => {
          setIsLoading(false)
          setError(e)
        })
    } else {
      setTrace(initializeEmptyTrace())
    }
  }, [selectedTarget, selectedSource, dataset, setError, sourceArtifacts, targetArtifacts, trace])

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        {isLoading ? LoadingBar() : <SelectedArtifactsContainer artifacts={sourceArtifacts} traceWords={trace.sourceWords} onItemClick={setSelectedSource}/>}
      </Grid>
      <Grid item xs={6}>
        {isLoading ? LoadingBar() : <SelectedArtifactsContainer artifacts={targetArtifacts} traceWords={trace.targetWords} onItemClick={setSelectedTarget}/>}
      </Grid>
      <Grid item xs={12}>
        <ExplanationPanel open={modalOpen} />
      </Grid>
    </Grid>
  )
}
