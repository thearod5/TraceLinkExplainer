import { Box, Grid } from '@material-ui/core'
import React from 'react'

interface SplitPanelProps {
	left: JSX.Element
	right: JSX.Element
}

export default function SplitPanelView (props: SplitPanelProps) {
  const { left, right } = props
  return (
    <Grid container spacing={2} className='sizeFull overflowYScroll'>
      <Grid item xs={6}>
        <Box style={{ maxHeight: '650px' }} boxShadow={2} className="sizeFull roundBorder overflowYScroll">{left}</Box>
      </Grid>
      <Grid item xs={6}>
        <Box style={{ maxHeight: '650px' }} boxShadow={2} className="sizeFull roundBorder overflowYScroll">{right}</Box>
      </Grid>
    </Grid>
  )
}
