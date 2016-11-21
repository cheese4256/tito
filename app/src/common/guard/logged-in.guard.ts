import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { AuthenticationService } from '../service/authentication.service';

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private authenticationService: AuthenticationService) {}

  canActivate() {
    console.log("???");
    return this.authenticationService.isAuthenticated();
  }
}
