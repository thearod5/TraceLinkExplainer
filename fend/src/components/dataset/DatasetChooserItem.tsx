import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import React, { useEffect, useState } from 'react'
import { VoidCallback } from '../../constants'
import DatasetChooserItemDetails from './DatasetChooserItemDetails'

interface DataItemSummaryProps {
  datasetName: string;
  isSelected: boolean;
  select: () => void;
  deselect: () => void;
  onDatasetSelected: VoidCallback
}

export default function DatasetChooserItem (props: DataItemSummaryProps) {
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    const callback = expanded ? props.select : props.deselect
    callback()
    // eslint-disable-next-line
  }, [expanded]);

  const onClick = () => {
    setExpanded(!expanded)
  }

  return (
    <Accordion expanded={expanded} onClick={onClick}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <h4>{props.datasetName}</h4>
      </AccordionSummary>
      <DatasetChooserItemDetails onClick={props.onDatasetSelected} />
    </Accordion>
  )
}
