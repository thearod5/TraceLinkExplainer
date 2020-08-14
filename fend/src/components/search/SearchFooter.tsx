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
  const previousPageButton =
    props.page === 1 ? null : (
      <IconButton onClick={props.onPreviousPage}>
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
  const nextPageButton =
    props.page === props.totalPages ? null : (
      <IconButton onClick={props.onNextPage}>
        <ArrowForwardIosIcon></ArrowForwardIosIcon>
      </IconButton>
    );

  const nextStepButton = (
    <FormControlLabel
      control={
        <Checkbox
          checked={props.completed}
          color="primary"
          icon={<KeyboardTabIcon color={"secondary"} />}
        />
      }
      label={props.message}
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
