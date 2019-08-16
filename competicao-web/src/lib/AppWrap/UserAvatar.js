import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import PersonPinIcon from '@material-ui/icons/PersonPin'
import {AuthContext} from '../Login/Auth'
import * as R from 'ramda'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    color: theme.palette.grey[800],
    fontSize: 40,
  },
  textColor: {
    color: theme.palette.white
  },
  icon: {
    marginRight: 5
  }
})

class UserAvatar extends React.Component {
  static contextType = AuthContext

  logout = () => {
    this.context.logout && this.context.logout()
  }

  render() {
    const {userAvatar, classes,  showActions = true, message, helloLabel='Olá', logoutLabel='Sair'} = this.props
    const username = R.path(['context', 'user', 'name'], this)

    return (
      <div className={classNames(classes.root)} >
        {userAvatar ? <Avatar src={userAvatar}/> : <PersonPinIcon fontSize='inherit' classes={{root: classes.icon}}/>}
        <div className="ml-10">
          <Grid container alignItems="center">
            <Grid item className="pr-0">
              <Typography variant="body1" color="inherit" >{helloLabel}&nbsp;</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" color="inherit" >{username}</Typography>
            </Grid>
          </Grid>

          { showActions && <Typography variant="caption" color="inherit" style={{cursor: 'pointer'}}  onClick={this.logout}>{logoutLabel}</Typography> }
          <Typography variant="caption" color="inherit">{message}</Typography>

        </div>

      </div>
    )
  }
}

export default withStyles(styles)(UserAvatar)

