import { Box } from '@material-ui/core'
import React, { useContext } from 'react'
import { AppContext } from '../../App'


interface NavBarProps {
  title: string
}

export default function NavBar (props: NavBarProps) {
  const { dataset } = useContext(AppContext)

  const GoHomeClickHanlder = () => {
    console.log('CLICK HOME')
    // appHistory.push(HOME_ROUTE)
  }

  return (
    <Box
      boxShadow={3}
      className="flexRowCentered sizeFull"
      style={{ backgroundColor: 'white' }}
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
