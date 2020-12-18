import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { getProjects } from '../../api/projects'
import { AppContext } from '../../App'
import { Project } from '../../types/Project'
import AppLoadingBar from '../meta/AppLoadingBar'
import { StepActionsContext } from '../tracewizard/wizard/types'

/* Panel for selecting a project
 *
 */
const CHOOSER_MIN_HEIGHT = '200px'

export default function DatasetChooser () {
  const { onStepReadyToExit } = useContext(StepActionsContext)
  const { setError, project, setDataset } = useContext(AppContext)

  const [projects, setProjects] = useState<Project[]>([])
  const [selectedIndex, setSelectedIndex] = useState(-1)

  useEffect(() => {
    getProjects().then(setProjects).catch(e => setError(e))
  }, [project.name, setError])

  const selectDatasetAtIndex = (indexToSelect: number) => {
    const projectAtIndex = projects[indexToSelect]
    setDataset(projectAtIndex)
    onStepReadyToExit()
    setSelectedIndex(indexToSelect)
  }

  const projectItems = projects.map((p, currentIndex) => (
    <FormControlLabel
      key={p.id}
      value={p.name}
      checked={selectedIndex === currentIndex || p.id === project.id}
      control={<Radio color='default' onClick={() => selectDatasetAtIndex(currentIndex)} />}
      label={<Typography variant='h6'>{p.name}</Typography>}
    />
  ))
  return (
    <Box className="flexRowCentered roundBorder padMedium" boxShadow={3} color='default' style={{ minHeight: CHOOSER_MIN_HEIGHT, minWidth: CHOOSER_MIN_HEIGHT }}>
      <FormControl component="fieldset">
        <FormLabel component="legend"><h3 className='textDecorationUnderline padSmall'>Projects</h3></FormLabel>
        <RadioGroup aria-label="projects" name="projects" >
          {projectItems.length === 0 ? (
            AppLoadingBar()
          ) : (
            projectItems
          )}
        </RadioGroup>
      </FormControl>
    </Box>
  )
}
