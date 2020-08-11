import React from "react";
import styled from "styled-components";

interface DatasetSummaryProps {}

function DatasetViewer(props: DatasetSummaryProps) {
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

export default DatasetViewer;
