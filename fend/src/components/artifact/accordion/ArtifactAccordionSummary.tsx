import { AccordionSummary } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeStep } from '../../../redux/actions'
import { getCurrentStep } from '../../../redux/selectors'
import { primaryColor } from '../../../styles/theme'

interface ArtifactToolbarProps {
  title: string;
  style: React.CSSProperties;
  expandIcon: React.ReactNode;
}

export default function ArtifactAccordionSummary (props: ArtifactToolbarProps) {
  const currentStep = useSelector(getCurrentStep)
  const dispatch = useDispatch()

  const clickHandler = () => {
    dispatch(changeStep(currentStep - 1))
  }

  return (
    <AccordionSummary
      style={props.style}
      expandIcon={props.expandIcon}
    >
      <h3 onClick={clickHandler} style={{ color: primaryColor }}>
        {props.title}
      </h3>
    </AccordionSummary>
  )
}
