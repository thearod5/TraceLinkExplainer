import { Button, Tooltip } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import CheckIcon from "@material-ui/icons/Check";
import ReportProblemIcon from "@material-ui/icons/ReportProblem";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { isValidQuery } from "../QueryHelper";
import { getQueryRecommendations } from "../QueryRecommender";

const SEARCH_BAR_ID = "TARGET_ARTIFACT_SEARCH_BAR";
const ENTER_KEY_CODE = 13;
const PLACE_HOLDER_TEXT = "...search for a source artifact...";

type SubmitFuncType = (query: string) => void;
interface SearchBarProps {
  onSubmit: SubmitFuncType;
}

export default function SearchBar(props: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [validQuery, setValidQuery] = useState(true);
  const [queryError, setQueryError] = useState("");

  useEffect(() => {
    const [isValid, error] = isValidQuery(query);
    setValidQuery(isValid);
    setQueryError(error);
  }, [query]);

  return (
    <SearchBarContainer>
      <StyledSearchBarRow>
        {validQuery ? (
          <CheckIcon color="secondary" style={IconStyle} />
        ) : (
          <Tooltip title={queryError}>
            <ReportProblemIcon color="action" style={IconStyle} />
          </Tooltip>
        )}
        <StyledSearchBar
          id={SEARCH_BAR_ID}
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          options={getQueryRecommendations(query)}
          style={SearchBarStyle}
          value={query}
          onChange={(event: any, newValue: any) => {
            setQuery(newValue === null ? "" : [query, newValue, ""].join(" "));
          }}
          renderInput={(params: object) =>
            SearchSuggestion(params, props.onSubmit)
          }
          inputValue={query}
          onInputChange={(event, newValue) => {
            setQuery(newValue);
          }}
        />
        <Button
          style={{ margin: "5px" }}
          color="primary"
          variant="contained"
          onClick={(event: any) => props.onSubmit(query)}
        >
          Search
        </Button>
      </StyledSearchBarRow>
    </SearchBarContainer>
  );
}

function SearchSuggestion(params: object, onSubmit: SubmitFuncType) {
  return (
    <TextField
      {...params}
      placeholder={PLACE_HOLDER_TEXT}
      variant="outlined"
      onKeyDown={(event) =>
        event.keyCode === ENTER_KEY_CODE
          ? onSubmit((event.target as HTMLInputElement).value)
          : undefined
      }
    />
  );
}
const SEARCH_BAR_WIDTH = 500;
const SEARCH_BAR_MIN_WIDTH = 100;
const SEARCH_BAR_MAX_WIDTH = 1000;
const SEARCH_BAR_HEIGHT = 55;
const SEARCH_BAR_SIDE_PADDING = 10;

const SearchBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const StyledSearchBar = styled(Autocomplete)`
  border-radius: 5px;
`;

const StyledSearchBarRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;

const SearchBarStyle = {
  maxWidth: `${SEARCH_BAR_MAX_WIDTH}px`,
  minWidth: `${SEARCH_BAR_MIN_WIDTH}px`,
  width: `${SEARCH_BAR_WIDTH}px`,
  height: `${SEARCH_BAR_HEIGHT}px;`,
  paddingLeft: `${SEARCH_BAR_SIDE_PADDING}px`,
};

const IconStyle = {
  height: "100%",
  padding: "1px",
};
