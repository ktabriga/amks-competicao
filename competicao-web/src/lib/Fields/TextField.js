import React from 'react'
import FieldMessage from './FieldMessage'
import TextField from '@material-ui/core/TextField'
import {Field} from 'react-final-form'

export default class CustomTextField extends React.Component {

  render () {
    const {source, ...props} = this.props
    return (
      <Field name={source}>
        {
          ({input, meta}) => {
            return <TextField
              {...props}
              fullWidth
              helperText={meta.touched && meta.error}
              error={meta.touched && !!meta.error}
              {...input}/>
          }
        }
      </Field>
    )
  }
}

class TextInput extends React.Component {
  render() {
    const {
      feedback,
      type='text',
      multiline,
      autoComplete = (type === 'password' ? "off" : 'on'),
      input,
      shrink,
      meta: { error, touched  },
      ...rest
    } = this.props

    return (
      <div style={{marginBottom: 10}}>
        <TextField
          fullWidth
          {...rest}
          {...input}
          autoComplete={autoComplete}
          type={type}
          InputLabelProps={{ shrink }}/>
        {feedback}
        <FieldMessage errors={[error]} touched={touched} />
      </div>
    )
  }
}

const OldBackup = ({source, ...props}) => {
  return (
    <Field
      {...props}
      name={source}
      component={TextInput} />
  )
}
