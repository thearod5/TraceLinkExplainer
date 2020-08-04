import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Dataset } from "../../../../shared/Dataset";
import { RootState } from "../../redux";

const SUMMARY_TOP_MARGIN = 75;

interface DatasetSummaryProps {}

function DatasetSummary(props: DatasetSummaryProps) {
  const dataset: Dataset = useSelector((state: RootState) => state.dataset);

  return (
    <div>
      <Summary>[MARO's WORK]</Summary>
    </div>
  );
}

const Summary = styled.p`
  font-size: 1.5em;
  text-align: center;
  padding: 50px;
`;

export default DatasetSummary;
