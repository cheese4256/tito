import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

import { AuthenticationService } from './authentication.service'

@Injectable()
export class ProfileService {
  public constructor(private _authHttp: AuthHttp,
    private _authenticationService: AuthenticationService) { }

  public getProfile(): Promise<any> {
    let headers = new Headers({'Content-Type': 'application/json'});

    this._authenticationService.setAuthorizationHeader(headers);

    return this._authHttp.get('/profile', { headers })
      .toPromise()
      .then(res => res.json());
    // return this.http
    //   .get('/profile', { headers })
    //   .map(res => res.json());
  }
}
