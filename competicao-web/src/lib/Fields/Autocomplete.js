import React from 'react'
import Autocomplete from '../Common/Autocomplete'

export default function AutocompleteField({input, meta, ...props}) {
  return (
    <Autocomplete
      {...props}
      meta={meta}
      error={meta &&(meta.error && meta.touched)}
      textFieldProps={{onBlur: input.onBlur, helperText: meta.touched && meta.error, error: meta.error && meta.touched}}
      helperText={meta.touched && meta.error}
      value={input.value}
      onBlur={input.onBlur}
      onChange={input.onChange}/>
  )
}
