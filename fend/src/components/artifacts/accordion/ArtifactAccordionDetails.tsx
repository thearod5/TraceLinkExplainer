import { AccordionDetails } from '@material-ui/core';
import React from 'react';
import { Families, Word, Words } from '../../../shared/types/Trace';
import { secondaryColor } from '../../../styles/theme';
import ArtifactWords from './ArtifactWords';

/*
 * The body of the accordion in charge of displaying trace information.
 */

interface ArtifactAccordionDetailsProps {
  words: Words;
  families: Families;
  colorSelected: boolean;
  sizeSelected: boolean;
  fontSize: number;
  selectedWord: Word | null
  setSelectedWord: React.Dispatch<React.SetStateAction<Word | null>>
  toolbarIcons: JSX.Element[]
  style: React.CSSProperties;
}

export default function ArtifactAccordionDetails(props: ArtifactAccordionDetailsProps) {
  return (
    <AccordionDetails
      className="flexColumn"
      style={props.style}
    >
      <div className="flexRowCentered justifyContentCenter padLight">
        <div
          className="flexRowCentered justifyContentCenter roundBorderHard"
          style={{ backgroundColor: secondaryColor }}>
          {props.toolbarIcons}
        </div>
      </div>

      <div className="overflowScroll" style={{}}>
        <ArtifactWords
          words={props.words}
          families={props.families}
          colorSelected={props.colorSelected}
          sizeSelected={props.sizeSelected}
          defaultSize={props.fontSize}
          selectedWord={props.selectedWord}
          setSelectedWord={props.setSelectedWord}
        />
      </div>
    </AccordionDetails>)
}