import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { getProjects } from '../../api/projects'
import { AppContext } from '../../App'
import { Project } from '../../operations/types/Project'
import LoadingBar from '../meta/LoadingBar'
import { StepActionsContext } from "../wizard/types"

/* Panel for selecting a dataset
 *
 */
export const DEFAULT_INDEX_SELECTED = -1

export default function DatasetChooser () {
  const { onStepReadyToExit } = useContext(StepActionsContext)
  const { setError, dataset, setDataset } = useContext(AppContext)

  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    getProjects().then(setProjects).catch(e => setError(e))
  }, [dataset.name, setError])

  const selectDatasetAtIndex = (indexToSelect: number) => {
    const datasetAtIndex = projects[indexToSelect]
    setDataset(datasetAtIndex)
    onStepReadyToExit()
  }

  const datasetItems = projects.map((dataset, currentIndex) => (
    <FormControlLabel
      key={dataset.id}
      value={dataset.name}
      control={<Radio color='default' onClick={() => selectDatasetAtIndex(currentIndex)} />}
      label={dataset.name}
    />
  ))
  return (
    <Box className="roundBorder padMedium" boxShadow={3} >
      <FormControl component="fieldset">
        <FormLabel component="legend">Datasets</FormLabel>
        <RadioGroup aria-label="datasets" name="datasets" >
          {datasetItems.length === 0 ? (
            LoadingBar()
          ) : (
            datasetItems
          )}
        </RadioGroup>
      </FormControl>
    </Box>
  )
}
