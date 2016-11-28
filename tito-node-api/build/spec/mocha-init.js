// set the environment
const ENV = process.env.NODE_ENV = process.env.ENV = 'spec';

// register typescript extensions for mocha
require('ts-node/register');

// register extensions w/ assertion framework
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var sinonChai = require('sinon-chai');
chai.use(sinonChai);

// register promise library with sinonChai
var bluebird = require('bluebird');
require('sinon-as-promised')(bluebird);
