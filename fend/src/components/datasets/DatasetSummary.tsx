import Button from "@material-ui/core/Button";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Dataset } from "../../../../shared/Dataset";
import { PAGE_NAV_MARGIN_TOP } from "../nav/PageTitle";
import { SOURCE_ARTIFACT_ROUTE } from "../nav/routes";

const SUMMARY_TOP_MARGIN = 75;

interface DatasetSummaryProps {
  dataset: Dataset;
}

function DatasetSummary(props: DatasetSummaryProps) {
  return (
    <SummaryContainer>
      <Summary>{props.dataset.summary}</Summary>
      <OperationsContainer>
        <Button
          size="large"
          variant="contained"
          color="primary"
          component={Link}
          to={SOURCE_ARTIFACT_ROUTE}
        >
          Explore Artifacts
        </Button>
      </OperationsContainer>
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

const OperationsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-right: 10px;
  margin-left: 10px;
`;

export default DatasetSummary;
