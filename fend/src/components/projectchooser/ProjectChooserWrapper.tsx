import React from 'react'
import DatasetChooser from './ProjectChooser'

export default function DatasetChooserWrapper () {
  return (
    <div className="flexRowCentered sizeFull">
      <div className="centeredColumn">
        <DatasetChooser />
      </div>
    </div>
  )
}
