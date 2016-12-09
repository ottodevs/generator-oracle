'use strict'

const Web3 = require('web3')
const net = require('net')
const debug = require('debug')('oracle-demo')

module.exports = (config) => {
  var web3 = new Web3()

  if (web3.isConnected()) {
    debug('Web3 already connected.')
    return
  }

  if (config.IpcProvider) {
    debug('Connecting to geth using IpcProvider at:', config.IpcProvider)
    let client = new net.Socket()
    web3.setProvider(new web3.providers.IpcProvider(config.IpcProvider, client))
  } else {
    if (!config.rpc.host || !config.rpc.port) {
      throw new Error('Missing RPC host or port. Check config file')
    }

    let rpcEndpoint = config.rpc.host + ':' + config.rpc.port
    debug('Connecting to geth using RPC endpoint at: ', rpcEndpoint)
    web3.setProvider(new web3.providers.HttpProvider(rpcEndpoint))
  }

  if (!web3.isConnected()) {
    debug('Failed to connect to the geth.')
    throw new Error('Failed to connect to the geth. Make sure the environment variables are set correctly, or you have a RPC server running')
  }

  return web3
}
