
import { Fade } from '@material-ui/core';
import React from 'react';
import SplitPane from "react-split-pane";
import { primaryColor } from '../../styles/theme';
import { FADE_TIMEOUT } from '../constants';
import { WordModal } from './explanation/TraceExplanation';
import LoadingBar from './intermediate/LoadingPage';

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
        <Fade in={true} timeout={FADE_TIMEOUT}>
          <div className="heightFull" style={{ borderRight: `1px solid ${primaryColor}` }}>{leftPanel}</div>
        </Fade>
        <Fade in={true} timeout={FADE_TIMEOUT}>
          <div className="heightFull" style={{ borderLeft: `1px solid ${primaryColor}` }}>{rightPanel}</div>
        </Fade>
      </SplitPane>
      {loadingBar}
      <WordModal open={modalOpen} />
    </div>
  );
}

