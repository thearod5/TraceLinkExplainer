import { Box, Button, Fade, LinearProgress } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDatasetNames } from '../../api/datasets'
import { FADE_TIMEOUT, FIRST_STEP_IN_WIZARD, SELECT_SOURCES_ROUTE } from '../../constants'
import { getStepChangeError } from '../../operations/pagechanger/PageChanger'
import { Dataset } from '../../operations/types/Dataset'
import {
  changeStep,
  clearData,
  selectDataset,
  setError
} from '../../redux/actions'
import { getDataset } from '../../redux/selectors'
import { appHistory } from '../../redux/store'
import DatasetChooserItem from './DatasetChooserItem'

const DEFAULT_INDEX_SELECTED = -1

export default function DatasetChooser () {
  const [datasetItems] = useSelectDataset()

  return (
    <Fade in={true} timeout={FADE_TIMEOUT}>
      <Box className="roundBorder padMedium" boxShadow={3}>
        <h2 className="textAlignCenter">Datasets</h2>
        <div className="flexColumn padSmall">
          {datasetItems.length === 0 ? (
            <LinearProgress color="secondary" />
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
          // TODO: Functionality for this
          >
            New Dataset
          </Button>
        </div>
      </Box>
    </Fade>
  )
}

function useSelectDataset () {
  const dataset = useSelector(getDataset)
  const dispatch = useDispatch()

  const [indexSelected, setIndexSelected] = useState(DEFAULT_INDEX_SELECTED)
  const [datasets, setDatasetsNames] = useState<Dataset[]>([])

  useEffect(() => {
    dispatch(changeStep(0))
  }, [])

  useEffect(() => {
    getDatasetNames().then((datasetDescriptors) => {
      datasetDescriptors.forEach((datasetDescriptor, index) =>
        dataset.name === datasetDescriptor.name ? setIndexSelected(index) : null
      )
      setDatasetsNames(datasetDescriptors)
    }).catch(e => e)
  }, [dataset.name])

  const selectDatasetAtIndex = (indexToSelect: number) => {
    const datasetAtIndex = datasets[indexToSelect]
    dispatch(selectDataset(datasetAtIndex))
  }

  const deselectDataset = () => {
    dispatch(clearData())
    setIndexSelected(DEFAULT_INDEX_SELECTED)
  }
  const onRouteSelected = (route: string) => {
    if (route === SELECT_SOURCES_ROUTE) {
      const error = getStepChangeError(FIRST_STEP_IN_WIZARD)
      if (error === undefined) {
        dispatch(changeStep(FIRST_STEP_IN_WIZARD))
        appHistory.push(route)
      } else dispatch(setError(error))
    }
  }

  const datasetItems = datasets.map((dataset, currentIndex) => (
    <DatasetChooserItem
      key={dataset.id}
      datasetName={dataset.name}
      isSelected={currentIndex === indexSelected}
      select={() => selectDatasetAtIndex(currentIndex)}
      deselect={() => deselectDataset}
      onRouteSelected={onRouteSelected}
    />
  ))
  return [datasetItems]
}
