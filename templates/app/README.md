# <%= lodash.slugify(lodash.humanize(appname)) %>


This project was generated with the [Blockchain Oracle Generator]( <%= generatorUrl %>) version <%= rootGeneratorVersion() %>.

## Getting Started
###Dependencies
* [Node](http://nodejs.org)
* [Npm](https://www.npmjs.com)
* [Gulp](http://gulpjs.com/)
* [Go-ethereum](https://github.com/ethereum/go-ethereum/wiki/geth)


###Execution
1. Run `npm install` in the project directory.
2. Run `geth` with in a separate shell and enable either [RPC]() or [IPC]().
3. Set the appropriate environment variable ether by exporting them or adding them to `config/dev.env.js`. You can find the name of the environment variables in `config/config.js` file. Note that this file is not tracked by git and should not be checked in.
3. Run `gulp` to start the development. This command watches for changes in your files and automatically rerun your node application.

## Development
### Configuration
// TODO please write me
### Services
// TODO please write me
### Tasks
// TODO please write me

## Testing
To test your application run `npm test` or `gulp test`.

##Structure
    <%= lodash.slugify(lodash.humanize(appname)) %>
    .
    ├── .editorconfig
    ├── .gitignore
    ├── .yo-rc.json                 - Yeoman generator configuration
    ├── gulpfile.js                 - Gulp configuration
    ├── LICENSE
    ├── package.json                - Project information and dependencies
    ├── README.md
    ├── app
    │   ├── index.js                - The entry point of the application
    │   ├── config                  - The folder containing the configuration for the app
    │   │   ├── config.js           - Contains the environment variables that this application uses
    │   │   ├── dev.env.js          - Contains the value for environment variables for development purposes. 
    │   │   └── web3.js             - Contains Web3 configuration
    │   │
    │   ├── services                - Contains the adapters to other services that this project uses.
    │   │    ├── index.js           - Instantiates and exposes all the services to the application
    │   │    ├── serviceA.js        
    │   │    └── etc.
    │   └── tasks                   - Contains the project specific tasks
    │       ├── index.js            - Instantiates and exposes all the tasks
    │       ├── task1               - Contains all the files for task 1
    │       │     ├── index.js      - The entry point for task 1
    │       │     └── etc.
    │       ├── task2
    │       └── task-n
    └── node_modules                - Contains node modules
