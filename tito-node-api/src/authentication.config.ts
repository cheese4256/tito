import * as config from 'config';
let jwt = require('express-jwt');

export class AuthenticationConfig {
  public constructor(private _application: any) {
    let secret = config.get('authentication.secret').toString();
    let algorithm = config.get('authentication.algorithm');
    let options = {
      secret: secret,
      algorithms: algorithm
    };
    let ignorePaths = config.get('authentication.ignorePaths');
    _application.use(jwt(options).unless({path: ignorePaths}));

    console.log(`authentication configured with:
      secret = ****************************${secret.slice(secret.length - 5, secret.length - 1)}
      algorithm = ${algorithm}
      ignorePaths = ${ignorePaths}`);
  }
}
