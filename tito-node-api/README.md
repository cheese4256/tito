# README #

Welcome to the tito-node-api project.

## Development Environment Setup ##

* Mongo DB Installation
* Node & NPM installation
* Install Global NPM Packages
* Build, Test, Run
* TODO - Deployment

### Mongo DB Installation ###

Currently we're running MongoDB 3.2 Community Server in development environments.  Download and setup instructions can be found at:
https://www.mongodb.com/download-center#community

NOTE - at the time of writing we have made the assumption that MongoDB will not be running as a service and must be started as part of the node "start" script.  As a result you must make sure that the mongod binary is in your PATH.

### Node and NPM installation ###

Currently we're running Node v7.1.0 and NPM version 3.10.9.  Setup and installation instructions can be found at https://nodejs.org/en/.

### Install Global NPM Packages ###

The following packages should be installed at a global level:

* mocha
* nodemon
* typescript
* typings
* webpack

Global installation can be done by invoking the following:
> npm install --global <package>@<version>

NOTE - macOS and Linux environments may require you to run the above as "sudo npm install ..."

You can confirm the set of all globally installed packages with:
> npm list -g --depth=0

### Build, Test, Run ###
First steps are to install remaining npm packages, install all typings files, and initialize a mongo db data directory.  All this can be accomplished by running:
> npm install

To build the API you can run:
> npm run build

To run tests you can run:
> npm test

To start the application:
> npm start

NOTE - the above start is intended for development purposes only.  A watch is created that will ensure the API is rebuilt with every js and ts file that is changed.

At this point the application should be running.  A simple API call be invoked to ensure the application is running and requests are being resolved:
> curl -X GET -H "Content-Type: application/json" "http://localhost:8081/api"
