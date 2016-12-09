'use strict'

const config = require('../config/config')

// This way
const web3 = require('../config/web3')(config)

// or this way
const azureTable = require('./azure-table')
// Inset Services below

exports = module.exports = {
  web3: web3,
  azureTable: azureTable
}
