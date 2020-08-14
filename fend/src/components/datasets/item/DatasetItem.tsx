import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React, { useEffect, useState } from "react";
import DatasetItemDetails from "./DatasetItemDetails";

interface DataItemSummaryProps {
  dataset: string;
  isSelected: boolean;
  select: () => void;
  deselect: () => void;
  onRouteSelected: (route: string) => void;
}

function DatasetItem(props: DataItemSummaryProps) {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const callback = expanded ? props.select : props.deselect;
    callback();
  }, [expanded, props.select, props.deselect]);

  return (
    <Accordion expanded={expanded} onClick={() => setExpanded(!expanded)}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        {props.dataset}
      </AccordionSummary>
      <DatasetItemDetails onClick={props.onRouteSelected} />
    </Accordion>
  );
}

export default DatasetItem;
