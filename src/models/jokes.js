import { createAction, createReducer } from 'redux-act'
import { put } from 'redux-saga/effects'
import { createSagaWatcher } from 'utils/sagaUtils'
import { serviceEffect } from 'utils/serviceHandler'

/**
 * Actions
 */

export const fetchJoke = createAction('FETCH_JOKE')
export const fetchJokeSuccess = createAction('FETCH_JOKE_SUCCESS')
export const rateJoke = createAction('RATE_JOKE')
/**
  * Sagas
  */

export const sagas = {
  [fetchJoke]: function * () {
    const response = yield serviceEffect({serviceId: 'fetchJokes'})
    yield put(fetchJokeSuccess(response))
  }
}

export const jokesSagaWatcher = createSagaWatcher(sagas)
/**
 * Reducers
 */
export const jokes = {
  [fetchJokeSuccess]: (state, { id, joke }) => ({
    ...state,
    current: {
      id,
      joke
    }
  }),
  [rateJoke]: (state, action) => {
    const { id, joke, rating } = action
    return {
      ...state,
      ratedJokes: [
        ...state.ratedJokes,
        {id,
          joke,
          rating}
      ]
    }
  }
}

export const jokesInitialState = {
  current: {},
  ratedJokes: {}
}

export default createReducer(jokes, jokesInitialState)
