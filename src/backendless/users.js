const Constants = require('./constants')
const Urls = require('./urls')

const usersApi = client => {

  return {
    register(user) {
      return client.post(Urls.userRegister(), user)
    },

    login(login, password) {
      return client
        .post(Urls.userLogin(), { login, password })
        .then(user => {
          client.setAuth(user[Constants.BACKENDLESS_AUTH_KEY])

          return user
        })
    },

    logout() {
      return client
        .get(Urls.userLogout())
        .then(() => client.setAuth(null))
    }
  }
}

module.exports = usersApi


