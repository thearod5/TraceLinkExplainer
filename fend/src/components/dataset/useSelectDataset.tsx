import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDatasetNames } from '../../api/datasets'
import { AppContext } from '../../App'
import { FIRST_STEP_IN_WIZARD, SELECT_SOURCES_ROUTE } from '../../constants'
import { getStepChangeError } from '../../operations/pagechanger/PageChanger'
import { Dataset } from '../../operations/types/Dataset'
import {
  changeStep,
  clearData,
  selectDataset
} from '../../redux/actions'
import { getDataset } from '../../redux/selectors'
import { appHistory } from '../../redux/store'
import { DEFAULT_INDEX_SELECTED } from './DatasetChooser'
import DatasetChooserItem from './DatasetChooserItem'

export function useSelectDataset () {
  const dataset = useSelector(getDataset)
  const dispatch = useDispatch()
  const { setError } = useContext(AppContext)

  const [indexSelected, setIndexSelected] = useState(DEFAULT_INDEX_SELECTED)
  const [datasets, setDatasetsNames] = useState<Dataset[]>([])

  useEffect(() => {
    dispatch(changeStep(0))
  }, [dispatch])

  useEffect(() => {
    getDatasetNames().then((datasetDescriptors) => {
      datasetDescriptors.forEach((datasetDescriptor, index) => dataset.name === datasetDescriptor.name ? setIndexSelected(index) : null
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
      } else { setError(error) }
    }
  }

  const datasetItems = datasets.map((dataset, currentIndex) => (
    <DatasetChooserItem
      key={dataset.id}
      datasetName={dataset.name}
      isSelected={currentIndex === indexSelected}
      select={() => selectDatasetAtIndex(currentIndex)}
      deselect={() => deselectDataset}
      onRouteSelected={onRouteSelected} />
  ))
  return [datasetItems]
}
