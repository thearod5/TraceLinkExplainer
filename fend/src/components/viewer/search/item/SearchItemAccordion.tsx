import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  FormControlLabel,
  IconButton
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import React, { useState } from "react";
import { Artifact } from "../../../../shared/types/Dataset";
import { Relationships, Words } from "../../../../shared/types/Trace";
import ViewerWords from "../../words/ViewerWords";
import { ArtifactClickAction } from "../types";
import SearchItemDialog from "./SearchItemDialog";

interface SearchResultProps {
  result: Artifact;
  words: Words;
  families: Relationships;
  selectArtifact: ArtifactClickAction;
  removeArtifact: ArtifactClickAction;
}

export default function SearchItemAccordion(props: SearchResultProps) {
  const [expanded, setExpanded] = useState(false);
  const [checked, setChecked] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleClose = () => {
    setDialogOpen(false);
    setExpanded(false);
  };

  const onClick = () => {
    const clickCallback = checked ? props.removeArtifact : props.selectArtifact;
    clickCallback(props.result);
    setChecked(!checked);
  };

  const handleDialogAccept = () => {
    setDialogOpen(false);
    setExpanded(false);
    setChecked(true);
    props.selectArtifact(props.result);
  };

  return (
    <Accordion
      TransitionProps={{ unmountOnExit: true }}
      expanded={expanded}
      onChange={() => setExpanded(!expanded)}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-label="Expand">
        <FormControlLabel
          aria-label="Select"
          onClick={(event) => event.stopPropagation()} //stops opening of accordion
          onFocus={(event) => event.stopPropagation()}
          control={<Checkbox checked={checked} onClick={onClick} />}
          label={props.result.id}
        />
      </AccordionSummary>

      <AccordionDetails style={{ maxHeight: "300px" }}>
        <Box
          className="overflowScroll roundBorder padSmall"
          style={{ width: "90%", maxHeight: "300px" }}
          boxShadow={3}
        >
          <ViewerWords
            words={props.words}
            families={props.families}
            colorSelected={true}
            sizeSelected={false}
            defaultSize={1}
          />
        </Box>

        <div className="centeredColumn padSmall" >
          <IconButton aria-label="expand" onClick={() => setDialogOpen(!dialogOpen)}>
            <FullscreenIcon />
          </IconButton>
        </div>
      </AccordionDetails>

      <SearchItemDialog
        handleClose={handleClose}
        open={dialogOpen}
        artifact={props.result}
        selectSource={handleDialogAccept}
      />
    </Accordion>
  );
}
