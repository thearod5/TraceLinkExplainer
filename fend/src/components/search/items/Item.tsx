import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { SearchItem } from "../../../../../shared/Dataset";
import { RootState } from "../../../redux";
import { changeStep } from "../../../redux/actions";
import { BORDER_LINE } from "../../../styles/constants";
import style from "../../../styles/theme";
import { ArtifactClickAction } from "../types";
import { SEARCH_RESULT_ITEM_HEIGHT } from "./constants";
import ItemPopup from "./ItemPopup";
import SimilarityRectangle from "./SimilarityRectangle";

const MAX_CHAR_LENGTH = 200;
const HIGHLIGHT_COLOR = style.palette.primary.main;

interface SearchResultProps {
  result: SearchItem;
  clickAction: ArtifactClickAction;
}

export default function SearchResultItem(props: SearchResultProps) {
  const [hover, setHover] = useState(false);
  const [open, setOpen] = useState(false);

  const currentStep: number = useSelector(
    (state: RootState) => state.metaData.currentStep
  );
  const dispatch = useDispatch();

  const selectSource = () => {
    dispatch(changeStep(currentStep + 1, props.result.artifact));
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ItemContainer
      className="styledLink"
      onClick={handleOpen}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ background: hover ? HIGHLIGHT_COLOR : undefined }}
    >
      <SimilarityRectangle similarity={props.result.similarity} />
      <IdContainer>
        <IdText>{props.result.artifact.id}</IdText>
      </IdContainer>

      <ItemPopup
        selectSource={selectSource}
        handleClose={handleClose}
        open={open}
        artifact={props.result.artifact}
      />
      <BodyContainer>
        <div className="paddingContainer">
          <IdText className="containedLabel">
            {props.result.artifact.body.substring(0, MAX_CHAR_LENGTH)}
          </IdText>
        </div>
      </BodyContainer>
    </ItemContainer>
  );
}

const ItemContainer = styled.div`
  display: flex;
  flex-direct: row;
  width 100%;
  height: ${SEARCH_RESULT_ITEM_HEIGHT}px;
  border: ${BORDER_LINE};
  border-top: none;
  border-radius: 5px;
  text-decoration: none;
`;

const IdContainer = styled.div`
  font-size: 1em;
  height: ${SEARCH_RESULT_ITEM_HEIGHT}px;
  line-height: ${SEARCH_RESULT_ITEM_HEIGHT}px;
  border-right: ${BORDER_LINE};
  width: 38%;
  overflow-x: scroll;
`;

const IdText = styled.label`
  font-size: 1em;
  text-align: center;
  padding: 10px;
  overflow-x: hidden;
  overflow-y: hidden;
  word-wrap: initial;
`;

const BodyContainer = styled.div`
  height: 100%;
  width: 60%;
  overflow-x: hidden;
  overflow-y: scroll;
`;
