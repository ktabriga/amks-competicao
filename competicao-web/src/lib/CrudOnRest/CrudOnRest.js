import React from 'react'
import {create} from 'apisauce'
import PropTypes from 'prop-types'
import {createServerService} from './serverService'

export const CrudOnRestContext = React.createContext({})

export default class CrudOnRest extends React.Component {
  static propTypes = {
    baseURL: PropTypes.string
  }

  constructor(props) {
    super(props)
    const {countUrl, queryBuilder, baseURL} = props
    const api = create({
      baseURL: baseURL
    })
    this.serverService = createServerService(api, countUrl, queryBuilder)
  }

  render() {
    return (
      <CrudOnRestContext.Provider value={{serverService: this.serverService}}>
        {this.props.children}
      </CrudOnRestContext.Provider>
    )
  }
}
