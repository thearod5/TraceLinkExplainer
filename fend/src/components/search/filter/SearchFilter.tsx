import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FaceIcon from "@material-ui/icons/Face";
import React from "react";
import styled from "styled-components";
import { BORDER_LINE } from "../../../styles/constants";
import FilterCreator from "./FilterCreator";

interface TabBarProps {}

export default function SearchFilter(props: TabBarProps) {
  const handleClick = () => alert("Chip clicked");
  const handleDelete = () => alert("Chip deleted");

  return (
    <TabBarContainer>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <ChipContainer>
          <Chip
            icon={<FaceIcon />}
            label="Clickable deletable"
            onClick={handleClick}
            onDelete={handleDelete}
          />
        </ChipContainer>
      </AccordionSummary>
      <AccordionDetails>
        <FilterCreator />
      </AccordionDetails>
    </TabBarContainer>
  );
}

const ChipContainer = styled(Box)``;
const TabBarContainer = styled(Accordion)`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TabBarRow = styled(Box)`
  display: flex;
  flex-direct: row;
  justify-content: space-between;
  overflow-x: scroll;
  border-bottom: ${BORDER_LINE};
  border-bottom: ${BORDER_LINE};
`;

const ChipToolbar = styled(Box)``;
