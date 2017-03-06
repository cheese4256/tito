import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { JwtService } from '../service/jwt.service';

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private _jwtService: JwtService) {}

  canActivate() {
    if (this._jwtService.isAuthenticated()) {
      return true;
    }
    this._jwtService.logout();
    return false;
  }
}
