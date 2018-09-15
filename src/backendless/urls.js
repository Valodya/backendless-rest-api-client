const Urls = {

  users       : () => `/users`,
  userObject  : objectId => `${Urls.users()}/${objectId}`,
  userRegister: () => `${Urls.users()}/register`,
  userLogin   : () => `${Urls.users()}/login`,
  userLogout  : () => `${Urls.users()}/logout`,

  data           : () => `/data`,
  dataTable      : tableName => `${Urls.data()}/${tableName}`,
  dataTableObject: (tableName, objectId) => `${Urls.dataTable(tableName)}/${objectId}`,
  dataTableCount : tableName => `${Urls.dataTable(tableName)}/count`,

}

module.exports = Urls