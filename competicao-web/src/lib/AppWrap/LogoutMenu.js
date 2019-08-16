import React from 'react'
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew'
import IconButton from '@material-ui/core/IconButton';

export default class LogoutMenu extends React.Component {
  render() {
    const {logout, logoutLabel='logout'} = this.props
    return (
      <IconButton onClick={logout} title={logoutLabel} >
        <PowerSettingsNew></PowerSettingsNew>
      </IconButton>
    )
  }
}
