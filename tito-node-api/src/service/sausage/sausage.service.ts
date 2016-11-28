import * as request from 'request';
import * as config from 'config';

import { ServiceBase } from '../_service.base';

// model imports
import { Sausage } from '../../model/identity/sausage';
import { Credential } from '../../model/identity/credential';

// dependency imports
import { CryptoService } from '../crypto/crypto.service';
import { JwtService } from '../jwt/jwt.service';
import { SausageRepository } from '../../repository/sausage/sausage.repository';
import { SausageValidator } from '../../validation/sausage.validator';

export class SausageService extends ServiceBase<Sausage> {
  // constructor
  constructor(protected _repository: SausageRepository,
    protected _validator: SausageValidator,
    protected _cryptoService: CryptoService,
    protected _jwtService: JwtService) {
      super(_repository, _validator);
  }

  public findByEmail(email: string): Promise<Sausage> {
    let promise = new Promise<Sausage>((resolve: any, reject: any) => {
      this._repository.findByEmail(email)
      .then((sausage: Sausage) => {
        if (sausage) {
          resolve(sausage);
        } else {
          reject("No such sausage")
        }
      })
      .catch((e: any) => {
        console.log(`1: ${e}`);
        reject(e);
      });
    });

    return promise;
  }

  public google(model: any): Promise<any> {
    let apiUrl: string = config.get('google.apiUrl').toString();
    let tokenUrl: string = config.get('google.tokenUrl').toString();
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
    let promise: Promise<any> = new Promise<any>((resolve, reject) => {
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
              // console.log(`response: ${JSON.stringify(response)}`);
              // console.log(`profile: ${JSON.stringify(profile)}`);
              this._repository.findByGoogleId(profile.sub)
                .then((sausage: Sausage) => {
                  // console.log(`sausage: ${JSON.stringify(sausage)}`);
                  if (sausage) {
                    this._jwtService.jwtSign(sausage).then((token: string) =>{
                      resolve({
                        token: token,
                        sausage: sausage
                      });
                    }).catch((e: any) => { // something unexpected happened in jwtService
                      // reject with vendor error
                      reject(e);
                    });
                    // resolve(sausage);
                  } else {
                    sausage = <Sausage>{};
                    sausage.email = profile.email;
                    sausage.password = profile.email;
                    sausage.displayName = profile.name;
                    sausage.googleId = profile.sub;
                    this.register(sausage)
                      .then((data: any) => {
                        resolve(data);
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

  public login(email: string, password: string): Promise<any> {
    let promise = new Promise<any>((resolve: any, reject: any) => {

      // validate the inputs
      this._validator.login(email, password).then(() => {

        this.findByEmail(email).then((d: Sausage) => {

          // compare the password hashes
          let passwordEncrypted =
            this._cryptoService.secureHash(password, d.credential.passwordSalt);

          if (d.credential.passwordEncrypted === passwordEncrypted) {

            // generate an authentication token
            this._jwtService.jwtSign(d).then((token: string) =>{
              resolve({
                token: token,
                sausage: d
              });
            }).catch((e: any) => { // something unexpected happened in jwtService
              // reject with vendor error
              reject(e);
            });

          } else { // sausage found, password was not a match
            // TODO - increment failed password attempts?
            // resolve with empty result
            resolve();
          }

        }).catch((e: any) => { // something unexpected happened in mongo
          console.log(`2: ${e}`);
          // No such sausage
          reject(`Invalid email or password: ${e}`);
        });

      }).catch((e: any) => { // validation failed
        // reject with custom error
        reject(`Validation failed: ${e}`);
      });
    });

    return promise;
  }

  public register(sausage: Sausage): Promise<any> {
    let promise = new Promise<Sausage>((resolve: any, reject: any) => {

      // validate the model
      this._validator.register(sausage).then(() => {

        // encrypt password
        sausage.credential = this.encryptCredential(sausage.password);
        sausage.password = undefined; // schwack the clear text password

        // invoke repository operations for valid model instances
        this._repository.create(sausage).then((d: Sausage) => {

          // generate an authentication token
          this._jwtService.jwtSign(d).then((token: string) => {
            // console.log(`token: ${JSON.stringify(token)}`);
            resolve({
              token: token,
              sausage: d
            });
          }).catch((e: any) => { // something unexpected happened in jwtService
            // reject with vendor error
            reject(e);
          });

        }).catch((e: any) => { // something unexpected happened in mongo
          // reject with vendor error
          reject(e);
        });

      }).catch((e: any) => { // validation failed
        // reject with custom error
        reject(e);
      });
    });

    return promise;
  }

  private encryptCredential(password: string): Credential {
    // generate the crypto elements
    let passwordSalt = this._cryptoService.generateSalt();
    let passwordEncrypted =
      this._cryptoService.secureHash(password, passwordSalt);

    // cast result as Credential
    return {
      passwordEncrypted: passwordEncrypted,
      passwordSalt: passwordSalt
    } as Credential;
  }
}
