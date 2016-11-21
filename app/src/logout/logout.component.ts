import { Component } from '@angular/core';
import { Router } from '@angular/router';

// service imports
import { AuthenticationService } from '../common/service/authentication.service';

@Component({
  template: "logout"
})
export class LogoutComponent {
  public constructor(private authenticationService: AuthenticationService,
    private router: Router) {
      this.logout();
    }

  public logout(): void {
    this.authenticationService.logout()
    this.router.navigate(['']);
  }
}
