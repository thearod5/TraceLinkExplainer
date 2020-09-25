import { AccordionDetails } from '@material-ui/core';
import React from 'react';
import { Relationships, WordDescriptorDisplay, Words } from '../../../shared/types/Trace';
import { secondaryColor } from '../../../styles/theme';
import ArtifactAccordionWords from './words/ArtifactAccordionWords';

/*
 * Container for body of accordion when displaying trace information.
 */

interface ArtifactAccordionDetailsProps {
  words: Words;
  families: Relationships;
  colorSelected: boolean;
  sizeSelected: boolean;
  fontSize: number;
  selectedWord: WordDescriptorDisplay | null
  setSelectedWord: React.Dispatch<React.SetStateAction<WordDescriptorDisplay | null>>
  toolbarIcons: JSX.Element[]
  style: React.CSSProperties;
}

export default function ArtifactAccordionDetails(props: ArtifactAccordionDetailsProps) {
  return (
    <AccordionDetails
      className="flexColumn"
      style={props.style}
    >
      <div className="overflowScroll" style={{}}>
        <ArtifactAccordionWords
          words={props.words}
          families={props.families}
          colorSelected={props.colorSelected}
          sizeSelected={props.sizeSelected}
          defaultSize={props.fontSize}
          selectedWord={props.selectedWord}
          setSelectedWord={props.setSelectedWord}
        />
      </div>
      <div className="flexRowCentered justifyContentCenter padLight">
        <div
          className="flexRowCentered justifyContentCenter roundBorderHard"
          style={{ backgroundColor: secondaryColor }}>
          {props.toolbarIcons}
        </div>
      </div>
    </AccordionDetails>)
}