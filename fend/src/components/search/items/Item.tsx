import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { SearchItem } from "../../../../../shared/Dataset";
import { RootState } from "../../../redux";
import { changeStep } from "../../../redux/actions";
import { getDefaultArtifactDisplay } from "../../artifacts/ArtifactsSelector";
import { ArtifactClickAction } from "../types";

interface SearchResultProps {
  result: SearchItem;
  clickAction: ArtifactClickAction;
}

export default function SearchResultItem(props: SearchResultProps) {
  const currentStep: number = useSelector(
    (state: RootState) => state.metaData.currentStep
  );
  const dispatch = useDispatch();

  const selectSource = () => {
    dispatch(changeStep(currentStep + 1, props.result.artifact));
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
      <AccordionDetails>
        <BodyContainer>
          {getDefaultArtifactDisplay(props.result.artifact, false)}
        </BodyContainer>
      </AccordionDetails>
    </ItemContainer>
  );
}

const ItemContainer = styled(Accordion)`
  width: 100%;
  overflow-y: scroll;
  margin: 1px;
`;

//TODO: Change height to percentage (50%?)
const BodyContainer = styled(Box)`
  min-height: 100px;
  max-height: 300px;
  width: 100%;
  text-wrap: wrap;
  overflow-y: hidden;
`;
