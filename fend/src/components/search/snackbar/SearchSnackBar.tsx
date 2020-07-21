import { Button, Snackbar } from "@material-ui/core";
import React from "react";

interface SearchSnackBarProps {
  open: boolean;
  handleClose: () => void;
}
export default function SearchSnackBar(props: SearchSnackBarProps) {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={props.open}
      autoHideDuration={6000}
      onClose={props.handleClose}
      message="Note archived"
      action={
        <React.Fragment>
          <Button color="secondary" size="small" onClick={props.handleClose}>
            UNDO
          </Button>
        </React.Fragment>
      }
    />
  );
}
