import { CircularProgress } from "@material-ui/core";
import React from 'react';
import ViewerModal from "../explanation/ViewerModal";

const title = "Retrieving Trace Information"

interface LoadingBarProps {
  open: boolean
}

export default function LoadingBar(props: LoadingBarProps) {
  const body = <div className="flexRowCentered padSmall">
    <CircularProgress color="secondary" size="10rem" />
  </div>

  return (
    <ViewerModal
      title={title}
      open={props.open}
      handleClose={null}
      body={body}
    />
  )
}