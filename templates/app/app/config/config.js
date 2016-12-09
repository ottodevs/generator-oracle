'use strict'

const path = require('path')
const rootPath = path.normalize(path.join(__dirname, '/../..'))

module.exports = {
  env: process.env.NODE_ENV,
  root: rootPath,
  IpcProvider: process.env.IPC_PROVIDER,
  rpc: {
    host: process.env.RPC_HOST || 'http://localhost',
    port: process.env.RPC_PORT || '8545'
  },
  notificationService: {
    address: process.env.CONTRACT_ADDRESS,
    abi: process.env.CONTRACT_ABI_PATH
  },
  eventhub: {
    connectionString: process.env.EVENT_HUB_CONNECTION_STRING,
    path: process.env.EVENTHUB_PATH
  },
  azureStorage: {
    name: process.env.AZURE_STORAGE_ACCOUNT,
    key: process.env.AZURE_STORAGE_ACCESS_KEY,
    tableName: process.env.AZURE_STORAGE_TABLE_NAME || process.env.NODE_ENV
  }
}
