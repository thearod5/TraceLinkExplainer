import { Box } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { getCurrentStep, getDataset } from "../../redux/selectors";
import { appHistory } from "../../redux/store";
import { primaryColor, secondaryColor } from "../../styles/theme";

const WELCOME_MESSAGE = "TraceViewer";
//TODO: Add button to view dataset. Also make a real nav bar looking thing.
export default function NavBar() {
  const activeStep = useSelector(getCurrentStep) - 1; //recreated index at 0, but remove select dataset move
  const dataset = useSelector(getDataset).name;

  const GoHomeClickHanlder = () => {
    appHistory.push("/");
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
          {activeStep === 0 ? dataset : WELCOME_MESSAGE}
        </h1>
      </div>
    </Box>
  );
}
