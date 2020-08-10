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
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { SearchItem } from "../../../../../../shared/Dataset";
import { RootState } from "../../../../redux";
import { getDefaultArtifactDisplay } from "../../../artifacts/ArtifactsSelector";
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
  const currentStep: number = useSelector(
    (state: RootState) => state.metaData.currentStep
  );

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const clickCallback = checked ? props.selectArtifact : props.removeArtifact;
    clickCallback(props.result.artifact);
  }, [checked]);

  const { id } = props.result.artifact;
  return (
    <ItemContainer TransitionProps={{ unmountOnExit: true }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-label="Expand"
        aria-controls="additional-actions1-content"
        id="additional-actions1-header"
      >
        <FormControlLabel
          aria-label="Acknowledge"
          onClick={() => setChecked(!checked)}
          onFocus={(event: any) => event.stopPropagation()}
          control={<Checkbox value={checked} />}
          label={id}
        />
      </AccordionSummary>
      <ItemBody>
        <ItemDetails>
          <DisplayContainer>
            {getDefaultArtifactDisplay(props.result.artifact, false)}
          </DisplayContainer>
        </ItemDetails>
        <ZoomButton aria-label="expand" onClick={() => setOpen(!open)}>
          <FullscreenIcon />
        </ZoomButton>
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

const ZoomButton = styled(IconButton)`
  position: absolute;
  bottom: 0px;
`;

const ItemBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const DisplayContainer = styled(Box)`
  max-height: 300px;
`;
