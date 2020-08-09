import { Box } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { getCurrentStep, getDataset } from "../../redux/selectors";
import { history } from "../../redux/store";
import theme, { secondaryColor } from "../../styles/theme";

const WELCOME_MESSAGE = "TraceViewer";
//TODO: Add button to view dataset. Also make a real nav bar looking thing.
export default function NavBar() {
  const activeStep = useSelector(getCurrentStep) - 1; //recreated index at 0, but remove select dataset move
  const dataset = useSelector(getDataset).name;

  const GoHomeClickHanlder = () => {
    history.push("/");
  };

  return (
    <NavBarContainer color="secondary" boxShadow={3}>
      <NavBarTitle onClick={GoHomeClickHanlder}>
        {activeStep === 0 ? WELCOME_MESSAGE : dataset}
      </NavBarTitle>
    </NavBarContainer>
  );
}

const NavBarContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  width: 100%;
  background-color: ${secondaryColor};
`;

const NavBarTitle = styled.h1`
  line-height: 100%;
  color: ${theme.palette.primary.main};
  padding: 10px;
`;
