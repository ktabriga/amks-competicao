import React, {useEffect, useState} from 'react'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import {withStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import {Form} from 'react-final-form';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import classNames from 'classnames'
import Snackbar from '../Common/Snackbar'


function CrudForm({children, validate, getItem, withPaper, onSubmit, history, classes}) {
  const Container = withPaper ? Paper : (props => <div {...props}/>)
  const [item, setItem] = useState()
  const [formState, setFormState] = useState({
    status: 'edit',
    message: ''
  })

  const _getItem = async () => {
    if (getItem) {
      const data = await getItem()
      setItem(data)
    }
  }

  const handleSubmit = async (data) => {
    if (onSubmit) {
      const result = await onSubmit(data)
      setItem(data)
      if (result) {
        setFormState({
          status: result.ok ? 'success' : 'error',
          message: result.message
        })
        setTimeout(() => setFormState({
          status: 'edit',
          ...formState
        }), 4000)
      }
   }
  }

  const handleSnackbarClose = () => {
    setFormState({
      ...formState,
      message: ''
    })
  }

  useEffect(() => {
      _getItem()
  }, [history.location.pathname])

  const getButtonLabel = (submitting) => {
    if (submitting) {
      return (
        <div>
          <CircularProgress size={24} className={classes.buttonProgress} />,
          Salvando
        </div>
      )
    }
    switch (formState.status) {
      case 'success':
        return (
          [
            <CheckCircleIcon key='successIcon' className={classNames(classes.leftIcon, classes.iconSmall)}/>,
            <span key='successLabel'>Sucesso</span>

          ]
        )
      case 'edit':
        return 'Salvar'
      case 'error':
        return 'Oops, algo errado'
      default: throw Error('Unexpected formState')
    }
  }

  const getButtonClass = () => {
    switch (formState.status) {
      case 'success':
        return classes.successButton
      case 'edit':
        return classes.button
      case 'error':
        return classes.errorButton
      default: throw Error('Unexpected formState')
    }
  }

  return (
    <Container className={classes.root}>
      <Form onSubmit={handleSubmit} validate={validate} initialValues={item}>
        {
          ({handleSubmit, submitting}) => (
            <form onSubmit={handleSubmit} >
              <Grid direction='column' container spacing={16}>
                <Grid item>
                  <div className={classes.formContent}>
                    { children }
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <Grid justify='flex-end' container spacing={16}>
                    <Grid item classes={{item: classes.buttonContainer}}>
                      <Button fullWidth type='button' onClick={() => history.goBack()}>
                        Voltar
                      </Button>
                    </Grid>
                    <Grid item classes={{item: classes.buttonContainer}}>
                      <Button
                        className={getButtonClass()}
                        fullWidth
                        type='submit'
                        disabled={submitting}
                        variant='contained'
                        color='primary'>
                        {getButtonLabel(submitting)}
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          )
        }
      </Form>
      <Snackbar message={formState.message} onClose={handleSnackbarClose} autoHideDuration={4000}/>
    </Container>
  )
}
const styles = theme => ({
  formContent: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  buttonContainer: {
    width: 160
  },
  root: {
    padding: 16,
    marginBottom: 20
  },
  buttonWrapper: {
    margin: theme.spacing.unit,
    position: 'relative',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    right: 8,
    marginTop: -12,
    marginLeft: -12,
  },
  successButton: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[500],
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: green[500],
    },
  },
  errorButton: {
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[500],
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: red[500],
    },
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
})
export default withStyles(styles)(CrudForm)
