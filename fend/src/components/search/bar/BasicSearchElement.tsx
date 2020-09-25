import { FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import React from 'react';

interface BasicSearchElementProps {
  label: string
  options: string[]
  selectedOption: string
  selectOption: (value: string) => void
  value: string
  setValue: (value: string) => void
}

export default function BasicSearchElement(props: BasicSearchElementProps) {
  const createOnChangeHandler = (propHandler: (v: string) => void) => {
    return (event: React.ChangeEvent<{ value: unknown }>) => {
      console.log("hello")
      propHandler(event.target.value as string);
    };
  }
  return (
    <div className="centeredColumn">
      <div className="flexRow debug">
        <FormControl className="flexRow">
          <InputLabel id="demo-simple-select-label" color="secondary">{props.label}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={props.selectedOption}
            onChange={createOnChangeHandler(props.selectOption)}
            color="secondary"
          >
            {props.options.map(option => <MenuItem value={option}>{option}</MenuItem>)}
          </Select>
        </FormControl>

        <div className="flexColumn justifyContentFlexEnd">
          <FormControl className="flexRow">
            <TextField
              id="query-basic"
              onChange={createOnChangeHandler(props.setValue)}
              value={props.value}
              color="secondary"
            />
          </FormControl>
        </div>
      </div>
    </div>)
}