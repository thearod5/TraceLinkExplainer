import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import React, { useState } from "react";
import styled from "styled-components";

//Filter Attributes
export const TYPE_FILTER_ATTRIBUTE = "Type";
export const LIMIT_FILTER_ATTRIBUTE = "LIMIT";

//Filter Actions
export const EQUAL_FILTER_ACTION = "EQUAL";

interface SearchFilterOptions {
  attribute: string;
  options: any[];
}

const ARTIFACT_TYPE_OPTIONS = ["All", "Requirements", "Designs", "Classes"];
const RESULT_LIMIT_OPTONS = [10, 50, 100, "All"];

export default function FilterCreator() {
  const [type, setType] = useState("Requirements");
  const [limit, setLimit] = useState(RESULT_LIMIT_OPTONS[0]);

  function createMenuItem(optionName: string | number, optionIndex: number) {
    return (
      <MenuItem value={optionName}>
        {optionIndex == 0 ? <em>{optionName}</em> : optionName}
      </MenuItem>
    );
  }

  return (
    <FilterCreatorContainer>
      <InputElementContainer variant="outlined" color="secondary">
        <InputLabel id={`search-type-filter`}>Artifact Type</InputLabel>
        <Select
          value={type}
          onChange={(event: any) => setType(event.target.value)}
          label="Type"
        >
          {ARTIFACT_TYPE_OPTIONS.map(createMenuItem)}
        </Select>
      </InputElementContainer>

      <InputElementContainer variant="outlined" color="secondary">
        <InputLabel id={`search-limit-filter`}>Number of Results</InputLabel>
        <Select
          value={limit}
          onChange={(event: any) => setLimit(event.target.value)}
          label="Limit"
        >
          {RESULT_LIMIT_OPTONS.map(createMenuItem)}
        </Select>
      </InputElementContainer>
    </FilterCreatorContainer>
  );
}

const FilterCreatorContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const InputElementContainer = styled(FormControl)`
  flex-grow: 1;
`;
