import TextField from "@material-ui/core/TextField";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React from "react";
import styled from "styled-components";
import { PAGE_NAP_HEIGHT } from "../../nav/PageTitle";
import { SuggestionFunctionType } from "./Search";

const SEARCH_BAR_ID = "TARGET_ARTIFACT_SEARCH_BAR";
const SEARCH_BAR_WIDTH = 600;
const SEARCH_BAR_MAX_WIDTH = 1000;
const SEARCH_BAR_HEIGHT = 40;

const ENTER_KEY_CODE = 13;
const PLACE_HOLDER_TEXT = "...artifact text...";
const SUGGESTION_LENGTH = 100;

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
              event.keyCode == ENTER_KEY_CODE
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

const SearchBarContainer = styled.div`
  display: flex;
  flex-direction: row
  border: 1px solid blue;
  height: ${SEARCH_BAR_HEIGHT}px
`;

const SearchBarStyle = {
  width: `${SEARCH_BAR_WIDTH}px`,
  maxWidth: `${SEARCH_BAR_MAX_WIDTH}px`,
  height: `100%`,
};

const MORE_ICON_SIDE_MARGIN = 10;
const MoreIconStyle = {
  height: `${PAGE_NAP_HEIGHT}`,
  marginLeft: `${MORE_ICON_SIDE_MARGIN}px`,
};
