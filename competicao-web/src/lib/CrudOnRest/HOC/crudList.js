import React from 'react';
import { connect } from 'react-redux';
import {compose} from 'recompose'
import {listSelector} from '../Redux/CrudRedux'
import {actionCreators} from '../Redux/CrudRedux.js'
import {objectToQueryArgs} from '../QueryUtils'

export default ({ path }) => ListComponent => {

  const mapStateToProps = state => ({
    list: listSelector(state)
  })

  class CrudList extends React.Component {

    fetchList = () => {
      const {defaultOrder} = this.props.listOptions
      const params = new URLSearchParams(this.props.location.search)
      const page = params.get('page') || 0
      const rows = params.get('rows') || 10
      //const filters = params.get('filters')
      const order = params.get('order') || defaultOrder
      this.props.fetchListApi({
        page, 
        rows,
        filters: params.get('filters'), 
        order
      }, this.props.serverService)
    }

    componentDidMount() {
      this.fetchList()
    }

    componentDidUpdate(prevProps) {
      if (this.props.location.search !== prevProps.location.search) {
        this.fetchList()
      }
    }

    componentWillUnmount() {
      this.props.clearList();
    }

    editEntity = entity =>  {
      this.props.history.push(`${path}/${entity.id}`);
    }

    newEntity = (options = {}) => {
      const {initialValues} = options;

      const urlParams = initialValues ? `?initialValues=${encodeURIComponent(objectToQueryArgs(initialValues))}` : ''
      this.props.history.push(`${path}/new${urlParams}`)
    }

    render() {
      return (
        <ListComponent
          {...this.props}
          onClickEdit={this.editEntity}
          onClickNew={this.newEntity}
          setExtraFilters={extraFilters => this.extraFilters = extraFilters} 
        />
      );
    }
  }

  return compose(
    connect(mapStateToProps, actionCreators)
  )(CrudList);
};
