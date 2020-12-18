import { Box, Grid } from '@material-ui/core'
import React from 'react'

export default function SplitPanelView (props: React.PropsWithChildren<{}>) {
  const children = props.children as JSX.Element[]

  return (
    <Grid container spacing={2} className='sizeFull overflowYScroll padMedium'>
      <Grid item xs={6}>
        <Box style={{ maxHeight: '650px' }} boxShadow={2} className="sizeFull roundBorder overflowYScroll">{children[0]}</Box>
      </Grid>
      <Grid item xs={6}>
        <Box style={{ maxHeight: '650px' }} boxShadow={2} className="sizeFull roundBorder overflowYScroll">{children[1]}</Box>
      </Grid>
    </Grid>
  )
}
