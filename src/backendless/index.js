const Client = require('../client')

const Constants = require('./constants')

const usersApi = require('./users')
const personsApi = require('./persons')

const createBackendlessApiClient = (appId, apiKey) => {
  const client = new Client({
    basePath    : `${Constants.BACKENDLESS_API_HOST}/${appId}/${apiKey}`,
    authHeaderKey: Constants.BACKENDLESS_AUTH_KEY,
  })

  return {
    users  : usersApi(client),
    persons: personsApi(client),
  }
}

module.exports = createBackendlessApiClient


