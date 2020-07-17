import React from "react";
import styled from "styled-components";
import WorkflowStepper from "./WorkflowStepper";

//TODO: Add button to view dataset. Also make a real nav bar looking thing.
export default function NavBar() {
  return (
    <NavBarContainer>
      <WorkflowStepper />
    </NavBarContainer>
  );
}

const NavBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;
