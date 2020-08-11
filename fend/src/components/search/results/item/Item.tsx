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
import styled from "styled-components";
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
    clickCallback(props.result.artifact);
  };

  const { id } = props.result.artifact;
  return (
    <ItemContainer>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-label="Expand"
        aria-controls="additional-actions1-content"
        id="additional-actions1-header"
      >
        <FormControlLabel
          aria-label="Acknowledge"
          onClick={(event) => event.stopPropagation()}
          onFocus={(event) => event.stopPropagation()}
          control={<Checkbox value={checked} onClick={onClick} />}
          label={id}
        />
      </AccordionSummary>
      <ItemBody>
        <ItemDetails>
          <DisplayContainer>
            {getDefaultArtifactDisplay(props.result.artifact, false)}
          </DisplayContainer>
        </ItemDetails>
        <ZoomButtonContainer>
          <IconButton aria-label="expand" onClick={() => setOpen(!open)}>
            <FullscreenIcon />
          </IconButton>
        </ZoomButtonContainer>
      </ItemBody>

      <ItemPopup
        handleClose={handleClose}
        open={open}
        artifact={props.result.artifact}
        selectSource={() => props.selectArtifact(props.result.artifact)}
      />
    </ItemContainer>
  );
}

const ItemContainer = styled(Accordion)`
  width: 100%;
  overflow-y: scroll;
  margin: 1px;
  max-height: 450px;
`;

const ItemDetails = styled(AccordionDetails)`
  display: flex;
  flex-direction: column;
`;

const ItemBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const DisplayContainer = styled(Box)`
  max-height: 300px;
`;

const ZoomButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
