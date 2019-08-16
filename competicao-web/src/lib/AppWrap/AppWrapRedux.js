import {createAction, handleActions} from 'redux-actions'
import Immutable from 'seamless-immutable'
import * as R from 'ramda'

const toggleMenu = createAction('TOGGLE_MENU')
const collapseMenu = createAction('COLLAPSE_MENU')

const initialState = Immutable({
  opened: true
})

export const reducer = handleActions({
  [toggleMenu]: state => state.set('opened', !state.opened),
  [collapseMenu]: (state) => state.set('opened', false),
}, initialState)

export const actionCreators = {
  toggleMenu,
  collapseMenu
}

//------------ Selectors --------

export const isOpenSelector = R.path(['appWrap', 'opened'])

