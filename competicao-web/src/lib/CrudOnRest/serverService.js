import { makeFieldUnmapper } from './Mapper'
import moment from 'moment'
import * as R from 'ramda';
import {loopbackRange} from './QueryUtils'

const makeQueryFilter = (filter, key, value) => {
  const type = filter[key];
  value = type === 'regexp' ? `/${value}/i` : value;
  if (!type) {throw Error('Filter type not defined for ' + key)};
  if (type === 'equal') {
    return `filter[where][${key}]=${value}`;
  }
  if (type === 'dateBetween') {
    return loopbackRange(key, value, moment())
  }
  if (type === 'day') {
    return loopbackRange(key, 'DAY', value)
  }
  return `filter[where][${key}][${type}]=${value}`;
}

const makeServerFilters = (filters, fields, filterOptions) => {//change the filter name, it is the options that came from model
  return '&' + R.splitEvery(2, filters.split(/[,=]/g))
    .map(([key, value]) => {
      if (!value) {return ''};
      const cleanValue = fields ? makeFieldUnmapper(R.path([key, 'mapper'], fields))(value) : value;
      return makeQueryFilter(filterOptions, key, cleanValue);
    }).join('&');

}
export const createServerService = (api, countUrl, queryBuilder) => ({
  setResource: resource => this.resource = resource,
  setFilterOptions: filterOptions => this.filterOptions = filterOptions,
  fetchList: (params) => {
    const filters = this.filterOptions ? makeServerFilters(params.filters || '', null, this.filterOptions) : ''
    const resourceWithParams = (queryBuilder ? queryBuilder(this.resource, params) : this.resource) + filters
    return api.get(resourceWithParams)
  },
  hasCountUrl: !!countUrl,
  fetchCount: (resource) => api.get(`${this.resource}/${countUrl.replace('/', '')}`)
})

