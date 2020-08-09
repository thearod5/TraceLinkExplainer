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
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { SearchItem } from "../../../../../../shared/Dataset";
import { RootState } from "../../../../redux";
import { changeStep } from "../../../../redux/actions";
import { getDefaultArtifactDisplay } from "../../../artifacts/ArtifactsSelector";
import { ArtifactClickAction } from "../../types";
import ItemPopup from "./ItemPopup";

interface SearchResultProps {
  result: SearchItem;
  clickAction: ArtifactClickAction;
}

export default function SearchResultItem(props: SearchResultProps) {
  const [open, setOpen] = useState(false);
  const currentStep: number = useSelector(
    (state: RootState) => state.metaData.currentStep
  );
  const dispatch = useDispatch();

  const selectSource = () => {
    dispatch(changeStep(currentStep + 1, props.result.artifact));
  };

  const handleClose = () => {
    setOpen(false);
  };

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
          onClick={selectSource}
          onFocus={(event: any) => event.stopPropagation()}
          control={<Checkbox />}
          label={id}
        />
      </AccordionSummary>
      <ItemFooter>
        <ItemDetails>
          <DisplayContainer>
            {getDefaultArtifactDisplay(props.result.artifact, false)}
          </DisplayContainer>
        </ItemDetails>
        <ZoomButton aria-label="expand" onClick={() => setOpen(!open)}>
          <FullscreenIcon />
        </ZoomButton>
      </ItemFooter>

      <ItemPopup
        handleClose={handleClose}
        open={open}
        artifact={props.result.artifact}
        selectSource={() => props.clickAction(props.result.artifact)}
      />
    </ItemContainer>
  );
}

const DisplayContainer = styled(Box)`
  height: 200px;
`;

const ItemContainer = styled(Accordion)`
  width: 100%;
  overflow-y: scroll;
  margin: 1px;
  max-height: 350px;
`;

const ItemDetails = styled(AccordionDetails)`
  display: flex;
  flex-direction: column;
`;

const ZoomButton = styled(IconButton)`
  position: absolute;
  bottom: 0px;
`;

const ItemFooter = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;
