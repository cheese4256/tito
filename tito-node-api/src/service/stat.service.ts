import * as request from 'request';
import * as config from 'config';
// import * as oauth from 'oauth';
let oauth = require('oauth');

import { ServiceBase } from './_service.base';

// model imports
import { Stat } from '../model/stat';

// repository imports
import { StatRepository } from '../repository/stat.repository';

export class StatService extends ServiceBase<Stat> {
  // private properties
  private oa: any;

  // constructor
  constructor(protected _repository: StatRepository) {
    super(_repository);
    this.oa = new oauth.OAuth(
      'https://api.login.yahoo.com/oauth/v2/get_request_token',
      'https://api.login.yahoo.com/oauth/v2/request_auth',
      'dj0yJmk9MEtpcU9DaGRHS3JnJmQ9WVdrOVRtZFdaMDFvTm04bWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD0yOA--',
      'c1368ffbecf6661dd6da5d75230cc5587da3b411',
      '1.0',
      'oob',
      'HMAC-SHA1'
    );
  }

  public requestToken(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.oa.getOAuthRequestToken(function(error: any, oauth_token: string, oauth_token_secret: string) {
        console.log(`error: ${JSON.stringify(error)}`);
        console.log(`oauth_token: ${oauth_token}`);
        console.log(`oauth_token_secret: ${oauth_token_secret}`);
        if (error) {
          reject(error);
        } else {
          resolve({
            oauth_token: oauth_token,
            oauth_token_secret: oauth_token_secret
          });
        }
        // req.session.oauthToken = oauth_token;
        // req.session.oauthTokenSecret = oauth_token_secret;
        //
        // // TODO: move to some config
        // res.redirect("https://api.login.yahoo.com/oauth/v2/request_auth?oauth_token=" + oauth_token);
      });
    });
  }

  public stats(model: any): Promise<Stat> {
    let apiUrl: string = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
    let tokenUrl: string = 'https://accounts.google.com/o/oauth2/token';
    let clientSecret: string = config.get('google.clientSecret').toString();
    let params = {
      // client_id: model.clientId,
      // redirect_uri: model.redirectUri,
      // code: model.code,
      // grant_type: 'authorization_code',
      // client_secret: clientSecret
    };
    let promise: Promise<Stat> = new Promise<Stat>((resolve, reject) => {
    //   request.post(tokenUrl,
    //     {
    //       json: true,
    //       form: params
    //     }, (err: any, response: any, token: any) => {
    //       // console.log(`token: ${JSON.stringify(token)}`);
    //       let accessToken: string = token.access_token;
    //       let headers = {
    //         Authorization: 'Bearer ' + accessToken
    //       }
    //       request.get({
    //         url: apiUrl,
    //         headers: headers,
    //         json: true}, (err: any, response: any, profile: any) => {
    //           // TODO
    //         });
    //   });
    });
    return promise;
  }
}
