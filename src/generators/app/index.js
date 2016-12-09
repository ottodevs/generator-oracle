import { Base } from 'yeoman-generator'
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
    }
  }

  get prompting () {
    return {
      directoryName () {

      },

      appName () {

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

  get default () {
    return {}
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
    return {}
  }
}

module.exports = Generator
