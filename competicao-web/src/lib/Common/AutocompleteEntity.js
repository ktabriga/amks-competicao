import React, {useState, useEffect} from 'react'
import Autocomplete from './Autocomplete'
import * as R from 'ramda'

/*
 * Options format:
 * Array of {label: string, id: any}
 */

export default function AutocompleteEntity({value, onChange, onBlur, error, helperText, options=[], ...rest}) {
  const [item, setItem] = useState(null)

  const handleChange = (item) => {
    onChange && onChange(item ? item.id : null)
    setItem(item)
  }

  useEffect(() => {
    if (typeof value === 'number' && !item) {
      const item = R.find(R.propEq('id', value), options)
      setItem(item)
    }
  }, [value, options.length])

  return (
    <Autocomplete
      {...rest}
      value={item}
      textFieldProps={{onBlur, helperText, error}}
      onChange={handleChange}
      options={options}/>
  )
}
