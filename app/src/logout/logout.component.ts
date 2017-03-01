import { Component } from '@angular/core';
import { Router } from '@angular/router';

// service imports
import { JwtService } from '../common/service/jwt.service';

@Component({
  template: "logout"
})
export class LogoutComponent {
  public constructor(private _jwtService: JwtService,
    private router: Router) {
      this.logout();
    }

  public logout(): void {
    this._jwtService.logout();
  }
}
