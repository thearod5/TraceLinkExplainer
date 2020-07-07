import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { BORDER_LINE } from "../../../styles/constants";
import { SearchItem } from "../types";
import { SEARCH_RESULT_ITEM_HEIGHT } from "./constants";
import SimilarityRectangle from "./SimilarityRectangle";

const ID_WIDTH = 100;
const SEARCH_RESULT_BODY_FONT_SIZE = 24; //px
const SEARCH_RESULT_ID_SIDE_PADDING = 10; //px
const SEARCH_RESULT_ITEM_BODY_SIDE_PADDING = 10; //px

interface SearchResultProps {
  result: SearchItem;
  searchItemResultPage: string;
}

export default function SearchResultItem(props: SearchResultProps) {
  return (
    <ItemContainer className="styledLink" to={props.searchItemResultPage}>
      <SimilarityRectangle similarity={props.result.similarity} />
      <IdContainer>
        <label>{props.result.artifact.id}</label>
      </IdContainer>
      <ArtifactBodyContainer>
        <label>{props.result.artifact.body}</label>
      </ArtifactBodyContainer>
    </ItemContainer>
  );
}

const ItemContainer = styled(Link)`
  display: flex;
  flex-direct: row;
  width 100%;
  border: ${BORDER_LINE};
  text-decoration: none;
`;

const IdContainer = styled.div`
  font-size: ${SEARCH_RESULT_BODY_FONT_SIZE}px;
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
