import React from 'react'
import { Dataset } from '../../../shared/Dataset'
import Button from '@material-ui/core/Button';
import styled from 'styled-components'
import PageTitle from '../nav/PageTitle'

interface DatasetSummaryProps {
  dataset: Dataset
}
function DatasetSummary(props: DatasetSummaryProps) {
  return (
    <div>
      <Summary>{props.dataset.summary}</Summary>
      <Operations>
        <OperationContainer>
          <Button size="large" variant="contained" color="primary" href="/explore">Explore</Button>
        </OperationContainer>
        <OperationContainer>
          <Button size="large" variant="contained" color="secondary">Edit</Button>
        </OperationContainer>
      </Operations>
    </div>
  )
}

const Summary = styled.p`
  font-size: 1.5em;
  text-align: center;
`;

const Operations = styled.div`
  display: flex;
  justify-content: center
`;

const OperationContainer = styled.div`
  margin-right: 10px;
  margin-left: 10px;
`
export default DatasetSummary;