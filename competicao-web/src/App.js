import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {loginRoutes, PrivateRoute} from './lib/Login'
import { MuiThemeProvider} from '@material-ui/core/styles'
import theme from './Theme'
import RecoverPassword from './modules/Login/RecoverPassword'
import AuthProvider from './lib/Login/Auth'
import Login from './modules/Login/Login'
import Home from './modules/Home'
import {setToken} from './services/Api'
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <AuthProvider withUser={user => setToken(user.token)}>
            <Router>
              <Switch>
                <Route path={loginRoutes.login} component={Login} />
                <Route path={loginRoutes.recoverPassword} component={RecoverPassword}/>
                <PrivateRoute path='/' component={Home}/>
              </Switch>
            </Router>
          </AuthProvider>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    );
  }
}

export default App;
