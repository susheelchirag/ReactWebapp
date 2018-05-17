import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import { jokes } from 'models'

const appReducer = combineReducers({
  router: routerReducer,
  jokes
})

export const rootReducer = (state, action) => {
  return appReducer(state, action)
}
