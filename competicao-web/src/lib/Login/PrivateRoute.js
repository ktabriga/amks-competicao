import React from 'react'
import PropTypes from 'prop-types'
import {Redirect, Route} from 'react-router-dom'
import {Consumer} from './Auth'

const PrivateRoute = ({component, loginPath='/login', ...props}) => (
  <Consumer>
    {({loggedin}) =>
      <Route
        exact
        {...props}
        render={ loggedin ? null : () => <Redirect to={loginPath}/>}
        component={loggedin ? component : null} />
    }
  </Consumer>
)

PrivateRoute.propTypes = {
  loginPath: PropTypes.string,
  loggedin: PropTypes.bool
}

export default  PrivateRoute
