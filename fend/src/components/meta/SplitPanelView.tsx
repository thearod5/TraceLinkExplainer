import { Box, Grid } from '@material-ui/core'
import React from 'react'

interface SplitPanelProps {
	left: JSX.Element
	right: JSX.Element
}

export default function SplitPanelView (props: SplitPanelProps) {
  const { left, right } = props
  return (
    <Grid container spacing={2} className='sizeFull'>
      <Grid item xs={6}>
        <Box boxShadow={2} className="roundBorder">{left}</Box>
      </Grid>
      <Grid item xs={6}>
        <Box boxShadow={2} className="roundBorder">{right}</Box>
      </Grid>
    </Grid>
  )
}
