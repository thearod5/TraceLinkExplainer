import { IconButton, Snackbar } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import React, { useContext } from 'react'
import { AppContext } from '../../App'

export default function AppSnackBar () {
  const { error, setError } = useContext(AppContext)

  const handleClose = () => setError(undefined)
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      open={ error !== undefined}
      autoHideDuration={10000}
      onClose={handleClose}
    >
      <Alert severity="error" style={{ width: '100%' }}>
        {error}
        <IconButton
          className="padSideLight"
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Alert>
    </Snackbar>
  )
}
function Alert (props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}
