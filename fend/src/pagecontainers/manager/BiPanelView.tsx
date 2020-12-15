
import { Fade } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import SplitPane from 'react-split-pane'
import { FADE_TIMEOUT } from '../../constants'
import { primaryColor } from '../../styles/theme'

/* Displays two panels in a single row and transitions panels when they change
 */

interface ViewerProps {
  leftPanel: JSX.Element | null
  rightPanel: JSX.Element | null
}

const PROCESSING_DELTA = 300 // ms

export function BiPanelView (props: ViewerProps) {
  const [nextLeft, setNextLeft] = useState<(JSX.Element | null)>(null)
  const [currentLeft, setCurrentLeft] = useState<JSX.Element | null>(null)
  const [fadeLeftOut, setFadeLeftOut] = useState(false)

  const [nextRight, setNextRight] = useState<(JSX.Element | null)>(null)
  const [currentRight, setCurrentRight] = useState<JSX.Element | null>(null)
  const [fadeRightOut, setFadeRightOut] = useState(false)

  const { leftPanel, rightPanel } = props

  // Aprocess leave old component
  useEffect(() => {
    if (nextLeft === null) { return }
    if (!areSameType(currentLeft, nextLeft)) {
      // Bprocess enter new component
      setFadeLeftOut(true)
      setTimeout(() => {
        setCurrentLeft(nextLeft)
        setTimeout(() => {
          setFadeLeftOut(false)
        }, 0) // no timeout because fade out completed
      }, FADE_TIMEOUT - PROCESSING_DELTA) // allows fade out to complete
    }
    // eslint-disable-next-line
  }, [nextLeft])

  useEffect(() => {
    if (nextRight === null) { return }
    if (!areSameType(currentRight, nextRight)) {
      // Bprocess enter new component
      setFadeRightOut(true)
      setTimeout(() => {
        setCurrentRight(nextRight)
        setTimeout(() => {
          setFadeRightOut(false)
        }, 0) // no timeout because fade out completed
      }, FADE_TIMEOUT - PROCESSING_DELTA) // allows fade out to complete
    }
    // eslint-disable-next-line
  }, [nextRight])

  setTimeout(() => {
    if (!areSameType(nextLeft, leftPanel)) {
      setNextLeft(leftPanel)
    }
  }, 0)

  setTimeout(() => {
    if (!areSameType(nextRight, rightPanel)) { setNextRight(rightPanel) }
  }, 0)

  const body = (
    <SplitPane split="vertical">
      <Fade in={!fadeLeftOut} timeout={FADE_TIMEOUT}>
        <div className="heightFull" style={{ margin: '0px', borderRight: `2px solid ${primaryColor}` }}>{currentLeft}</div>
      </Fade>
      <Fade in={!fadeRightOut} timeout={FADE_TIMEOUT}>
        <div className="heightFull" style={{ margin: '0px', borderLeft: `2px solid ${primaryColor}` }}>{currentRight}</div>
      </Fade>
    </SplitPane>)

  return (
    <div className="flexColumn heightFull overflowYHidden">
      {body}
    </div>
  )
}

function areSameType (a: JSX.Element | null, b: JSX.Element | null) {
  if (a === null) {
    return b === null
  } else {
    if (b === null) return true
    else return a.type === b.type
    // else return (a.type as any).name === (b.type as any).name
  }
}
