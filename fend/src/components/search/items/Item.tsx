import React, { useState } from "react";
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
const HIGHLIGHT_COLOR = "lightblue";

interface SearchResultProps {
  result: SearchItem;
  clickAction: ArtifactClickAction;
}

export default function SearchResultItem(props: SearchResultProps) {
  const [hover, setHover] = useState(false);

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
    <ItemContainer
      className="styledLink"
      onClick={clickHandler}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ background: hover ? HIGHLIGHT_COLOR : undefined }}
    >
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

const SEARCH_RESULT_ID_SIDE_PADDING = 10; //px

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
  padding-left: ${SEARCH_RESULT_ID_SIDE_PADDING}px;
  padding-right: ${SEARCH_RESULT_ID_SIDE_PADDING}px;
  border-right: ${BORDER_LINE};
  width: 40%;
  overflow-x: scroll;
`;

const ArtifactBodyContainer = styled.div`
  height: 100%;
  font-size: 1em;
  text-align: left;
  width: 40%;
  overflow-x: hidden;
`;
