import React from 'react'
import PropTypes from 'prop-types'
import {CrudOnRestContext} from './CrudOnRest'
import crudList from './HOC/crudList'
import filterable from './HOC/filter'
import {Route} from 'react-router-dom'
import FilterActions from '../CrudComponents/FilterActions'
import Paper from '@material-ui/core/Paper'

export default class Crud extends React.Component {
  static propTypes = {
    resource: PropTypes.string,
    list: PropTypes.func
  }

  constructor(props) {
    super(props)
    const {list, path} = this.props
    this.EnhancedList = crudList({ path })(list)
    this.EnhancedFilter = this.renderFilter()
  }

  renderList = (serverService, {location, history}) => {
    const EnhancedList = this.EnhancedList
    const EnhancedFilter = this.EnhancedFilter
    serverService.setResource(this.props.resource)
    serverService.setFilterOptions(this.props.filterOptions)
    return (
      <div>
        { EnhancedFilter ? <EnhancedFilter /> : null }
        <EnhancedList
          location={location}
          history={history}
          serverService={serverService}
          listOptions={this.props.listOptions}/>
      </div>
    )
  }
  renderFilter = () => {
    const {filter: FilterForm, path} = this.props
    if (FilterForm) {
      const EnhancedFilter = ({onClear, handleSubmit}) => (
        <Paper style={{padding: 10, marginBottom: 20}}>
          <form onSubmit={handleSubmit}>
            <FilterForm />
            <FilterActions onClear={onClear}/>
          </form>
        </Paper>
      )
      return  filterable({form: path})(EnhancedFilter)
    }
    return null
  }

  renderContent = (props) => {
    return (
      <CrudOnRestContext.Consumer>
        { ({serverService}) => this.renderList(serverService, props) }
      </CrudOnRestContext.Consumer>
    )
  }

  render() {
    return (
      <Route
        exact
        path={this.props.path}
        render={this.renderContent}
        {...this.prop}/>
    )
  }
}

