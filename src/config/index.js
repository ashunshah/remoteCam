const { merge } = require('lodash')
const env = process.env.NODE_ENV || 'development'

const baseConfig = {
  //   env,
  //   isDev: env === 'development',
  //   isTest: env === 'testing',
  //   port: 3000,
  //   secrets: {
  //     jwt: process.env.JWT_SECRET,
  //     jwtExp: '100d'
  //   }
}

let envConfig = {}

switch (env) {
  case 'development':
    envConfig = require('./dev')
    break
  case 'testing':
    envConfig = require('./test')
    break
  default:
    envConfig = require('./dev')
}

module.exports = merge(baseConfig, envConfig)
