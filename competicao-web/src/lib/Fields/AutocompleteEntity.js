import React from 'react'
import AutocompleteEntity from '../Common/AutocompleteEntity'

export default function AutocompleteEntityField({input, meta, ...props}) {
  return (
    <AutocompleteEntity
      {...props}
      meta={meta}
      error={meta.error && meta.touched}
      helperText={meta.touched && meta.error}
      value={input.value}
      onBlur={input.onBlur}
      onChange={input.onChange}/>
  )
}
