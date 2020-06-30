import Button from "@material-ui/core/Button";
import React from "react";
import styled from "styled-components";
import { Dataset } from "../../../shared/Dataset";
import { HEIGHT_FROM_TOP_NUM } from "../nav/PageTitle";

const SUMMARY_TOP_MARGIN = 75;

interface DatasetSummaryProps {
  dataset: Dataset;
}
function DatasetSummary(props: DatasetSummaryProps) {
  return (
    <SummaryContainer>
      <Summary>{props.dataset.summary}</Summary>
      <Operations>
        <OperationContainer>
          <Button
            size="large"
            variant="contained"
            color="primary"
            href="/explore"
          >
            Explore
          </Button>
        </OperationContainer>
        <OperationContainer>
          <Button size="large" variant="contained" color="secondary">
            Edit
          </Button>
        </OperationContainer>
      </Operations>
    </SummaryContainer>
  );
}

const SummaryContainer = styled.div`
  margin-top: ${HEIGHT_FROM_TOP_NUM + SUMMARY_TOP_MARGIN}px;
`;

const Summary = styled.p`
  font-size: 1.5em;
  text-align: center;
`;

const Operations = styled.div`
  display: flex;
  justify-content: center;
`;

const OperationContainer = styled.div`
  margin-right: 10px;
  margin-left: 10px;
`;
export default DatasetSummary;
