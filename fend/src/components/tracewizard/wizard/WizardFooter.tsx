import { Button, Grid, Typography } from '@material-ui/core'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import React from 'react'
import { Icon, VoidCallback } from '../../../types/constants'

interface WizardFooterProps {
  stepNames: [string | null, string, string | null];
  onNextStep: VoidCallback;
  onPreviousStep: VoidCallback;
}
export function WizardFooter (props: WizardFooterProps) {
  const { stepNames, onNextStep, onPreviousStep } = props
  const [previousStepName, stepName, nextStepName] = stepNames

  function createButton (name: string, onClick: VoidCallback, startIcon: Icon | null, endIcon: Icon | null) {
    return (<Button
      variant="contained"
      color={startIcon === null ? 'primary' : 'secondary' }
      startIcon={startIcon}
      endIcon={endIcon}
      onClick={onClick}>{name}</Button>)
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={4} className='flexRowCentered'>
        {previousStepName === null ? null
          : createButton(previousStepName, () => onPreviousStep(), <NavigateBeforeIcon />, null)}
      </Grid>
      <Grid item xs={4}>
        <Typography variant='h5' component='h1' align='center'>
          {stepName}
        </Typography>
      </Grid>
      <Grid item xs={4} className='flexRowCentered'>
        {nextStepName === null ? null : createButton(nextStepName, () => onNextStep(), null, <NavigateNextIcon />)}
      </Grid>
    </Grid>
  )
}
