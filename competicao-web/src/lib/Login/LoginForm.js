import React from 'react'
import PropTypes from 'prop-types'
import {TextField} from 'final-form-material-ui';
import {Field} from 'react-final-form';
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import styled from 'styled-components'
import { withTheme } from '@material-ui/core/styles'
import { Form } from 'react-final-form'
import validation from '../Utils/Validation'
import Snackbar from '../Common/Snackbar'

const Background = withTheme()(styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${props => props.theme.palette.primary.main}
`)

class LoginForm extends React.Component {
  static propTypes = {
    usernameLabel: PropTypes.string,
    passwordLabel: PropTypes.string,
    errorMessage: PropTypes.string,
    validate: PropTypes.func,
    logo: PropTypes.element,
    onSubmit: PropTypes.func.isRequired
  }

  validate = values => {
    const {requiredLabel} = this.props
    return {
      username: validation.required(values.username, requiredLabel),
      password: validation.required(values.password, requiredLabel),
    }
  }

  render() {
    const {
      usernameLabel = 'Username',
      passwordLabel = 'Password',
      submitLabel = 'Login',
      recoverPasswordLabel = 'Recover Password',
      logo,
      onSubmit,
      validate = this.validate,
      errorMessage
    } = this.props

    return (
      <Background>
        <Paper
          style={{padding: 20, minWidth: 300}}
          elevation={4}>
          { logo }
          <Form onSubmit={onSubmit} validate={validate}>
            {
              ({handleSubmit, submitting}) => (
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={16} direction='column'>
                    <Grid item>
                      <Field
                        fullWidth
                        component={TextField}
                        label={usernameLabel}
                        name='username'/>
                    </Grid>
                    <Grid item>
                      <Field
                        fullWidth
                        component={TextField}
                        label={passwordLabel}
                        type='password'
                        name='password'/>
                    </Grid>
                    <Grid item>
                      <Button
                        fullWidth
                        disabled={submitting}
                        variant='contained'
                        color='primary'
                        type='submit'>
                        {submitLabel}
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        type='button'
                        fullWidth
                        onClick={this.props.onPasswordRecoverLick}>
                        {recoverPasswordLabel}
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              )
            }
          </Form>
        </Paper>
        <Snackbar
          autoHideDuration={4000}
          onClose={this.handleSanckbarClose}
          message={errorMessage} />
      </Background>
    )
  }
}


export default LoginForm
