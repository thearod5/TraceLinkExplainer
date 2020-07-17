import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Dataset } from "../../../../shared/Dataset";
import { RootState } from "../../redux";
import { PAGE_NAV_MARGIN_TOP } from "../nav/PageTitle";

const SUMMARY_TOP_MARGIN = 75;

interface DatasetSummaryProps {}

function DatasetSummary(props: DatasetSummaryProps) {
  const dataset: Dataset = useSelector((state: RootState) => state.dataset);

  return (
    <SummaryContainer>
      <Summary>{dataset.summary}</Summary>
    </SummaryContainer>
  );
}

const SummaryContainer = styled.div`
  margin-top: ${PAGE_NAV_MARGIN_TOP + SUMMARY_TOP_MARGIN}px;
`;

const Summary = styled.p`
  font-size: 1.5em;
  text-align: center;
`;

export default DatasetSummary;
