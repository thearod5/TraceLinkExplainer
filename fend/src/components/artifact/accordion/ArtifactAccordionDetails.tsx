import { AccordionDetails } from '@material-ui/core'
import React from 'react'
import { Icons } from '../../../constants'
import { Relationships, Words } from '../../../types/Trace'
import AppLoadingBar from '../../meta/AppLoadingBar'
import ViewerWords from '../words/ArtifactWord'

/* Body of artifact accordion displayed during search results
 *
 */

interface ArtifactAccordionDetailsProps {
  words: Words | null;
  families: Relationships | null;
  colorSelected: boolean;
  sizeSelected: boolean;
  fontSize: number;
  toolbarIcons: Icons
  style: React.CSSProperties;
  isLoading: boolean
}

export default function ArtifactAccordionDetails (props: ArtifactAccordionDetailsProps) {
  const { style, words, families, colorSelected, sizeSelected, fontSize, toolbarIcons } = props
  let body

  if (!props.isLoading && words !== null && families !== null) {
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
    body = AppLoadingBar()
  }

  return (
    <AccordionDetails className="flexColumn">
      {body}
    </AccordionDetails>)
}
