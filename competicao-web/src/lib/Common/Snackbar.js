import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { withStyles } from '@material-ui/core/styles';

function CustomSnackbar({classes, message, action=[], ...props}) {
  return (
    <Snackbar
      {...props}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right', }}
        open={!!message}                
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        action={[
          ...action,
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={props.onClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
        message={<span id="message-id">{message}</span>}/>
  )
}

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2,
  },
})

export default withStyles(styles)(CustomSnackbar)
