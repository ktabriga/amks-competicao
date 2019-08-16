import React, {useState, useEffect} from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import RichTextEditor from 'react-rte';
import FormHelperText from '@material-ui/core/FormHelperText';


export default function RichText({label='', meta, onChange, onBlur, onFocus, value=''}) {
  const [editorState, setEditorState] = useState(RichTextEditor.createValueFromString(value, 'html'))
  const handleChange = (state) => {
    setEditorState(state)
    if (onChange) {
      onChange(state.toString('html'))
    }
  }

  useEffect(() => {
    if (!meta.visited) {
      setEditorState(RichTextEditor.createValueFromString(value, 'html'))
    }
  }, [value])

  return (
    <div>
      <InputLabel style={{fontSize: 13}} error={meta.touched && meta.error}>
        {label}
      </InputLabel>
      <div style={{marginTop: 8}}/>
      <RichTextEditor
        onBlur={onBlur}
        onFocus={onFocus}
        value={editorState}
        onChange={handleChange} />
      {meta.error && meta.touched && <FormHelperText error>{meta.error}</FormHelperText> }
    </div>
  )
}
