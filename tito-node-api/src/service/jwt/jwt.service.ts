let config = require('config');
let jwt = require('jsonwebtoken');

// model imports
import { Sausage } from '../../model/identity/sausage';

export class JwtService {
  private secret: string;
  private algorithm: string;
  private expiresInSeconds: number;

  constructor() {
    this.secret = config.get('authentication.secret');
    this.algorithm = config.get('authentication.algorithm');
    this.expiresInSeconds = config.get('authentication.expiresInSeconds');
  }

  public jwtSign(sausage: Sausage): Promise<string> {
    let promise = new Promise<string>((resolve: any, reject: any) => {
      let options = {
        algorithm: this.algorithm
      };

      if (this.expiresInSeconds && this.expiresInSeconds > 0) {
        options['expiresIn'] = this.expiresInSeconds;
      }

      jwt.sign(sausage, this.secret, options, (error: any, token: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(token);
        }
      });
    });

    return promise;
  }

  public jwtVerify(token: string): Promise<any> {
    let promise = new Promise<any>((resolve: any, reject: any) => {
      let options = {
        algorithms: [this.algorithm]
      };

      jwt.verify(token, this.secret, options, (error: any, payload: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(payload);
        }
      });
    });

    return promise;
  }
}
