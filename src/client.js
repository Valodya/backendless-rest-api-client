const Request = require('backendless-request')

class Client {

  constructor({ basePath, authHeaderKey, authHeaderValue }) {
    this.basePath = basePath || ''
    this.authHeaderKey = authHeaderKey
    this.authHeaderValue = authHeaderValue

    this.middlewares = []

    Request.methods.forEach(method => {
      this[method] = (path, body) => this.request(this.basePath + path, method, body)
    })

    this.addMiddleware(request => {
      if (this.authHeaderValue) {
        request.set(this.authHeaderKey, this.authHeaderValue)
      }
    })
  }

  setAuth(authHeaderValue) {
    this.authHeaderValue = authHeaderValue
  }

  request(path, method, body) {
    let request = new Request(path, method, body)

    this.middlewares.forEach(middleware => {
      if (!middleware.method || middleware.method === method) {
        request = middleware.handler(request) || request
      }
    })

    return request
  }

  addMiddleware(method, handler) {
    if (typeof method === 'function') {
      handler = method
      method = undefined
    }

    this.middlewares.push({ method, handler })
  }

}

module.exports = Client
