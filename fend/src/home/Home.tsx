import React, { useEffect, useState } from 'react'
import '../styles/App.css'
import { Dataset } from '../../../shared/Dataset'
import { getDataset } from '../api/base'
import SplitterLayout from 'react-splitter-layout'
import 'react-splitter-layout/lib/index.css'
import DatasetSummary from '../datasets/DatasetSummary'
import NoDatasetFound from './NoDatasetFound'
import DatasetChooser from './DatasetChooser'

const datasetName = 'Drone';

function Home() {
  const [dataset, setDataset] = useState<Dataset | undefined>(undefined)

  useEffect(() => {
    getDataset(datasetName).then(setDataset);
  }, [dataset])

  if (dataset)
    return (
      <SplitterLayout percentage={true} primaryMinSize={75}>
        <DatasetSummary dataset={dataset}></DatasetSummary>
        <DatasetChooser></DatasetChooser>
      </SplitterLayout>
    )
  else
    return (
      <SplitterLayout percentage={true} primaryMinSize={75}>
        <NoDatasetFound></NoDatasetFound>
        <DatasetChooser></DatasetChooser>
      </SplitterLayout>

    )
}

export default Home
