import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class JwtService {
  // public properties
  public TOKEN_NAME: string = 'id_token';

  public constructor(private _router: Router) { }

  // public methods
  public login(jwtResponse: any): void {
    let result: any = jwtResponse.json();
    if (result.token) {
      localStorage.setItem(this.TOKEN_NAME, result.token);
    }
  }

  public logout(): void {
    localStorage.removeItem(this.TOKEN_NAME);
    this._router.navigate(['login']);
  }

  public isAuthenticated(): boolean {
    return tokenNotExpired();
  }
}
