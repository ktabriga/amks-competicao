import React from 'react'
import { OnChange } from 'react-final-form-listeners'
import {Field} from 'react-final-form';

export default function WhenFieldChanges({ field, becomes, set, to }) {
  return (
    <Field name={set} subscription={{}}>
      {(
        { input: { onChange: change } }
      ) => (
        <OnChange name={field}>
          {value => {
            change(to(value))
          }}
        </OnChange>
      )}
    </Field>
  )
}
