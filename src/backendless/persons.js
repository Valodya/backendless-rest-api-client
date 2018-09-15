const Urls = require('./urls')

const TABLE_NAME = 'Person'

const personsApi = client => {

  return {
    create(person) {
      return client.post(Urls.dataTable(TABLE_NAME), person)
    },

    find(query) {
      return client.get(Urls.dataTable(TABLE_NAME)).query(query)
    },

    findById(personId, query) {
      return client.get(Urls.dataTableObject(TABLE_NAME, personId)).query(query)
    },

    getCount(query) {
      return client.get(Urls.dataTableCount(TABLE_NAME)).query(query)
    },

    update(person) {
      return client.put(Urls.dataTableObject(TABLE_NAME, person.objectId), person)
    },

    remove(personId) {
      return client.delete(Urls.dataTableObject(TABLE_NAME, personId))
    },
  }
}

module.exports = personsApi


