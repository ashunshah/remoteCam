const { merge } = require('lodash')
const env = process.env.NODE_ENV || 'development'

const baseConfig = {
  ip: 'localhost',
  port: 3000
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
