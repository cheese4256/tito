import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

// model imports
import { Sausage } from '../../../../tito-node-api/src/model/identity/sausage';

// service imports
import { DeploymentContextService } from './deployment-context.service';

@Injectable()
export class AuthenticationService {
  // public properties
  public readonly TITO_AUTH_TOKEN_NAME: string = "tito_auth_token";

  // private properties
  private googleAuthParameters: string[];
  private clientId: string;
  private cachedToken: string;
//  private loggedIn: boolean = false;

  public constructor(private http: Http,
    private _deploymentContextService: DeploymentContextService) {
    // this.loggedIn =
    //   !!localStorage.getItem(AuthenticationService.TITO_AUTH_TOKEN_NAME);
    this.cachedToken = this.getToken();
    this.clientId = '994217616265-r1p6knp97m289l618u5lnub4ackr0o57.apps.googleusercontent.com'
    this.googleAuthParameters = ['response_type=code'];
    this.googleAuthParameters.push('client_id=' + this.clientId);
    this.googleAuthParameters.push('redirect_uri=' + window.location.origin);
    this.googleAuthParameters.push('scope=profile email');
  }

  // public methods
  public googleAuth(sausage: Sausage): Promise<Sausage> {
    let googleAuthUrl: string =
      'https://accounts.google.com/o/oauth2/v2/auth?' + this.googleAuthParameters.join('&');
    let options: string = "width=500,height=500,left=" +
      (window.outerWidth - 500) / 2 + ",top=" + (window.outerHeight - 500) / 2.5;

    let popup = window.open(googleAuthUrl, '', options);
    window.focus();

    let promise: Promise<Sausage> = new Promise<Sausage>((resolve, reject) => {
      window.addEventListener('message', (event) => {
        if (event.origin === window.location.origin) {
          let code: string = event.data;
          popup.close();
          let googleUrl: string =
            this._deploymentContextService.buildApiUrl('sausage/google');
          this.http.post(googleUrl,
            {
              code: code,
              clientId: this.clientId,
              redirectUri: window.location.origin
            })
            .toPromise()
            .then(jwtResult => {
              resolve(this.authSuccessful(jwtResult));
            })
            .catch(err => {
              reject(`googleAuth failed: ${err}`);
            });
        }
      });
    });
    return promise;
  }

  public login(sausage: Sausage): Promise<Sausage> {
    let headers = new Headers({'Content-Type': 'application/json'});

// TODO: The service using this service knows more about the url they want to use, so clean this up
    let apiUrl: string =
      this._deploymentContextService.buildApiUrl('sausage/login');
    console.log(apiUrl);

    return this.http.post(apiUrl,
      sausage,
//      JSON.stringify({ email, password }),
      { headers }
    ).toPromise().then(r => {
      return this.authSuccessful(r);
//       console.log(r);
//       let result: any = r.json();
//       console.log(result);
// // TODO: Check for expiration?
//       if (result.token) {
//         console.log(result.token);
//         this.setToken(result.token);
//         // localStorage.setItem(AuthenticationService.TITO_AUTH_TOKEN_NAME,
//         //   result.token);
//         // this.loggedIn = true;
//       }
//       return result.sausage;
//       // console.log(result);
//       // let success: boolean = result.success;
//       // console.log(success);
//       // if (success) {
//       //   console.log(result.token);
//       //   localStorage.setItem(AuthenticationService.TITO_AUTH_TOKEN_NAME,
//       //     result.token);
//       //   this.loggedIn = true;
//       // }
//       // return success;
    });
  }

  public logout(): void {
    this.cachedToken = null;
    localStorage.removeItem(this.TITO_AUTH_TOKEN_NAME);
//    this.loggedIn = false;
  }

  public register(sausage: Sausage): Promise<Sausage> {
    let headers = new Headers({'Content-Type': 'application/json'});

    let apiUrl: string =
      this._deploymentContextService.buildApiUrl('sausage/register');

    return this.http.post(apiUrl,
      sausage,
      { headers }
    ).toPromise().then(r => {
      return this.authSuccessful(r);
//       console.log(r);
//       let result: any = r.json();
//       console.log(result);
// // TODO: Check for expiration?
//       if (result.token) {
//         console.log(result.token);
//         this.setToken(result.token);
//         // localStorage.setItem(AuthenticationService.TITO_AUTH_TOKEN_NAME,
//         //   result.token);
//         // this.loggedIn = true;
//       }
//       return result.sausage;
    });
  }

  public setToken(token: string): void {
    this.cachedToken = token;
    localStorage.setItem(this.TITO_AUTH_TOKEN_NAME, token);
  }

  public getToken(): string {
    if (!this.cachedToken) {
      this.cachedToken =
        localStorage.getItem(this.TITO_AUTH_TOKEN_NAME);
    }
    return this.cachedToken;
  }

  public isAuthenticated(): boolean {
    return !!this.getToken();
  }

  public setAuthorizationHeader(headers: Headers): void {
    headers.append('Authorization', `Bearer ${this.getToken()}`);
  }

  // private functions
  private authSuccessful(jwtResponse: any): Sausage {
    let result: any = jwtResponse.json();
    // console.log(result);
// TODO: Check for expiration?
    if (result.token) {
      // console.log(result.token);
      this.setToken(result.token);
    }
    return result.sausage;
  }
}
