import {withRouter} from 'react-router-dom'
import {toPairs, splitEvery} from 'ramda'
import {compose, withProps} from 'recompose'
import { reduxForm} from 'redux-form'


const recoverValues = (search) => {
  const searchParams = new URLSearchParams(search)
  const filters = searchParams.get('filters')
  if (!filters) return
  return splitEvery(2, filters.split(/[,=]/g))
    .reduce((values, [key, value]) => ({
      ...values,
      [key]: value
    }), {})
}

const createFilters = values =>
  toPairs(values)
    .map(([key, value]) => `${key}=${value}`)
    .join(',')

export default ({form}) =>
  compose(
    withRouter,
    withProps(({history, location: {search, pathname}}) => ({
      enableReinitialize: true,
      initialValues: recoverValues(search),
      onSubmit: (values) => history.push(`${pathname}?filters=${createFilters(values)}`),
      onClear: (values) => history.push(`${pathname}`)
    })),
    reduxForm({form})
  )


