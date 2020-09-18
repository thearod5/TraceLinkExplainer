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
import { Families, Words } from "../../../../shared/types/Trace";
import ArtifactWords from "../../../artifacts/accordion/ArtifactWords";
import { ArtifactClickAction } from "../../types";
import ItemPopup from "./SearchResultItemPopup";

interface SearchResultProps {
  result: Artifact;
  words: Words;
  families: Families;
  selectArtifact: ArtifactClickAction;
  removeArtifact: ArtifactClickAction;
}

export default function SearchResultItem(props: SearchResultProps) {
  const [checked, setChecked] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const onClick = () => {
    const clickCallback = checked ? props.removeArtifact : props.selectArtifact;
    clickCallback(props.result);
    setChecked(!checked);
  };

  const handlePopupAccept = () => {
    setOpen(false);
    setChecked(true);
    props.selectArtifact(props.result);
  };

  return (
    <Accordion TransitionProps={{ unmountOnExit: true }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-label="Expand">
        <FormControlLabel
          aria-label="Select"
          onClick={(event) => event.stopPropagation()} //stops opening of accordion
          onFocus={(event) => event.stopPropagation()}
          control={<Checkbox value={checked} onClick={onClick} />}
          label={props.result.id}
        />
      </AccordionSummary>

      <AccordionDetails style={{ maxHeight: "300px" }}>
        <Box
          className="overflowScroll roundBorder"
          style={{ width: "90%", maxHeight: "300px" }}
          boxShadow={3}
        >
          <ArtifactWords
            words={props.words}
            families={props.families}
            colorSelected={true}
            sizeSelected={false}
            defaultSize={1}
            selectedWord={null}
            setSelectedWord={null}
          />
        </Box>

        <div className="centeredColumn" style={{ width: "10%" }}>
          <IconButton aria-label="expand" onClick={() => setOpen(!open)}>
            <FullscreenIcon />
          </IconButton>
        </div>
      </AccordionDetails>

      <ItemPopup
        handleClose={handleClose}
        open={open}
        artifact={props.result}
        selectSource={handlePopupAccept}
      />
    </Accordion>
  );
}
