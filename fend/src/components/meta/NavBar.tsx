import { Box } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { HOME_ROUTE } from '../../constants'
import { getCurrentStep, getDataset } from '../../redux/selectors'
import { appHistory } from '../../redux/store'
import { primaryColor } from '../../styles/theme'

const WELCOME_MESSAGE = 'TraceViewer'
// TODO: Add button to view dataset. Also make a real nav bar looking thing.
export default function NavBar () {
  const currentStep = useSelector(getCurrentStep) // recreated index at 0, but remove select dataset move
  const dataset = useSelector(getDataset).name

  const GoHomeClickHanlder = () => {
    appHistory.push(HOME_ROUTE)
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
          style={{ color: primaryColor }}
        >
          {currentStep === 0 ? WELCOME_MESSAGE : dataset}
        </h1>
      </div>
    </Box>
  )
}
