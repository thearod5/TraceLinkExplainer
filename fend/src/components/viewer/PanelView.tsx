import { Box, CircularProgress, Fade } from "@material-ui/core";
import React from 'react';
import SplitPane from "react-split-pane";
import { WordModal } from "./accordion/TraceExplanation";

interface PanelViewProps {
  leftPanel: JSX.Element | null
  rightPanel: JSX.Element
  loading: boolean
  modalOpen: boolean
}

export function PanelView(props: PanelViewProps) {
  const { leftPanel, rightPanel, modalOpen, loading } = props
  const loadingBar = <LoadingBar open={loading} />
  return (
    <div className="flexColumn heightFull overflowYHidden">
      <SplitPane split="vertical">
        {leftPanel}
        {rightPanel}
      </SplitPane>
      {loadingBar}
      <WordModal open={modalOpen} />
    </div>
  );
}

interface LoadingBarProps {
  open: boolean
}

function LoadingBar(props: LoadingBarProps) {

  return (
    <Fade in={props.open} timeout={1000}>
      <div style={{
        position: "fixed", top: "0px", left: "0px", right: "0px",
        width: "100%", height: "100%", background: "rgba(0, 0, 0, 0.75)", zIndex: 10
      }}>
        <div className="flexColumn heightFull justifyContentCenter">
          <div className="flexRow justifyContentCenter">
            <Box className="flexColumn justifyContentCenter roundBorderHard padLight" style={{ background: "white", zIndex: 11 }} boxShadow={3}>
              <h1 className="padLight" style={{ paddingBottom: "100px" }}>Retrieving Trace Information...</h1>
              <div className="flexRowCentered padLight">
                <CircularProgress color="secondary" size="10rem" />
              </div>
            </Box>
          </div>
        </div>
      </div>
    </Fade>
  )
}