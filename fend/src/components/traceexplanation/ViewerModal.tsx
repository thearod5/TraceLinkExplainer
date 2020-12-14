import { Backdrop, Box, Fade, Modal } from '@material-ui/core'
import CancelIcon from '@material-ui/icons/Cancel'
import CloseIcon from '@material-ui/icons/Close'
import React, { useState } from 'react'
import { FADE_TIMEOUT } from '../../constants'
interface ViewerModalProps {
  title: string
  open: boolean
  handleClose: (() => void) | null
  body: JSX.Element

}

export default function ViewerModal (props: ViewerModalProps) {
  const { title, open, handleClose, body } = props

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
                <h2 className="displayInlineBlock textAlignCenter padMedium">{title}</h2>
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
