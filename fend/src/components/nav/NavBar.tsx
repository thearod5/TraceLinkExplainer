import { Box } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { getCurrentStep, getDataset } from "../../redux/selectors";
import { appHistory } from "../../redux/store";
import { primaryColor, secondaryColor } from "../../styles/theme";
import { HOME_ROUTE } from "../constants";

const WELCOME_MESSAGE = "TraceViewer";
//TODO: Add button to view dataset. Also make a real nav bar looking thing.
export default function NavBar() {
  const currentStep = useSelector(getCurrentStep); //recreated index at 0, but remove select dataset move
  const dataset = useSelector(getDataset).name;

  const GoHomeClickHanlder = () => {
    appHistory.push(HOME_ROUTE);
  };

  return (
    <Box
      color="secondary"
      boxShadow={3}
      className="flexRowCentered sizeFull"
      style={{ backgroundColor: `${secondaryColor}` }}
    >
      <div className="centeredColumn">
        <h1
          onClick={GoHomeClickHanlder}
          className="padLight"
          style={{ color: primaryColor }}
        >
          {currentStep === 0 ? WELCOME_MESSAGE : dataset}
        </h1>
      </div>
    </Box>
  );
}
