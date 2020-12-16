import { Box, Button, IconButton } from '@material-ui/core'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import KeyboardTabIcon from '@material-ui/icons/KeyboardTab'
import React from 'react'
import { primaryColor, secondaryColor } from '../../../styles/theme'

interface SearchFooterProps {
  page: number;
  totalPages: number;
  message: string;
  completed: boolean;
  onStepCompleted: () => void;
  onNextPage: () => void;
  onPreviousPage: () => void;
  numberSelected: number
}

export function SearchFooter (props: SearchFooterProps) {
  const previousPageButton = (
    <IconButton
      color="secondary"
      disabled={props.page === 1}
      onClick={props.onPreviousPage}
    >
      <ArrowBackIosIcon></ArrowBackIosIcon>
    </IconButton>
  )
  const pageLabel = (
    <Box className="centeredColumn padSmall" color='secondary'>
      Page {props.page} / {props.totalPages}
    </Box>
  )
  const nextPageButton = (
    <IconButton
      color="secondary"
      disabled={props.page === props.totalPages}
      onClick={props.onNextPage}
    >
      <ArrowForwardIosIcon></ArrowForwardIosIcon>
    </IconButton>
  )

  const nextStepButton = <Button
    variant="contained"
    color="secondary"
    endIcon={<KeyboardTabIcon color={'primary'} />}
    onClick={props.onStepCompleted}
  >
    {props.message} ({props.numberSelected})
  </Button>

  return (
    <Box
      boxShadow={3}
      className="centeredColumn sizeFull"
      style={{ backgroundColor: primaryColor, color: secondaryColor }}
    >
      <div className="flexRow justifyContentSpaceBetween widthFull">
        <Box className="flexRowCentered">
          {previousPageButton}
          {pageLabel}
          {nextPageButton}
        </Box>

        <div className="padSmall">{nextStepButton}</div>
      </div>
    </Box>
  )
}
