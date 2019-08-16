import React from 'react'

const initialState = {
  loggedin: false,
  user: {
    name: 'unkown'
  }
}
export const AuthContext = React.createContext(initialState)
export const {Consumer} = AuthContext

export default class Auth extends React.Component {
  state = initialState

  constructor(props) {
    super(props)
    const stringUser = localStorage['user']
    if (stringUser) {
      const user = JSON.parse(stringUser)
      props.withUser && props.withUser(user)
      this.state = {
        user,
        loggedin: true
      }
    }
  }

  handleUserLogin = (user) => {
    localStorage['user'] = JSON.stringify(user)
    this.setState({
      user,
      loggedin: true
    })
  }

  logout = () => {
    delete localStorage.user
    this.setState({
      user: undefined,
      loggedin: false
    })
  }

  render() {
    const {children} = this.props
    return (
      <AuthContext.Provider value={{
        loggedin: this.state.loggedin,
        logout: this.logout,
        user: this.state.user,
        handleUserLogin: this.handleUserLogin
      }}>
        {children}
      </AuthContext.Provider>
    )
  }
}
