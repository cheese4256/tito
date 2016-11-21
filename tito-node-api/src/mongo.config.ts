import * as config from 'config';
let mongoose = require('mongoose');
let promise = require('bluebird');

export class MongoConfig {
  public constructor(private _application: any) {
    // initialize the promise libary mongoose will use instead of callbacks
    mongoose.Promise = promise;

    // eg. host:port/dbname for single node db connections
    // eg. host1:port,host2:port,host3:port/dbname?replicaSet=rsname
    let mongoConnection = config.get('database.connectionString').toString();

    let connectionString = `mongodb://${mongoConnection}`;
    let options = {
      server: {auto_reconnect: true},
      promiseLibrary: promise
    };

    // register an on error handler to manage reconnection
    let db = mongoose.connection;
    db.on('error', function(error: any) {
      console.error(`database error occurred: ${error}`);
      mongoose.disconnect();
    });

    // attempt to connect to mongo
    console.log(`attempting mongodb connection with: ${mongoConnection}`);
    mongoose.connect(mongoConnection, options);
  }
}
