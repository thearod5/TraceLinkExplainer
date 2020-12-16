import { Box, Button, Fade } from '@material-ui/core'
import React from 'react'
import { FADE_TIMEOUT } from '../../constants'
import LoadingBar from '../meta/LoadingBar'
import { useSelectDataset } from './useSelectDataset'

/* Panel for selecting a dataset
 *
 */
export const DEFAULT_INDEX_SELECTED = -1

export default function DatasetChooser () {
  const [datasetItems] = useSelectDataset()

  return (
    <Fade in={true} timeout={FADE_TIMEOUT}>
      <Box className="roundBorder padMedium" boxShadow={3} >
        <h2 className="textAlignCenter">Datasets</h2>
        <div className="flexColumn padSmall">
          {datasetItems.length === 0 ? (
            LoadingBar()
          ) : (
            datasetItems
          )}
        </div>
        <div className="flexRowCentered padMedium">
          <Button
            disabled
            size="medium"
            color="primary"
            variant="contained"
          >
            New Dataset
          </Button>
        </div>
      </Box>
    </Fade>
  )
}
