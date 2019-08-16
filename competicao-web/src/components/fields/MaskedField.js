import React from 'react'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import FormHelperText from '@material-ui/core/FormHelperText'
import MaskedInput from 'react-text-mask';

function TextMaskCustom(props) {
  const { inputRef, mask, ...other } = props;
  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={mask}
    />
  );
}

export function MaskedField(props) {
  const {
    input: {name, onChange, value, onBlur},
    meta,
    mask,
    label,
    ...rest
  } = props;

  const showError =
    ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) &&
    meta.touched;

  return (
    <FormControl
      error={meta.error && meta.touched}
      fullWidth >
      <InputLabel
        htmlFor={name}
      >
        {label}
      </InputLabel>
      <Input
        {...rest}
        onBlur={onBlur}
        name={name}
        error={showError}
        value={value}
        aria-describedby="helper-text"
        onChange={onChange}
        inputProps={{
          mask: mask
        }}
        inputComponent={TextMaskCustom}
      />
      {showError ? <FormHelperText error={showError} id="helper-text">{meta.error}</FormHelperText> : null}
      </FormControl>
  );
}
