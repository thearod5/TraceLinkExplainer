import { AccordionSummary } from '@material-ui/core'
import React from 'react'

interface ArtifactToolbarProps {
  title: string;
  expandIcon: React.ReactNode;
}

export default function ArtifactAccordionSummary (props: ArtifactToolbarProps) {
  return (
    <AccordionSummary
      expandIcon={props.expandIcon}
    >
      <h3 >{props.title}</h3>
    </AccordionSummary>
  )
}
