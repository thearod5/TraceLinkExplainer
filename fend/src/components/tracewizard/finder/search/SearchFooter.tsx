import { Box, IconButton } from '@material-ui/core'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import React from 'react'

interface SearchFooterProps {
  pageIndex: number;
  totalPages: number;
  message: string;
  onNextPage: () => void;
  onPreviousPage: () => void;
  numberSelected: number
}

export function SearchFooter (props: SearchFooterProps) {
  const previousPageButton = (
    <IconButton
      disabled={props.pageIndex === 0}
      onClick={props.onPreviousPage}
    >
      <ArrowBackIosIcon></ArrowBackIosIcon>
    </IconButton>
  )
  const nextPageButton = (
    <IconButton
      disabled={props.pageIndex === props.totalPages - 1}
      onClick={props.onNextPage}
    >
      <ArrowForwardIosIcon></ArrowForwardIosIcon>
    </IconButton>
  )
  const pageLabel = (
    <Box className="centeredColumn padSmall" color='secondary'>
      Page {props.pageIndex + 1} / {props.totalPages}
    </Box>
  )

  return (
    <Box className="centeredColumn sizeFull" >
      <div className="flexRowCentered widthFull">
        <Box className="flexRowCentered">
          {previousPageButton}
          {pageLabel}
          {nextPageButton}
        </Box>
      </div>
    </Box>
  )
}
