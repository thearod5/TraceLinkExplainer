import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { SearchItem } from "../../../../../shared/Dataset";
import { RootState } from "../../../redux";
import { changeStep } from "../../../redux/actions";
import { history } from "../../../redux/store";
import { SELECT_TARGET_STEP } from "../../../stepmanager/constants";
import { BORDER_LINE } from "../../../styles/constants";
import { TRACE_VIEW_ROUTE } from "../../nav/routes";
import { ArtifactClickAction } from "../types";
import { SEARCH_RESULT_ITEM_HEIGHT } from "./constants";
import SimilarityRectangle from "./SimilarityRectangle";

const MAX_CHAR_LENGTH = 200;

interface SearchResultProps {
  result: SearchItem;
  clickAction: ArtifactClickAction;
}

export default function SearchResultItem(props: SearchResultProps) {
  const currentStep: number = useSelector(
    (state: RootState) => state.metaData.currentStep
  );
  const dispatch = useDispatch();

  const clickHandler = () => {
    props.clickAction(props.result.artifact);
    dispatch(changeStep(currentStep + 1, props.result.artifact));
    if (currentStep === SELECT_TARGET_STEP) history.push(TRACE_VIEW_ROUTE);
  };

  return (
    <ItemContainer className="styledLink" onClick={clickHandler}>
      <SimilarityRectangle similarity={props.result.similarity} />
      <IdContainer>
        <label>{props.result.artifact.id}</label>
      </IdContainer>
      <ArtifactBodyContainer>
        <label>
          {props.result.artifact.body.substring(0, MAX_CHAR_LENGTH)}
        </label>
      </ArtifactBodyContainer>
    </ItemContainer>
  );
}

const ID_WIDTH = 200;
const SEARCH_RESULT_ID_FONT_SIZE = 24; //px
const SEARCH_RESULT_BODY_FONT_SIZE = 14; //px
const SEARCH_RESULT_ID_SIDE_PADDING = 10; //px
const SEARCH_RESULT_ITEM_BODY_SIDE_PADDING = 10; //px

const ItemContainer = styled.div`
  display: flex;
  flex-direct: row;
  width 100%;
  border: ${BORDER_LINE};
  text-decoration: none;
`;

const IdContainer = styled.div`
  font-size: ${SEARCH_RESULT_ID_FONT_SIZE}px;
  height: ${SEARCH_RESULT_ITEM_HEIGHT}px;
  padding-left: ${SEARCH_RESULT_ID_SIDE_PADDING}px;
  padding-right: ${SEARCH_RESULT_ID_SIDE_PADDING}px;
  border-right: ${BORDER_LINE};
  width: ${ID_WIDTH}px;
`;

const ArtifactBodyContainer = styled.div`
  flex-grow: 4;
  height: ${SEARCH_RESULT_ITEM_HEIGHT}px;
  font-size: ${SEARCH_RESULT_BODY_FONT_SIZE}px;
  text-align: left;
  padding-left: ${SEARCH_RESULT_ITEM_BODY_SIDE_PADDING}px;
`;
