import { takeEvery } from 'redux-saga/effects'

export const createSagaWatcher = sagas => Object
  .keys(sagas)
  .map(type => (function * () { yield takeEvery(type, sagas[type]) })())

/**
 * Prerequisite:
 * - react-router-redux is properly configured
 *
 * --------------------------------------
 * import { createPathSagaWatcher } from 'falcon'
 *
 * const pathSaga = createPathSaga({
 *   '*': function * () {}
 *   '/path1': function * () {},
 *   '/path2': function * () {}
 * })
 */
export const createPathChangeSagaWatcher = props => createSagaWatcher({
  '@@router/LOCATION_CHANGE': function * ({payload: { pathname }}) {
    const func = props[pathname]
    const universalFunc = props['*']
    if (func) yield func()
    if (universalFunc) yield universalFunc()
  }
})
