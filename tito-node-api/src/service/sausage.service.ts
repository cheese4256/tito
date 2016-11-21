import * as request from 'request';
import * as config from 'config';

import { ServiceBase } from './_service.base';

// model imports
import { Sausage } from '../model/identity/sausage';

// repository imports
import { SausageRepository } from '../repository/sausage.repository';

export class SausageService extends ServiceBase<Sausage> {
  // constructor
  constructor(protected _repository: SausageRepository) {
    super(_repository);
  }

  public google(model: any): Promise<Sausage> {
    let apiUrl: string = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
    let tokenUrl: string = 'https://accounts.google.com/o/oauth2/token';
    let clientSecret: string = config.get('google.clientSecret').toString();
    // console.log("A: " + model.code);
    // console.log("B: " + model.clientId);
    // console.log("C: " + model.redirectUri);
    // console.log("D: " + clientSecret);
    let params = {
      client_id: model.clientId,
      redirect_uri: model.redirectUri,
      code: model.code,
      grant_type: 'authorization_code',
      client_secret: clientSecret
    };
    let promise: Promise<Sausage> = new Promise<Sausage>((resolve, reject) => {
      request.post(tokenUrl,
        {
          json: true,
          form: params
        }, (err: any, response: any, token: any) => {
          // console.log(`token: ${JSON.stringify(token)}`);
          let accessToken: string = token.access_token;
          let headers = {
            Authorization: 'Bearer ' + accessToken
          }
          request.get({
            url: apiUrl,
            headers: headers,
            json: true}, (err: any, response: any, profile: any) => {
              // console.log(`profile: ${JSON.stringify(profile)}`);
              this._repository.findByGoogleId(profile.sub)
                .then((sausage: Sausage) => {
                  // console.log(`sausage: ${JSON.stringify(sausage)}`);
                  if (sausage) {
                    resolve(sausage);
                  } else {
                    this.register(<Sausage>{
                      email: profile.email,
                      password: profile.email,
                      googleId: profile.sub,
                      displayName: profile.name
                    })
                      .then((sausage: Sausage) => {
                        resolve(sausage);
                      })
                      .catch((e: any) => {
                        reject(`Unable to register using Google: ${e}`)
                      });
                  }
                })
                .catch((e: any) => {
                  reject(`Unable to login using Google: ${e}`)
                });
            });
      });
    });
    return promise;
  }

  public login(model: Sausage): Promise<Sausage> {

    console.log(`attempting login for sausage: ${model.email}`);

    let email = model.email;

    let promise: Promise<Sausage> = new Promise<Sausage>((resolve, reject) => {
      this._repository.findByEmail(email)
        .then((sausage: any) => {
          if (sausage) {
            console.log(`found existing sausage record during login: ${sausage.email}`);
            console.log(`sausage.password: ${sausage.password}`);
            console.log(`model.password: ${model.password}`);
            sausage.comparePasswords(model.password, (err: any, isMatch: boolean) => {
              console.log(`err: ${err}`);
              console.log(`isMatch: ${isMatch}`);
              if (err) {
// TODO: These login failures should return 401s or 403s, but I think currently just return 500s
                reject(`Unable to validate password: ${err}`);
              }
              if (isMatch) {
                resolve(sausage);
              } else {
                // Invalid password
                reject(`Invalid email or password`);
              }
            });
            // if (true) {
            //   resolve(sausage);
            // } else {
            //   // Invalid password
            //   reject(`Invalid email or password`);
            // }
          } else {
            // No such sausage
            reject(`Invalid email or password`);
          }
        })
        .catch((e: any) => {
          reject(`Server error: ${e}`);
        });
    });

    return promise;
  }

  public register(model: Sausage): Promise<Sausage> {

    console.log(`attempting registration for sausage: ${model.email}`);

    let email = model.email;

    let promise: Promise<Sausage> = new Promise<Sausage>((resolve, reject) => {
      this._repository.findByEmail(email)
        .then((d: any) => {
          if (d) {
            console.log(`found existing sausage record during registration: ${d.email}`)
            resolve(d);
          } else {
            return this.create(model)
              .then((d: any) => {
                resolve(d);
              })
              .catch((e: any) => {
                reject(e);
              });
          }
        })
        .catch((e: any) => {
          reject(e);
        });
    });

    return promise;
  }
}
