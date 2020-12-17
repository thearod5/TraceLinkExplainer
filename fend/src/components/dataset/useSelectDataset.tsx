import React, { useCallback, useContext, useEffect, useState } from 'react'
import { getDatasetNames } from '../../api/datasets'
import { AppContext } from '../../App'
import { initializeEmptyDataset } from '../../operations/initializers'
import { Dataset } from '../../operations/types/Dataset'
import { StepActionsContext } from '../wizard/Wizard'
import { DEFAULT_INDEX_SELECTED } from './DatasetChooser'
import DatasetChooserItem from './DatasetChooserItem'

export function useSelectDataset () {
  const { onNextStep } = useContext(StepActionsContext)
  const { setError, dataset, setDataset } = useContext(AppContext)

  const [indexSelected, setIndexSelected] = useState(DEFAULT_INDEX_SELECTED)
  const [datasets, setDatasetsNames] = useState<Dataset[]>([])

  useEffect(() => {
    getDatasetNames().then((datasetDescriptors) => {
      datasetDescriptors.forEach((datasetDescriptor, index) => dataset.name === datasetDescriptor.name ? setIndexSelected(index) : null
      )
      setDatasetsNames(datasetDescriptors)
    }).catch(e => setError(e))
  }, [dataset.name, setError])

  const selectDatasetAtIndex = (indexToSelect: number) => {
    const datasetAtIndex = datasets[indexToSelect]
    setDataset(datasetAtIndex)
  }

  const deselectDataset = useCallback(() => {
    setDataset(initializeEmptyDataset())
    setIndexSelected(DEFAULT_INDEX_SELECTED)
  }, [setDataset])

  const datasetItems = datasets.map((dataset, currentIndex) => (
    <DatasetChooserItem
      key={dataset.id}
      datasetName={dataset.name}
      isSelected={currentIndex === indexSelected}
      select={() => selectDatasetAtIndex(currentIndex)}
      deselect={deselectDataset}
      onDatasetSelected={() => onNextStep()} />
  ))
  return [datasetItems]
}
