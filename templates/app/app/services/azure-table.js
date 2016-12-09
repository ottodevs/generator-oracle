'use strict'

var azure = require('azure-storage')
const Promise = require('bluebird')
const config = require('../config/config')

if (!config.azureStorage.name || !config.azureStorage.key) {
  throw new Error('Missing ENV variables for AZURE_STORAGE_ACCOUNT, AZURE_STORAGE_ACCESS_KEY')
}

var tableService = azure.createTableService(config.azureStorage.name, config.azureStorage.key)

function createTable (tableName) {
  return new Promise((resolve, reject) => {
    tableService.createTableIfNotExists(tableName, function (error, result, response) {
      if (error) {
        reject(error)
      }
      resolve(result)
    })
  })
}

function insert (tableName, data) {
  return new Promise((resolve, reject) => {
    tableService.insertEntity(tableName, data, function (error, result, response) {
      if (error) {
        reject(error)
      }
      resolve(result)
    })
  })
}

function retrieve (tableName, partitionKey, rowKey) {
  return new Promise((resolve, reject) => {
    tableService.retrieveEntity(tableName, partitionKey, rowKey, function (error, result, response) {
      if (error) {
        reject(error)
      }
      resolve(result)
    })
  })
}

function update (tableName, data) {
  return new Promise((resolve, reject) => {
    tableService.insertOrReplaceEntity(tableName, data, function (error, result, response) {
      if (error) {
        reject(error)
      }
      resolve(result)
    })
  })
}

function merge (tableName, data) {
  return new Promise((resolve, reject) => {
    tableService.insertOrMergeEntity(tableName, data, function (error, result, response) {
      if (error) {
        reject(error)
      }
      resolve(result)
    })
  })
}

// function _handleCallback(error, result, response) {

// }

module.exports = {
  tableService: tableService,
  createTable: createTable,
  insert: insert,
  retrieve: retrieve,
  update: update,
  merge: merge
}
