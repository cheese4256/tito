import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { AuthenticationService } from './authentication.service'

@Injectable()
export class ProfileService {
  public constructor(private http: Http,
    private _authenticationService: AuthenticationService) { }

  public getProfile(): Promise<any> {
    let headers = new Headers({'Content-Type': 'application/json'});

    this._authenticationService.setAuthorizationHeader(headers);

    return this.http.get('/profile', { headers })
      .toPromise()
      .then(res => res.json());
    // return this.http
    //   .get('/profile', { headers })
    //   .map(res => res.json());
  }
}
