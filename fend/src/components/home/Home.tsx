import React from "react";
import "react-splitter-layout/lib/index.css";
import styled from "styled-components";
import "../../styles/App.css";
import DatasetChooser from "../datasets/DatasetChooser";

export default function Home() {
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
