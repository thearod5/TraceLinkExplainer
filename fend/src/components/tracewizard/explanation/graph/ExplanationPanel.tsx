import { Backdrop, Box, Fade, Modal } from '@material-ui/core'
import CancelIcon from '@material-ui/icons/Cancel'
import CloseIcon from '@material-ui/icons/Close'
import React, { useContext, useState } from 'react'
import { FADE_TIMEOUT } from '../../../../constants'
import { TraceContext } from '../../types'
import { ExplanationGraph } from './ExplanationGraph'

/* Manages the modal that displays the concept graph between a selected word in a trace explanation
 *
 */

export default function ExplanationPanel () {
  const { trace, setTrace } = useContext(TraceContext)

  const { selectedWord, relationships } = trace
  const open = selectedWord !== null

  const handleClose = () => {
    setTrace({ ...trace, selectedWord: null })
  }

  if (selectedWord === null || relationships === null) {
    return null
  }

  const body = (
    <div className="padSmall">
      <ExplanationGraph families={relationships.filter(relationship => selectedWord.relationshipIds.includes(relationship.title))} /></div>)

  const handleCloseWrapper = () => {
    if (handleClose !== null) { handleClose() }
  }

  console.log('panelrender')
  return (
    <Modal
      open={open}
      onClose={handleCloseWrapper}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
      className="sizeFull"
    >
      <Fade in={open} timeout={FADE_TIMEOUT}>
        <div className="centeredColumn heightFull">
          <div className="flexRowCentered widthFull">
            <Box className="roundBorderHard padLarge" style={{ backgroundColor: 'white' }}>
              {handleClose !== null ? <HoverClose handleClose={handleCloseWrapper} /> : null}
              <div className="flexRowCentered">
                <h2 className="displayInlineBlock textAlignCenter padMedium">{selectedWord.word}</h2>
              </div>
              {body}
            </Box>
          </div>
        </div>
      </Fade>
    </Modal >
  )
}

interface HoverCloseProps {
  handleClose: () => void
}

function HoverClose (props: HoverCloseProps) {
  const [hover, setHover] = useState(false)

  const regularElement = <CloseIcon onClick={props.handleClose} fontSize="large" />

  const hoverElement = <CancelIcon onClick={props.handleClose} fontSize="large" />
  return (
    <div
      className='flexRow justifyContentFlexEnd'
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {hover ? hoverElement : regularElement}
    </div>)
}
