import * as request from 'request';
// import * as oauth from 'oauth';
let oauth = require('oauth');

import { ServiceBase } from '../_service.base';

// model imports
import { Stat } from '../../model/tito/stat';

// dependency imports
import { StatRepository } from '../../repository/stat/stat.repository';
import { StatValidator } from '../../validation/stat.validator';

export class StatService extends ServiceBase<Stat> {
  // private properties
  private oa: any;

  // constructor
  constructor(protected _repository: StatRepository,
    protected _validator: StatValidator) {
      super(_repository, _validator);
      this.oa = new oauth.OAuth(
        'https://api.login.yahoo.com/oauth/v2/get_request_token',
        'https://api.login.yahoo.com/oauth/v2/get_token',
  //      'https://api.login.yahoo.com/oauth/v2/request_auth',
        'dj0yJmk9MEtpcU9DaGRHS3JnJmQ9WVdrOVRtZFdaMDFvTm04bWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD0yOA--',
        'c1368ffbecf6661dd6da5d75230cc5587da3b411',
        '1.0',
  //      'www.liquidelvis.com',
        'oob',
        'HMAC-SHA1'
      );
  }

  public requestToken(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.oa.getOAuthRequestToken(function(error: any, oauth_token: string, oauth_token_secret: string, moreData: any) {
        console.log(`error: ${JSON.stringify(error)}`);
        console.log(`oauth_token: ${oauth_token}`);
        console.log(`oauth_token_secret: ${oauth_token_secret}`);
        console.log(`moreData: ${JSON.stringify(moreData)}`);
        if (error) {
          reject(error);
        } else {
          resolve({
            oauth_token: oauth_token,
            oauth_token_secret: oauth_token_secret,
            moreData: moreData
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

  public accessToken(model: any): Promise<any> {
    // console.log(`accessToken() model: ${JSON.stringify(model)}`);
    let requestToken: string = model.requestToken;
    let requestTokenSecret: string = model.requestTokenSecret;
    let oauthVerifier: string = model.oauthVerifier;
    console.log(`requestToken: ${JSON.stringify(requestToken)}`);
    console.log(`requestTokenSecret: ${JSON.stringify(requestTokenSecret)}`);
    console.log(`oauthVerifier: ${JSON.stringify(oauthVerifier)}`);
    return new Promise<any>((resolve, reject) => {
      this.oa.getOAuthAccessToken('bpujk7s', 'c598ea8230427d73715a35e81301683d2a29b234', 'eyhmpg',
//      this.oa.getOAuthAccessToken(requestToken, requestTokenSecret, oauthVerifier,
        function(error: any, oauth_access_token: any, oauth_access_token_secret: any, moreData: any) {
        console.log(`error: ${JSON.stringify(error)}`);
        console.log(`oauth_access_token: ${oauth_access_token}`);
        console.log(`oauth_access_token_secret: ${oauth_access_token_secret}`);
        console.log(`moreData: ${JSON.stringify(moreData)}`);
        if (error) {
          reject(error);
        } else {
          resolve({
            oauth_access_token: oauth_access_token,
            oauth_access_token_secret: oauth_access_token_secret,
            moreData: moreData
          });
        }
      });
    });
  }

  public stats(model: any): Promise<Stat> {
    let remoteApiUrl = model.remoteApiUrl;
    console.log(`accessToken: ${JSON.stringify(model.accessToken)}`);
    console.log(`accessTokenSecret: ${JSON.stringify(model.accessTokenSecret)}`);
    let promise: Promise<Stat> = new Promise<Stat>((resolve, reject) => {
      console.log("????????");
      this.oa.getProtectedResource(remoteApiUrl, 'GET', model.accessToken, model.accessTokenSecret,
        function(error: any, data: any) {
        console.log(`error: ${JSON.stringify(error)}`);
        console.log(`data: ${JSON.stringify(data)}`);
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
    return promise;
  }
}
