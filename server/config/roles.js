const AccessControl = require('accesscontrol')

const grantsObject = {
  admin: {
    profile: {
      'create:any': ['*'], // ['!*'] BLOCK ACCES
      'read:any': ['*'],
      'update:any': ['*'],
      'delete:any': ['*']
    },
    articles: {
      'read:any': ['*']
    },
    article: {
      'create:any': ['*'],
      'read:any': ['*'],
      'update:any': ['*'],
      'delete:any': ['*']
    },
    categories: {
      'create:any': ['*'],
      'read:any': ['*'],
      'update:any': ['*'],
      'delete:any': ['*']
    }

  },
  user: { // USER SAME AS USERMODEL  NO S
    profile: { // ! CANT GET PASSWORD ID DATE  != cant
      'read:own': ['*', '!password', '!_id', '!date'],
      'update:own': ['*']
    },
    categories: {
      'read:any': ['*']
    }

  }
}

const roles = new AccessControl(grantsObject)
module.exports = { roles }
