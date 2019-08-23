import React from 'react'
import PropTypes from 'prop-types'
import LoginForm from './LoginForm'
import {Redirect} from 'react-router-dom'
import {AuthContext} from './Auth'



class Login extends React.Component {
  static propTypes = {
    doLogin: PropTypes.func,
    onSubmit: PropTypes.func.isRequired,//(credentials: {username, password}) => Promise
    requiredLabel: PropTypes.string,
    redirectPath: PropTypes.string,
    loggedin: PropTypes.bool,
    recoverPasswordLabel: PropTypes.string
  }
  static contextType = AuthContext
  state = {
    errorMessage: ''
  }

  handleSubmit = async (credentials) => {
    const {onSubmit} = this.props
    const data = await onSubmit(credentials)
    if (data && data.ok) {
      if (!this.context.handleUserLogin) {
        return console.warn('Login Context not found')
      }
      return this.context.handleUserLogin(data)
    }
    this.setState({
      errorMessage: 'Usuário ou senha inválidos'
    })

  }

  handleRecoverPasswordClick = () => {
    if (!this.props.history) {
      return console.warn('History not found. Try to pass password to login component')
    }
    this.props.history.push('/recover-password')
  }


  handleSanckbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    this.setState({
      errorMessage: ''
    })
  }

  render() {
    const {
      screen: Screen,
      redirectPath,
      classes,
      ...rest
    } = this.props
    const {loggedin} = this.context

    if (Screen) {
      return (
        <Screen handleLogin={this.login} />
      )
    }

    if (loggedin) {
      return <Redirect to={'/' || redirectPath} />
    }

    return (
      <LoginForm
        {...rest}
        validate={this.validate}
        onPasswordRecoverLick={this.handleRecoverPasswordClick}
        errorMessage={this.state.errorMessage}
        requiredLabel={this.props.requiredLabel}
        onSubmit={this.handleSubmit}/>
    )
  }
}


export default Login
