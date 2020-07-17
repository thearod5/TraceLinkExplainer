import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-splitter-layout/lib/index.css";
import styled from "styled-components";
import { getDataset } from "../../redux/selectors";
import "../../styles/App.css";
import DatasetChooser from "../datasets/DatasetChooser";

export default function Home() {
  const dispatch = useDispatch();
  const datasetSelected = useSelector(getDataset).name !== "";

  return (
    <HomeContainer>
      <ContentContainer>
        <DatasetChooser />
      </ContentContainer>
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const OperationsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  margin-bottom: 10px;
  border: 1px solid green;
`;
