import Promise from 'bluebird'
import {exec} from 'child_process'

/**
 * Run the given command in a child process
 * @param {string} cmd - command to run
 * @returns {Promise}
 */
export function runCmd (cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, {}, function (err, stdout, stderr) {
      if (err) {
        console.error(stdout)
        return reject(err)
      } else {
        return resolve(stdout)
      }
    })
  })
}

module.exports = runCmd
