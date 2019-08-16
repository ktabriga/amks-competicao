import React from 'react'
import {RecoverPassword} from '../../lib/Login'

export default function CustomRecoverPassword({history}) {

  const handleSubmit = ({username}) => {
    if (username === 'teste') {    
      return Promise.resolve({ok: true, message: 'Email enviado, verifique sua caixa de entrada'})
    }
    return {ok: false, message: 'Usuário não encontrado'}
  }

  return (
    <RecoverPassword
      history={history}
      usernameLabel='Email'
      backLabel='Voltar'
      submitLabel='Recuperar'
      onBackClick={() => history.goBack()}
      onSubmit={handleSubmit}
      />
  )
}

