import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import Typography from '@material-ui/core/Typography'

class SimpleBadge extends React.Component {

  render () {
    const {content, label, classes, primary, disabled} = this.props

    return (
      <div className={classes.container}>
        <div className={classNames(classes.root, primary && classes.primary, disabled && classes.disabled)}>
          <Typography variant="caption" color="inherit">
            {content}
          </Typography>
        </div>
        <Typography variant="body2">
          {label}
        </Typography>
      </div>
    )
  }
}


const size = 18
const borderRadius = size/2

const SimpleBadgeStyle = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: size,
    height: size,
    borderRadius,
    marginRight: 8
  },
  primary: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white
  },
  disabled: {
    backgroundColor: theme.palette.grey['500'],
    color: theme.palette.common.white
  }
});

export default withStyles(SimpleBadgeStyle)(SimpleBadge)
