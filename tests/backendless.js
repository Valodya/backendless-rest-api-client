const { createBackendlessApiClient } = require('../src')

const APP_ID = 'XXXX-XXXX-XXXX-XXXXXX'
const API_KEY = 'XXXX-XXXX-XXXX-XXXXXX'

const BackendlessClient = createBackendlessApiClient(APP_ID, API_KEY)

module.exports = async function testApi() {
  const testMarker = `test_${Date.now()}`

  const userLogin = `foo_${Date.now()}@bar.com`
  const userPassword = '123456'

  //create a new unique user
  const user = await BackendlessClient.users.register({
    email   : userLogin,
    password: userPassword,
    testMarker
  })

  const userId = user.objectId

  //create a few persons as not authorized user, property for the objects will be NULL
  await BackendlessClient.persons.create({ name: `person_${testMarker}`, testMarker })
  await BackendlessClient.persons.create({ name: `person_${testMarker}`, testMarker })
  await BackendlessClient.persons.create({ name: `person_${testMarker}`, testMarker })

  //find only persons what we created before in this test run
  const persons = await BackendlessClient.persons.find({ where: `testMarker = '${testMarker}'` })

  if (persons.length !== 3) {
    throw new Error(`must be found 3 persons with [testMarker = '${testMarker}']`)
  }

  //get count of persons what we created before in this test run
  const personsCount = await BackendlessClient.persons.getCount({ where: `testMarker = '${testMarker}'` })

  if (personsCount !== 3) {
    throw new Error('number of persons must be equal 3')
  }

  //check if every person what we created in this test has no "ownerId" property
  persons.forEach(person => {
    if (person.ownerId !== null) {
      throw new Error('person.ownerId must be NULL, because we\'ve created them as not authorized user')
    }
  })

  //after user login all the next request will be authorized,
  //and each object what we create will have "ownerId" property, which is equal objectId of logged user
  await BackendlessClient.users.login(userLogin, userPassword)

  //create a few persons as authorized user, property for the objects will be equal objectId of logged user
  await BackendlessClient.persons.create({ name: `person_${testMarker}`, testMarker })
  await BackendlessClient.persons.create({ name: `person_${testMarker}`, testMarker })
  await BackendlessClient.persons.create({ name: `person_${testMarker}`, testMarker })

  //find only persons what logged user created before
  const myPersons = await BackendlessClient.persons.find({ where: `ownerId = '${userId}'` })

  if (myPersons.length !== 3) {
    throw new Error(`must be found 3 persons with [ownerId = '${userId}']`)
  }

  //check if every person what user created has correct "ownerId" property
  myPersons.forEach(person => {
    if (person.ownerId !== userId) {
      throw new Error('person.ownerId must be equal logged user id, because we\'ve created them as authorized user')
    }
  })

}

