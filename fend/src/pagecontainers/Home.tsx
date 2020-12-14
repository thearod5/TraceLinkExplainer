import React from 'react'
import DatasetChooser from '../components/datasetchooser/DatasetChooserContainer'

export default function Home () {
  return (
    <div className="flexRowCentered sizeFull">
      <div className="centeredColumn">
        <DatasetChooser />
      </div>
    </div>
  )
}
