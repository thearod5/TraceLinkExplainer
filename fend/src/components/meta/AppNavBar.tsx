import { Box } from '@material-ui/core'
import React from 'react'

interface NavBarProps {
  title: string
}

export default function AppNavBar (props: NavBarProps) {
  const GoHomeClickHanlder = () => {
    window.location.reload()
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
