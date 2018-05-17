export const isProduction = () => {
  return process.env.NODE_ENV === 'production' // ||
  // process.env.NODE_ENV === 'uat' ||
  // process.env.NODE_ENV === 'sit'
}

export const payloadFormatter = (payload, type) => {
  if (type === 'GET') {
    return Object.entries(payload).map(([key, val]) => `${key}=${val}`).join('&')
  }
  return JSON.stringify(payload)
}
