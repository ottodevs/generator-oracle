import { Base } from 'yeoman-generator'
import yosay from 'yosay'
import runCmd from '../util'
import path from 'path'

class Generator extends Base {
  constructor (...args) {
    super(...args)

    this.option('skip-install', {
      desc: 'Do not install dependencies',
      type: Boolean,
      defaults: false
    })

    this.option('skip-config', {
      desc: 'Always use existing .yo-rc.json',
      type: Boolean,
      defaults: false
    })
  }

  get initializing () {
    return {
      setParams () {
        this.config.set('nodeVersion', process.version)
        this.config.set('platform', process.platform)
        this.config.set('generatorVersion', this.rootGeneratorVersion())
        return runCmd('npm --version').then(stdout => {
          this.config.set('npmVersion', stdout.toString().trim())
        })
      },
      gatherTelemetry () {
        this.log(`Node version ${this.config.get('nodeVersion')}`)
        // insight.track('generator', this.rootGeneratorVersion())
        // insight.track('node', this.nodeVersion)
        // insight.track('platform', process.platform)
        // return insight.track('npm', this.npmVersion);
      },
      checkForConfig () {
        // TODO: Check for existing .yo.rc config
      }
    }
  }

  get prompting () {
    return {
      welcome () {
        this.log(yosay('Welcome to the Blockchain Oracle Yeoman Generator'))
      },
      newDir () {
        return this.prompt([{
          type: 'confirm',
          name: 'newDir',
          message: 'Would you like to create a new directory for your project?'
        }, {
          type: 'input',
          name: 'dirName',
          message: 'Enter directory name',
          when: response => response.newDir
        }, {
          type: 'list',
          name: 'chain',
          message: 'Which blockchain technology would you like to use?',
          choices: [{
            value: 'ethereum',
            name: 'Ethereum',
            default: true
          }, {
            value: 'hyperledger',
            name: 'Hyperledger (coming soon)',
            default: false,
            disabled: true
          }, {
            value: 'dragonchain',
            name: 'Dragonchain (coming soon)',
            default: false,
            disabled: true
          }, {
            value: 'other',
            name: 'You are welcome to add support for your hipster chain :)',
            default: false,
            disabled: true
          }]
        }, {
          type: 'list',
          name: 'ethereumDriver',
          message: 'Which Ethereum API would you like to use?',
          when: response => response.chain === 'ethereum',
          choices: [{
            value: 'web3',
            name: 'Web3',
            default: true
          }, {
            value: 'other',
            name: 'Other adapters (coming soon)',
            default: false,
            disabled: true
          }]
        }, {
          type: 'checkbox',
          name: 'services',
          message: 'What services would you like to use?',
          choices: [{
            value: 'eventhub',
            name: 'Azure EventHubs',
            checked: true
          }, {
            value: 'azureTable',
            name: 'Azure Table Storage',
            checked: false
          }, {
            value: 'express',
            name: 'Rest API: Provided by express',
            checked: false,
            disabled: true
          }, {
            value: 'socketio',
            name: 'Web Sockets: Provided by Socket.io',
            checked: false,
            disabled: true
          }]
        }]).then(response => {
          this.options.newDir = response.newDir
          this.options.dirName = response.dirName // || Something
          this.options.chain = response.chain
          this.options.ethereumDriver = response.ethereumDriver
          this.options.services = response.services
          this.log(this.options)
        })
      }
    }
  }

  get configuring () {
    return {
      init () {
        this.sourceRoot(path.join(__dirname, '../../templates/app'))
      }
    }
  }

  get conflicts () {
    return {}
  }

  get writing () {
    return {
      copyAll () {
        this.bulkDirectory('.', '.')
      }
    }
  }

  get install () {
    return {
      install () {
        this.npmInstall()
      }
    }
  }

  get end () {
    return {
      goodbye () {
        this.log(yosay('Happy coding :)'))
      }
    }
  }
}

module.exports = Generator
