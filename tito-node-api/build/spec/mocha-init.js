// register typescript extensions for mocha
require('ts-node/register');

// register sinon-chai extensions w/ assertion framework
var chai = require('chai');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);

// register promise library with sinonChai
var bluebird = require('bluebird');
require('sinon-as-promised')(bluebird);
