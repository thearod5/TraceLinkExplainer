import { IconButton, Snackbar } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import React from "react";

interface SearchSnackBarProps {
  error: string | undefined;
  handleClose: () => void;
}

export default function SearchSnackBar(props: SearchSnackBarProps) {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={props.error !== undefined}
      autoHideDuration={3000}
      onClose={props.handleClose}
      action={
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={props.handleClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      }
    >
      <Alert severity="warning">{props.error}</Alert>
    </Snackbar>
  );
}
function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
