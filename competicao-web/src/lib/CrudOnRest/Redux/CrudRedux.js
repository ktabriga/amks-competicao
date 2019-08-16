import {createAction, handleActions} from 'redux-actions'
import Immutable from 'seamless-immutable'
import {toResponsePayload} from '../../Utils/ApiUtils'
import * as R from 'ramda'

//#### Actions ####
const fetchList = createAction('FETCH_LIST')
const clearList = createAction('CLEAR_LIST')
const fetchListResult = createAction('FETCH_LIST_RESULT')
const fetchCountResult = createAction('FETCH_COUNT_RESULT')
const changeRowsPerPage = createAction('CHANGE_ROWS_PER_PAGE')

const fetchListApi = (params, serverService) => async (dispatch, getState) => {
  dispatch(fetchList({params}))
  const response = await serverService.fetchList(params)
  R.pipe(
    toResponsePayload,
    fetchListResult,
    dispatch
  )(response)
  return response.ok
}

const fetchCount = (serverService) => async dispatch => {
  if (serverService.hasCountUrl) {
    const response = await serverService.fetchCount()
    R.pipe(
      toResponsePayload,
      fetchCountResult,
      dispatch
    )(response)
  }
}

export const actionCreators = {
  fetchListApi,
  clearList,
  fetchCount,
  changeRowsPerPage
}

//#### Reducers ####

const initialState = Immutable({
  loading: false,
  list: [],
  count: 0,
})

const ignoreError = (fn) => (state, {payload, error}) => 
  error ? state : fn(state, payload)

const fetchCountReducer = ignoreError((state, payload) => state.set('count', payload.count))
const fetchListReducer = ignoreError((state, payload) => state.set('list', payload))

export const createReducer = (options = {}) => {

  return handleActions({
    [fetchList]: state => state.set('loading', true),
    [fetchCountResult]: options.fetchCountReducer || fetchCountReducer,
    [clearList]: state => state.set('list', []),
    [fetchListResult]: options.fetchListReducer || fetchListReducer,
    [changeRowsPerPage]: (state, {payload}) => state.set('rowsPerPage', payload)
  }, initialState)
}
//#### Selectors ####

export const listSelector = R.pathOr([], ['crud', 'list'])
export const rowsPerPageSelector = R.pathOr([], ['crud', 'rowsPerPage'])
export const countSelector = R.pathOr([], ['crud', 'count'])
