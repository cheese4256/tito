import * as crypto from 'crypto';

import { ServiceBase } from './_service.base';

// vendor imports
import { Injectable } from '@angular/core';
import { Headers, Http, Jsonp } from '@angular/http';

// service imports
import { DeploymentContextService } from './deployment-context.service';

@Injectable()
export class StatService extends ServiceBase {
  // private properties
  private yahooOAuthParameters: string[];
  private clientId: string;
  private consumerSecret: string;

  public constructor(private http: Http,
    private jsonp: Jsonp,
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
      this.yahooOAuthParameters.push('oauth_callback=oob');
  //    this.yahooOAuthParameters.push('oauth_callback=' + window.location.origin);
      //console.log(this.yahooOAuthParameters.join('&'));
  }

  // public methods
  public requestToken(): Promise<any> {
    let requestTokenUrl = `${this._apiUrl}/token`;
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

  public yahooStats(): Promise<any> {
    // let promise0: Promise<any> = new Promise<any>((resolve, reject) => {
    // this.requestToken()
    return this.requestToken()
      .then(r => {
        console.log(r);
        let requestAuthUrl = `https://api.login.yahoo.com/oauth/v2/request_auth?oauth_token=${r.oauth_token}`;
        console.log(requestAuthUrl);
        let options: string = "width=500,height=500,left=" +
          (window.outerWidth - 500) / 2 + ",top=" + (window.outerHeight - 500) / 2.5;

        let popup = window.open(requestAuthUrl, '', options);
        console.log("popup: " + popup);
        window.focus();
        console.log("0");

        let promise: Promise<any> = new Promise<any>((resolve, reject) => {
          console.log("1");
          window.addEventListener('message', (event) => {
            console.log("2");
            // if (event.origin === window.location.origin) {
            //   let code: string = event.data;
            //   popup.close();
            //   let yahooUrl: string =
            //     this._deploymentContextService.buildApiUrl('/stats');
            //   this.http.post(yahooUrl,
            //     {
            //       code: code,
            //       clientId: this.clientId,
            //       redirectUri: window.location.origin
            //     })
            //     .toPromise()
            //     .then(jwtResult => {
            //       console.log(`jwtResult: ${jwtResult}`);
            //       resolve(true);
            //     })
            //     .catch(err => {
            //       reject(`yahooStats failed: ${err}`);
            //     });
            // }
          });
        });
        return promise;
//        return r;
      })
      .catch(err => {
        console.log(err);
        return err;
      });
    // });
    // return promise0;
  }
}
