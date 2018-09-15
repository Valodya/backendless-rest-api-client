const testBackendlessApi = require('./backendless')

Promise.resolve()
  .then(testBackendlessApi)
  .then(() => console.log('Tests are completed successful!'))
  .catch(error => {
    console.error('Tests failed!')
    console.error(error)

    process.exit(0)
  })