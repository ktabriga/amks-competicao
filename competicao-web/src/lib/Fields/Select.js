import React from 'react'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


export default function SelectField({input, label, meta, options}) {
  return (
    <FormControl style={{width: '100%'}}>
      <InputLabel htmlFor="age-simple" error={meta.touched && !!meta.error}>{label}</InputLabel>
      <Select
        error={meta.error && meta.touched}
        value={input.value}
        onChange={input.onChange}
        onBlur={input.onBlur}
      >
        <MenuItem value="">
          <em>Vazio</em>
        </MenuItem>
        {
          options.map(option => (
            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
          ))
        }
      </Select>
      <FormHelperText error>{meta.touched && meta.error}</FormHelperText>
    </FormControl>
  )
}
