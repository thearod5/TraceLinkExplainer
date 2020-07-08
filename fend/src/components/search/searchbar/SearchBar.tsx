import TextField from "@material-ui/core/TextField";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React from "react";
import styled from "styled-components";
import { SuggestionFunctionType } from "../types";

const SEARCH_BAR_ID = "TARGET_ARTIFACT_SEARCH_BAR";
const ENTER_KEY_CODE = 13;
const PLACE_HOLDER_TEXT = "...artifact text...";

interface SearchBarProps {
  suggestionFunction: SuggestionFunctionType;
  onSubmit: (query: string) => void;
  searchOptions: string[];
}

export default function SearchBar(props: SearchBarProps) {
  return (
    <SearchBarContainer>
      <Autocomplete
        id={SEARCH_BAR_ID}
        options={props.searchOptions}
        getOptionLabel={(option) =>
          option.substring(0, SUGGESTION_LENGTH) + "..."
        }
        style={SearchBarStyle}
        renderInput={(params: object) => (
          <TextField
            {...params}
            placeholder={PLACE_HOLDER_TEXT}
            variant="outlined"
            onKeyDown={(event) =>
              event.keyCode === ENTER_KEY_CODE
                ? props.onSubmit((event.target as HTMLInputElement).value)
                : undefined
            }
          />
        )}
      />
      <MoreVertIcon style={MoreIconStyle} />
    </SearchBarContainer>
  );
}

const SEARCH_BAR_WIDTH = 500;
const SEARCH_BAR_MIN_WIDTH = 100;
const SEARCH_BAR_MAX_WIDTH = 1000;
const SEARCH_BAR_HEIGHT = 55;
const SEARCH_BAR_SIDE_PADDING = 10;

const SUGGESTION_LENGTH = 100;
const MORE_ICON_SIDE_MARGIN = 10;

const SearchBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: ${SEARCH_BAR_HEIGHT}px;
  width: 100%;
`;

const SearchBarStyle = {
  maxWidth: `${SEARCH_BAR_MAX_WIDTH}px`,
  minWidth: `${SEARCH_BAR_MIN_WIDTH}px`,
  width: `${SEARCH_BAR_WIDTH}px`,
  height: `${SEARCH_BAR_HEIGHT}px;`,
  paddingLeft: `${SEARCH_BAR_SIDE_PADDING}px`,
};

const MoreIconStyle = {
  height: `100%`,
  marginLeft: `${MORE_ICON_SIDE_MARGIN}px`,
};
