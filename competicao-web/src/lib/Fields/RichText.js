import React from 'react'
import RichText from '../Common/RichText'

export default function CustomRichText({input, ...props}) {
  if (!input) {
    console.warn('You shold pass this component to a Fild')
    return null
  }

  return (
    <RichText
      {...props}
      onChange={input.onChange}
      onFocus={input.onFocus}
      onBlur={input.onBlur}
      value={input.value}/>
  )
}
