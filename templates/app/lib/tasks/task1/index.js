'use strict'

const debug = require('debug')('oracle-demo')
const services = require('../../services')

debug('Launching task 1')

let data = {
  PartitionKey: 'ABC',
  RowKey: Math.floor(Math.random() * 1000).toString(),
  Value: 'Hello Word'
}

services.azureTable.insert('Test', data)
  .then((e) => debug(e))
  .catch((e) => debug(e))
