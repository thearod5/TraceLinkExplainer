import { Box } from '@material-ui/core'
import React from 'react'
import { appHistory, HOME_ROUTE } from '../../types/constants'

interface NavBarProps {
  title: string
}

export default function AppNavBar (props: NavBarProps) {
  const GoHomeClickHanlder = () => {
    appHistory.push(HOME_ROUTE)
  }

  return (
    <Box
      className="flexRowCentered sizeFull"
    >
      <div className="centeredColumn">
        <h1
          onClick={GoHomeClickHanlder}
          className="padSmall"
        >
          {props.title}
        </h1>
      </div>
    </Box>
  )
}
