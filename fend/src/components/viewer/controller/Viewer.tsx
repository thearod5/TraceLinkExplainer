
import React from 'react';
import SplitPane from "react-split-pane";
import { WordModal } from "../accordion/TraceExplanation";
import LoadingBar from './LoadingPage';

interface ViewerProps {
  leftPanel: JSX.Element | null
  rightPanel: JSX.Element
  loading: boolean
  modalOpen: boolean
}

export function Viewer(props: ViewerProps) {
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

