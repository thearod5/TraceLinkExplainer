import React from "react";
import styled from "styled-components";

const helpMessage = "No source artifact selected.";

export default function NoSourceMessage() {
  return (
    <NoSourceMessageContainer>
      <NoSourceMessageText>{helpMessage}</NoSourceMessageText>
    </NoSourceMessageContainer>
  );
}

const NoSourceMessageContainer = styled.div`
  text-align: center;
  border: 3px solid green;
`;

const NoSourceMessageText = styled.p`
  padding: 50% 0px;
`;
