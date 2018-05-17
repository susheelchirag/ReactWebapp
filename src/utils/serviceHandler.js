import * as Constants from 'utils/constants'
import * as Config from 'utils/config'
import { payloadFormatter } from 'utils/utilites'
import { call } from 'redux-saga/effects'
import partial from 'lodash/partial'

const apiError = status => {
  switch (true) {
    case status >= 200 && status < 300:
      return {errorType: 'Constants.ERROR_TYPES.COMMON', errorCode: status, errorMessage: 'Constants.ERROR.API_MSG'}
    case status === 401 || status === 403:
      return {errorType: 'Constants.ERROR_TYPES.AUTHORIZATION', errorCode: status, errorMessage: 'Constants.ERROR.AUTHORIZATION_MSG'}
    default:
      return 'Constants.ERROR.DEFAULT_MSG'
  }
}
const isContentTypeJSON = response => {
  const headers = response.headers
  const contentType = headers.get('Content-Type')
  if (contentType.indexOf('application/json') > -1) {
    return true
  } else {
    return false
  }
}

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    if (isContentTypeJSON(response)) {
      return response
    } else {
      throw apiError(200)
    }
  } else if (response.status >= 400 && response.status < 500) {
    throw apiError(response.status)
  } else if (response.status >= 500 && response.status < 600) {
    throw Constants.ERROR.DEFAULT_MSG
  }
}

const parseJson = response => response.json()

const invokeService = ({ serviceId, requestData = {} }) => {
  console.log('invokeService')
  const { endPoint, contentType, method } = Config[serviceId]
  let apiURL = endPoint
  const paramsType = (method === 'POST' && (contentType && (contentType.indexOf('json') > -1))) ? 'json' : 'form-data'
  console.log('serviceName is ', endPoint)
  console.log('requestData is ', requestData)
  const options = {
    method: method,
    headers: {
      'Accept': 'application/json'
    }
  }
  if (paramsType === 'json' && method === 'POST') {
    requestData = payloadFormatter(requestData, 'POST')
    options.body = requestData
  }
  if (method === 'GET') {
    apiURL = apiURL + '?' + payloadFormatter(requestData, 'GET')
  }
  return fetch(apiURL, options)
    .then(checkStatus)
    .then(parseJson)
}
export const serviceEffect = partial(call, invokeService)
