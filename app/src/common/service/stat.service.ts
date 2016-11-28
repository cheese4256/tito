import * as crypto from 'crypto';

import { ServiceBase } from './_service.base';

// vendor imports
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

// service imports
import { DeploymentContextService } from './deployment-context.service';

@Injectable()
export class StatService extends ServiceBase {
  // private properties
  private yahooOAuthParameters: string[];
  private clientId: string;
  private consumerSecret: string;
  private requestToken: string;
  private requestTokenSecret: string;
  private accessToken: string;
  private accessTokenSecret: string;
  private oauthSessionHandle: string;

  public constructor(private http: Http,
    private _deploymentContextService: DeploymentContextService) {
      super(http, _deploymentContextService, 'stats');

      this.clientId = 'dj0yJmk9MEtpcU9DaGRHS3JnJmQ9WVdrOVRtZFdaMDFvTm04bWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD0yOA--';
      this.consumerSecret = 'c1368ffbecf6661dd6da5d75230cc5587da3b411' + '%26';
      this.yahooOAuthParameters = ['oauth_nonce=' + crypto.randomBytes(16).toString('hex')];
      this.yahooOAuthParameters.push('oauth_timestamp=' + Date.now());
      this.yahooOAuthParameters.push('oauth_consumer_key=' + this.clientId);
      this.yahooOAuthParameters.push('oauth_signature_method=plaintext');
      this.yahooOAuthParameters.push('oauth_signature=' + this.consumerSecret);
      this.yahooOAuthParameters.push('oauth_version=1.0');
      this.yahooOAuthParameters.push('xoauth_lang_pref=en-us');
// TODO: The actual oauth parameters are supplied on the server-side, so clean this all up.
//      this.yahooOAuthParameters.push('oauth_callback=oob');
      this.yahooOAuthParameters.push('oauth_callback=http://www.liquidelvis.com?in_popup');
  //    this.yahooOAuthParameters.push('oauth_callback=' + window.location.origin);
      //console.log(this.yahooOAuthParameters.join('&'));
  }

  // public methods
  public getRequestToken(): Promise<any> {
    let requestTokenUrl = `${this._apiUrl}/requestToken`;
    console.log(requestTokenUrl);
    return this.http.get(requestTokenUrl)
      .toPromise()
      .then(r => {
        return r.json();
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }

  public getUserAuthorization(xoauth_request_auth_url: string): Promise<any> {
    console.log("requestAuthorization");
    let requestAuthUrl = xoauth_request_auth_url;
    console.log(requestAuthUrl);
    let options: string = "width=600,height=500,left=" +
      (window.outerWidth - 600) / 2 + ",top=" + (window.outerHeight - 500) / 2.5;

    let popup = window.open(requestAuthUrl, '', options);
    console.log("popup: " + popup);
    window.focus();
    console.log("0");

    let promise: Promise<any> = new Promise<any>((resolve, reject) => {
      console.log("1");
      // window.addEventListener('message', (event) => {
      //   console.log("2");
      //   // if (event.origin === window.location.origin) {
      //   //   let code: string = event.data;
      //   //   popup.close();
      //   //   let yahooUrl: string =
      //   //     this._deploymentContextService.buildApiUrl('stats');
      //   //   this.http.post(yahooUrl,
      //   //     {
      //   //       code: code,
      //   //       clientId: this.clientId,
      //   //       redirectUri: window.location.origin
      //   //     })
      //   //     .toPromise()
      //   //     .then(jwtResult => {
      //   //       console.log(`jwtResult: ${jwtResult}`);
      //   //       resolve(true);
      //   //     })
      //   //     .catch(err => {
      //   //       reject(`yahooStats failed: ${err}`);
      //   //     });
      //   // }
      // });
    });
    return promise;
  }

  public getAccessToken(oauthVerifier: string): Promise<any> {
    let accessTokenUrl = `${this._apiUrl}/accessToken`;
    console.log(accessTokenUrl);
    let model: any = {
      requestToken: this.requestToken,
      requestTokenSecret: this.requestTokenSecret,
      oauthVerifier: oauthVerifier
    }
    return this.http.post(accessTokenUrl, model)
      .toPromise()
      .then(r => {
        let result = r.json();
        this.accessToken = result.oauth_access_token,
        this.accessTokenSecret = result.oauth_access_token_secret,
        this.oauthSessionHandle = result.moreData.oauthSessionHandle;
        return result;
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }

// TODO: This hasn't really been tested due to difficulties caused by Yahoo!
//       restrictions against localhost, so test it
  public refreshAccessToken(): Promise<any> {
    let accessTokenUrl = `${this._apiUrl}/accessToken`;
    console.log(accessTokenUrl);
    let model: any = {
      requestToken: this.accessToken,
      requestTokenSecret: this.accessTokenSecret,
      oauthVerifier: this.oauthSessionHandle
    }
    return this.http.post(accessTokenUrl, model)
      .toPromise()
      .then(r => {
        let result = r.json();
        this.accessToken = result.oauth_access_token,
        this.accessTokenSecret = result.oauth_access_token_secret,
        this.oauthSessionHandle = result.moreData.oauthSessionHandle;
        return result;
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }

// TODO: Get rid of this?
  public getRequestTokenAndUserAuthorization(): Promise<any> {
    return this.getRequestToken()
      .then(r => {
        console.log(r);
        this.requestToken = r.oauth_token;
        this.requestTokenSecret = r.oauth_token_secret;
        this.getUserAuthorization(r.moreData.xoauth_request_auth_url);
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }

  public yahooStats(): Promise<any> {
    return this.getRequestToken()
      .then(r => {
        console.log(r);
        this.requestToken = r.oauth_token;
        this.requestTokenSecret = r.oauth_token_secret;
        this.getUserAuthorization(r.moreData.xoauth_request_auth_url);
// TODO: Get the oauthVerifier then get the accessToken, then get the stats
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }

  public getData(remoteApiUrl: string): Promise<any> {
    let localApiUrl = `${this._apiUrl}`;
// TODO: Cache all the oauth stuff on the server-side, except maybe the user authorization stuff?
    let model: any = {
      remoteApiUrl: remoteApiUrl,
      accessToken: this.accessToken,
      accessTokenSecret: this.accessTokenSecret
    }
// TODO: Can this be a GET?
    return this.http.post(localApiUrl, model)
      .toPromise()
      .then(r => {
        console.log(r);
        return r.json();
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }
}
