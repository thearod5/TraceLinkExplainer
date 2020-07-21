import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ItemDetails from "./ItemDetails";

interface DataItemSummaryProps {
  dataset: string;
  isSelected: boolean;
  select: () => void;
  deselect: () => void;
}

function DatasetAccordion(props: DataItemSummaryProps) {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const callback = expanded ? props.select : props.deselect;
    callback();
  }, [expanded, props.select, props.deselect]);

  return (
    <ItemAccordionContainer
      expanded={expanded}
      onClick={() => setExpanded(!expanded)}
    >
      <ItemSummary expandIcon={<ExpandMoreIcon />}>{props.dataset}</ItemSummary>
      <ItemDetails />
    </ItemAccordionContainer>
  );
}

const ItemAccordionContainer = styled(Accordion)``;

const ItemSummary = styled(AccordionSummary)`
  font-weight: bold;
`;

export default DatasetAccordion;
