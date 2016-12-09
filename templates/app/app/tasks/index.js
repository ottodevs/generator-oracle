'use strict'

const _ = require('lodash')

var tasks = []
tasks.push(require('./task1'))
tasks.push(require('./task2'))
// Insert tasks below

exports = module.exports = _.merge(tasks)
