import React from 'react'
import {Login} from '../../lib/Login'
import logo from '../../images/logo-avaliare.png';
import {login, setToken} from '../../services/Api'

export default function CustomLogin({history}) {

  const handleLogin = async ({username, password}) => {
    const response = await login({
      username,
      password
    })
    if (response.ok) {
      setToken(response.data.token)
      return {
        ok: true,
        token: response.data.token,
        name: username
      }
    }
  }

  return (
    <Login
      history={history}
      onSubmit={handleLogin}
      requiredLabel='Obrigatório'
      usernameLabel='Usuário'
      submitLabel='Entrar'
      passwordLabel='Senha'
      recoverPasswordLabel='Recuperar Senha'
      logo={null} />
  )
}
