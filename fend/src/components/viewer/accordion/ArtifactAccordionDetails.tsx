import { AccordionDetails, LinearProgress } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { getLoading } from '../../../redux/selectors';
import { Relationships, Words } from '../../../shared/types/Trace';
import { secondaryColor } from '../../../styles/theme';
import ViewerWords from '../words/ViewerWords';

/*
 * Container for body of accordion when displaying trace information.
 */


interface ArtifactAccordionDetailsProps {
  words: Words;
  families: Relationships;
  colorSelected: boolean;
  sizeSelected: boolean;
  fontSize: number;
  toolbarIcons: JSX.Element[]
  style: React.CSSProperties;
}

export default function ArtifactAccordionDetails(props: ArtifactAccordionDetailsProps) {
  const loading = useSelector(getLoading)
  const body = (
    <div
      className="flexColumn"
      style={props.style}>
      <div className="overflowScroll">
        <ViewerWords
          words={props.words}
          families={props.families}
          colorSelected={props.colorSelected}
          sizeSelected={props.sizeSelected}
          defaultSize={props.fontSize}
        />
      </div>
      <div className="flexRowCentered justifyContentCenter padSmall">
        <div
          className="flexRowCentered justifyContentCenter roundBorderMedium"
          style={{ backgroundColor: secondaryColor }}>
          {props.toolbarIcons}
        </div>
      </div>
    </div>
  )

  const loadingBar = <LinearProgress color="secondary" />
  return (
    <AccordionDetails className="flexColumn">
      {loading ? loadingBar : body}
    </AccordionDetails>)
}