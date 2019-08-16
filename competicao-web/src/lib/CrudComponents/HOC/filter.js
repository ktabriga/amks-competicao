import React from 'react'
import {withRouter} from 'react-router-dom'
import {toPairs, splitEvery} from 'ramda'
import {compose} from 'recompose'


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
    .map(([key, value]) => {
      if (value.id) {
        return `${key}=${value.id}`
      }
      return `${key}=${value}`
    })
    .join(',')

const filterBehavior = Component => {

  return class FilterContainer extends React.Component {

    constructor(props) {
      super(props)
      const {location: {search}} = this.props
      const initialValues = recoverValues(search)
      this.state = { initialValues }
    }

    handleSubmit = (values) => {
      const {history, location: {pathname}} = this.props
      history.push(`${pathname}?filters=${createFilters(values)}`)
    }

    handleClear = () => {
      const {history, location} = this.props
      this.setState({ initialValues: {} })
      history.push(location.pathname)
    }

    render() {
      return (
        <Component
          initialValues={this.state.initialValues}
          onClear={this.handleClear}
          onSubmit={this.handleSubmit} />
      )
    }
  }
}

export default compose(
  withRouter,
  filterBehavior
)
