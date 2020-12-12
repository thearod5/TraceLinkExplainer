import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import React, { useEffect, useState } from 'react'
import DatasetChooserItemDetails from './DatasetChooserItemDetails'

interface DataItemSummaryProps {
  dataset: string;
  isSelected: boolean;
  select: () => void;
  deselect: () => void;
  onRouteSelected: (route: string) => void;
}

function DatasetChooserItem (props: DataItemSummaryProps) {
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    const callback = expanded ? props.select : props.deselect
    callback()
    // eslint-disable-next-line
  }, [expanded]);

  return (
    <Accordion expanded={expanded} onClick={() => setExpanded(!expanded)}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <h4>{props.dataset}</h4>
      </AccordionSummary>
      <DatasetChooserItemDetails onClick={props.onRouteSelected} />
    </Accordion>
  )
}

export default DatasetChooserItem
