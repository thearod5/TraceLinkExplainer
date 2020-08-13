import React from "react";
import styled from "styled-components";
import DatasetChooser from "../datasets/DatasetChooser";

export default function Home() {
  return (
    <HomeContainer>
      <DatasetChooser />
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  height: 100%;
`;
