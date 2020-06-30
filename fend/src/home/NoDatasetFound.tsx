import React from "react";
import styled from "styled-components";

function NoDatasetFound() {
  return <NotFoundLabel>Please select a dataset...</NotFoundLabel>;
}

const NotFoundLabel = styled.h2`
  position: absolute;
  top: 100px;
  width: 100%;
  text-align: center;
`;

export default NoDatasetFound;
