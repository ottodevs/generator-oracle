'use strict'

// Use dev.env.js for environment variables that will be set when the server starts locally.
// Use for your api keys, secrets, etc. This file should **not** be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  NODE_ENV: 'development',
  EVENT_HUB_CONNECTION_STRING: '',
  EVENTHUB_PATH: '',

  DEBUG: 'oracle-demo'
}
