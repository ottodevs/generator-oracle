import { Base } from 'yeoman-generator'

export class Generator extends Base {
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
      init () {
        console.log(`The name is:`)
      }
    }
  }

  get prompting () {
    return {
    }
  }

  get configuring () {
    function init () {
      console.log('init')
    }

    function dothings () {
      console.log('init')
    }

    function finish () {
      console.log('init')
    }

    return {
      init,
      dothings,
      finish
    }
  }

  get default () {
    return {}
  }

  get conflicts () {
    return {}
  }

  get writing () {
    return {}
  }

  get install () {
    return {}
  }

  get end () {
    return {}
  }
}

module.exports = Generator
