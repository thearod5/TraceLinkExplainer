import { Box, Checkbox, FormControlLabel, IconButton } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import KeyboardTabIcon from "@material-ui/icons/KeyboardTab";
import React from "react";
import { primaryColor } from "../../styles/theme";

interface SearchFooterProps {
  page: number;
  totalPages: number;
  message: string;
  completed: boolean;
  onStepCompleted: () => void;
  onNextPage: () => void;
  onPreviousPage: () => void;
}

export function SearchFooter(props: SearchFooterProps) {
  const previousPageButton = (
    <IconButton
      color="secondary"
      disabled={props.page === 1}
      onClick={props.onPreviousPage}
    >
      <ArrowBackIosIcon></ArrowBackIosIcon>
    </IconButton>
  );
  const pageLabel = (
    <div className="centeredColumn padLight">
      <label className="bold">
        Page {props.page} / {props.totalPages}
      </label>
    </div>
  );
  const nextPageButton = (
    <IconButton
      color="secondary"
      disabled={props.page === props.totalPages}
      onClick={props.onNextPage}
    >
      <ArrowForwardIosIcon></ArrowForwardIosIcon>
    </IconButton>
  );

  const nextStepButton = (
    <FormControlLabel
      className="padLight"
      control={
        <Checkbox
          checked={props.completed}
          color="primary"
          icon={<KeyboardTabIcon color={"secondary"} />}
        />
      }
      label={props.message}
      labelPlacement="start"
    />
  );

  return (
    <Box
      className="centeredColumn sizeFull"
      style={{
        backgroundColor: primaryColor,
      }}
      boxShadow={3}
    >
      <div className="flexRow justifyContentSpaceBetween widthFull">
        <div className="flexRowCentered">
          {previousPageButton}
          {pageLabel}
          {nextPageButton}
        </div>

        <div className="flexRowCentered" onClick={props.onStepCompleted}>
          {nextStepButton}
        </div>
      </div>
    </Box>
  );
}
