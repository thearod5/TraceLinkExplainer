import { Box, CircularProgress, Fade } from "@material-ui/core";
import React from 'react';
interface LoadingBarProps {
  open: boolean
}

export default function LoadingBar(props: LoadingBarProps) {

  return (
    <Fade in={props.open} timeout={1000}>
      <div style={{
        position: "fixed", top: "0px", left: "0px", right: "0px",
        width: "100%", height: "100%", background: "rgba(0, 0, 0, 0.95)", zIndex: 10
      }}>
        <div className="flexColumn heightFull justifyContentCenter">
          <div className="flexRow justifyContentCenter">
            <Box className="flexColumn justifyContentCenter roundBorderHard padLarge" style={{ background: "white", zIndex: 11 }} boxShadow={3}>
              <h1 style={{ paddingBottom: "100px" }}>Retrieving Trace Information...</h1>
              <div className="flexRowCentered padSmall">
                <CircularProgress color="secondary" size="10rem" />
              </div>
            </Box>
          </div>
        </div>
      </div>
    </Fade>
  )
}