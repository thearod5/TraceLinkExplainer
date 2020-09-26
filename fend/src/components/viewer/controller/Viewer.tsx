
import React from 'react';
import SplitPane from "react-split-pane";
import { secondaryColor } from '../../../styles/theme';
import { WordModal } from '../accordion/TraceExplanation';
import LoadingBar from './LoadingPage';

interface ViewerProps {
  leftPanel: JSX.Element
  rightPanel: JSX.Element
  loading: boolean
  modalOpen: boolean
}

export function Viewer(props: ViewerProps) {
  const { leftPanel, rightPanel, modalOpen, loading } = props
  const loadingBar = <LoadingBar open={loading} />

  return (
    <div className="flexColumn heightFull overflowYHidden">
      <SplitPane
        split="vertical"
      >
        <div className="heightFull" style={{ borderRight: `1px solid ${secondaryColor}` }}>{leftPanel}</div>
        <div className="heightFull" style={{ borderLeft: `1px solid ${secondaryColor}` }}>{rightPanel}</div>
      </SplitPane>
      {loadingBar}
      <WordModal open={modalOpen} />
    </div>
  );
}

