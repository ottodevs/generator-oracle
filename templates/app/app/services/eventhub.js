'use strict'

const EventHubClient = require('azure-event-hubs').Client
const Promise = require('bluebird')
const config = require('../config/config')
const debug = require('debug')('oracle-demo')

if (!config.eventhub.connectionString || !config.eventhub.path) {
  throw new Error('Missing ENV variables for EVENT_HUB_CONNECTION_STRING, EVENTHUB_PATH')
}

const client = EventHubClient.fromConnectionString(config.eventhub.connectionString, config.eventhub.path)

function getSender (channelID, errCallback) {
  return new Promise(function (resolve, reject) {
    client.open()
      .then(_createSender(channelID))
      .then(_configureSender(resolve, errCallback))
      .catch(_rejectWithError(reject))
  })
}

function _createSender (channelID) {
  return function () {
    debug('Creating sender with channelID:', channelID)
    return client.createSender(channelID)
  }
}

function _configureSender (resolve, errCallback) {
  errCallback = errCallback || _defaultError

  return function (sender) {
    debug('Configuring sender')
    sender.on('errorReceived', errCallback)
    resolve(sender)
  }
}

function _rejectWithError (reject) {
  return function (err) {
    debug('Error creating sender:', err)
    reject(err)
  }
}

function _defaultError (err) {
  debug('Default error handling on received:', err)
  console.error(err)
}

module.exports = {
  eventhubClient: client,
  getSender: getSender
}
