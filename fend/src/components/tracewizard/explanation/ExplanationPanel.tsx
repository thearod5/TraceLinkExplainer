import { Backdrop, Box, Fade, Modal } from '@material-ui/core'
import CancelIcon from '@material-ui/icons/Cancel'
import CloseIcon from '@material-ui/icons/Close'
import React, { useState } from 'react'
import { FADE_TIMEOUT } from '../../../constants'
import { useTraceExplanationCreator } from './hooks/useTraceExplanationCreator'
interface ViewerModalProps {
  open: boolean
}

/* Manages the modal that displays the concept graph between a selected word in a trace explanation
 *
 */

export default function ExplanationPanel (props: ViewerModalProps) {
  const { open } = props
  const [handleClose, selectedWord, body] = useTraceExplanationCreator()

  const handleCloseWrapper = () => {
    if (handleClose !== null) { handleClose() }
  }
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
                <h2 className="displayInlineBlock textAlignCenter padMedium">{selectedWord}</h2>
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
