import { AccordionDetails, LinearProgress } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { Relationships, Words } from '../../../operations/types/Trace'
import { getLoading } from '../../../redux/selectors'
import ViewerWords from '../words/ArtifactWord'

/* Responsibility: Container for body of accordion when displaying trace information.
 *
 */

interface ArtifactAccordionDetailsProps {
  words: Words | null;
  families: Relationships | null;
  colorSelected: boolean;
  sizeSelected: boolean;
  fontSize: number;
  toolbarIcons: JSX.Element[]
  style: React.CSSProperties;
}

export default function ArtifactAccordionDetails (props: ArtifactAccordionDetailsProps) {
  const loading = useSelector(getLoading)

  const { style, words, families, colorSelected, sizeSelected, fontSize, toolbarIcons } = props
  let body

  if (!loading && words !== null && families !== null) {
    body = (<div
      className="flexColumn"
      style={style}>
      <div className="overflowScroll">
        <ViewerWords
          words={words}
          families={families}
          colorSelected={colorSelected}
          sizeSelected={sizeSelected}
          defaultSize={fontSize}
        />
      </div>
      <div className="flexRowCentered justifyContentCenter padSmall" >
        <div
          className="flexRowCentered justifyContentCenter roundBorderMedium"
        >
          {toolbarIcons}
        </div>
      </div>
    </div>)
  } else {
    body = <LinearProgress color="primary" />
  }

  return (
    <AccordionDetails className="flexColumn">
      {body}
    </AccordionDetails>)
}
