import { IconButton, Snackbar } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import React from "react";

interface SearchSnackBarProps {
  error: string | undefined;
  handleClose: () => void;
}

export default function AppSnackBar(props: SearchSnackBarProps) {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      open={props.error !== undefined}
      autoHideDuration={10000}
      onClose={props.handleClose}
    >
      <Alert severity="error" style={{ width: "100%" }}>
        {props.error}

        <IconButton
          className="padSideLight"
          size="small"
          aria-label="close"
          color="inherit"
          onClick={props.handleClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Alert>
    </Snackbar>
  );
}
function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
