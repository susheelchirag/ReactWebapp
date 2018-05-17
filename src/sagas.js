import { put, select } from 'redux-saga/effects'
import { createPathChangeSagaWatcher } from 'utils/sagaUtils'
import { jokesSagaWatcher } from 'models/jokes'

const pathChangeSagaWatcher = createPathChangeSagaWatcher({
  '*': function () {
    console.log('you changed to another path')
  }
})

function * rootSaga () {
  yield [
    ...pathChangeSagaWatcher,
    ...jokesSagaWatcher
  ]
}

export default rootSaga
