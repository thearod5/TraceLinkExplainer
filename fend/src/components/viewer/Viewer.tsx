
import { Fade } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import SplitPane from "react-split-pane";
import { primaryColor } from '../../styles/theme';
import { FADE_TIMEOUT } from '../constants';
import { WordModal } from './explanation/TraceExplanation';
import LoadingBar from './intermediate/LoadingPage';

interface ViewerProps {
  leftPanel: JSX.Element | null
  rightPanel: JSX.Element | null
  loading: boolean
  modalOpen: boolean
}

const PROCESSING_DELTA = 300; //ms

export function Viewer(props: ViewerProps) {
  const [nextLeft, setNextLeft] = useState<(JSX.Element | null)>(null)
  const [currentLeft, setCurrentLeft] = useState<JSX.Element | null>(null)
  const [fadeLeftOut, setFadeLeftOut] = useState(false)

  const [nextRight, setNextRight] = useState<(JSX.Element | null)>(null)
  const [currentRight, setCurrentRight] = useState<JSX.Element | null>(null)
  const [fadeRightOut, setFadeRightOut] = useState(false)

  const { leftPanel, rightPanel, modalOpen, loading } = props

  const loadingBar = <LoadingBar open={loading} />

  //Aprocess leave old component 
  useEffect(() => {
    if (nextLeft === null)
      return;
    if (!areSameType(currentLeft, nextLeft)) {
      //Bprocess enter new component
      setFadeLeftOut(true)
      setTimeout(() => {
        setCurrentLeft(nextLeft)
        setTimeout(() => {
          setFadeLeftOut(false)
        }, 0) //no timeout because fade out completed
      }, FADE_TIMEOUT - PROCESSING_DELTA) //allows fade out to complete
    }
  }, [nextLeft])

  useEffect(() => {
    if (nextRight === null)
      return;
    if (!areSameType(currentRight, nextRight)) {
      //Bprocess enter new component
      setFadeRightOut(true)
      setTimeout(() => {
        setCurrentRight(nextRight)
        setTimeout(() => {
          setFadeRightOut(false)
        }, 0) //no timeout because fade out completed
      }, FADE_TIMEOUT - PROCESSING_DELTA) //allows fade out to complete
    }
  }, [nextRight])

  setTimeout(() => {
    if (!areSameType(nextLeft, leftPanel)) {
      setNextLeft(leftPanel)
    }

  }, 0)

  setTimeout(() => {
    if (!areSameType(nextRight, rightPanel))
      setNextRight(rightPanel)
  }, 0)

  const body = (
    <SplitPane split="vertical">
      <Fade in={!fadeLeftOut} timeout={FADE_TIMEOUT}>
        <div className="heightFull" style={{ borderRight: `1px solid ${primaryColor}` }}>{currentLeft}</div>
      </Fade>
      <Fade in={!fadeRightOut} timeout={FADE_TIMEOUT}>
        <div className="heightFull" style={{ borderLeft: `1px solid ${primaryColor}` }}>{currentRight}</div>
      </Fade>
    </SplitPane>)

  return (
    <div className="flexColumn heightFull overflowYHidden">
      {loading ? null : body}
      {loadingBar}
      <WordModal open={modalOpen} />
    </div>
  );
}

function areSameType(a: JSX.Element | null, b: JSX.Element | null) {
  if (a === null) {
    return b === null ? true : false
  } else {
    if (b === null) return true
    else return a.type === b.type
    //else return (a.type as any).name === (b.type as any).name
  }
}

