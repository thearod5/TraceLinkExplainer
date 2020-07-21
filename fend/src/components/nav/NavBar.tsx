import { Box } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { getCurrentStep, getDataset } from "../../redux/selectors";
import { history } from "../../redux/store";
import WorkflowStepper from "./WorkflowStepper";

const WELCOME_MESSAGE = "TraceViewer";
//TODO: Add button to view dataset. Also make a real nav bar looking thing.
export default function NavBar() {
  const activeStep = useSelector(getCurrentStep) - 1; //recreated index at 0, but remove select dataset move
  const dataset = useSelector(getDataset).name;

  const GoHomeClickHanlder = () => {
    history.push("/");
  };

  return (
    <NavBarContainer boxShadow={2}>
      <NavBarTitle onClick={GoHomeClickHanlder}>
        {activeStep === -1 ? WELCOME_MESSAGE : dataset}
      </NavBarTitle>
      {activeStep >= 0 ? <WorkflowStepper /> : null}
    </NavBarContainer>
  );
}

export const NAV_BAR_HEIGHT = 50;

const NavBarContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  min-height: ${NAV_BAR_HEIGHT}px;
  width: 100%;
`;

const NavBarTitle = styled.h1`
  font: 1em
  padding: 10px;
`;
