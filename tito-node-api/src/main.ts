// vendor imports
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as fs from 'fs';

// configuration imports
import { DependencyConfig } from './dependency.config';
import { MongoConfig } from './mongo.config';
import { RouteConfig } from './route.config';

// instantiate the express server
const env = process.env.NODE_ENV || 'development';
let application = express();

// configure port & static root
const port = process.env.PORT_API || 8081;
application.set('port', port);
const staticRoot = __dirname + '../dist/public/';
application.use(express.static(staticRoot));

// configure our app to use bodyParser
application.use(bodyParser.urlencoded({extended: true}));
application.use(bodyParser.json());

// configure CORS policy & HTTP -> HTTPS redirect
application.use(function(request, response, next) {
  // development needs a CORS policy
  if (env == 'development') {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    response.header("Access-Control-Allow-Methods", "GET, POST, PUT");
  }
  next();
});

// dependency injection initialization
let dependencyConfig = new DependencyConfig(application);

// mongo initialization
let mongoConfig = new MongoConfig(application);

// route initialization
let routeConfig = new RouteConfig(application);

application.listen(port);
console.log(env + ' API server listening on port:' + port)
