import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import React, { useState } from "react";
import { SearchItem } from "../../../../shared/types/Search";
import { getDefaultArtifactDisplay } from "../../../artifacts/Artifacts";
import { ArtifactClickAction } from "../../types";
import ItemPopup from "./ItemPopup";

interface SearchResultProps {
  result: SearchItem;
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
    setChecked(!checked);
    const clickCallback = checked ? props.selectArtifact : props.removeArtifact;
    clickCallback(props.result);
  };

  const { id } = props.result;
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-label="Expand">
        <FormControlLabel
          aria-label="Select"
          onClick={(event) => event.stopPropagation()}
          onFocus={(event) => event.stopPropagation()}
          control={<Checkbox value={checked} onClick={onClick} />}
          label={id}
        />
      </AccordionSummary>

      <AccordionDetails style={{ maxHeight: "300px" }}>
        <Box
          className="overflowScroll roundBorder"
          style={{ width: "90%", maxHeight: "300px" }}
          boxShadow={3}
        >
          {getDefaultArtifactDisplay(props.result, false)}
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
        selectSource={() => props.selectArtifact(props.result)}
      />
    </Accordion>
  );
}
