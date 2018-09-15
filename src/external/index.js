const Client = require('../client')

const createExternalApiClient = () => {
  const client = new Client({
    basePath: `http://my-host.com`,
  })

  return {
    someRequest() {
      return client.get('/somthing')
    },
  }
}

module.exports = createExternalApiClient


