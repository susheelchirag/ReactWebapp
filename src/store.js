import createSagaMiddleware from 'redux-saga'
import promiseMiddleware from 'redux-promise'
import { createStore, applyMiddleware, compose } from 'redux'
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux'
import { rootReducer } from 'reducers'
import rootSaga from 'sagas'
import { isProduction } from 'utils/utilites'

/** --------------------------------------------------------
 *
 * Combine middleware - rootMiddleware
 */
// configure reduxRouterMiddleware
export const history = createHistory()
const reduxRouterMiddleware = routerMiddleware(history)

// configure sagaMiddleware
const sagaMiddleware = createSagaMiddleware()

const middlewares = [
  sagaMiddleware,
  promiseMiddleware,
  reduxRouterMiddleware
]
const enhancers = [
  applyMiddleware(...middlewares)
]
let composeEnhancers

if (isProduction()) {
  composeEnhancers = compose
} else {
  composeEnhancers = require('redux-devtools-extension').composeWithDevTools
}

/** --------------------------------------------------------
 *
 * App Default State
 */

// export appDefaultState as well
export const appDefaultState = {
}

/** --------------------------------------------------------
 *
 * END
 */
// create store
const store = createStore(rootReducer, appDefaultState, composeEnhancers(...enhancers))

// run rootSaga
sagaMiddleware.run(rootSaga)

// export store
export default store
