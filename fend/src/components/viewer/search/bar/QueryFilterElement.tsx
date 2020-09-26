import { FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import React from 'react';
import { ENTER_KEY_CODE } from './SearchBar';

interface BasicSearchElementProps {
  label: string
  filterOperations: string[]
  selectedFilter: string
  setFilter: (value: string) => void
  query: string
  setQuery: (value: string) => void
  onSearch: () => void
}

export default function QueryFilterElement(props: BasicSearchElementProps) {
  const createOnChangeHandler = (propHandler: (v: string) => void) => {
    return (event: React.ChangeEvent<{ value: unknown }>) => {
      propHandler(event.target.value as string);
    };
  }

  const searchIfEnter = (event: any) => {
    if (event.keyCode === ENTER_KEY_CODE)
      props.onSearch()
  }

  return (
    <div className="centeredColumn">
      <div className="flexRow borderRound">
        <FormControl className="flexRow">
          <InputLabel color="secondary">{props.label}</InputLabel>
          <Select
            value={props.selectedFilter}
            onChange={createOnChangeHandler(props.setFilter)}
            color="secondary"
          >
            {props.filterOperations.map(option => <MenuItem key={option} value={option}>{option}</MenuItem>)}
          </Select>
        </FormControl>

        <div className="flexColumn justifyContentFlexEnd">
          <FormControl className="flexRow">
            <TextField
              value={props.query}
              onChange={createOnChangeHandler(props.setQuery)}
              onKeyDown={searchIfEnter}
              color="secondary"
            />
          </FormControl>
        </div>
      </div>
    </div>)
}