import { Component } from '@angular/core';

// service imports
import { AuthenticationService } from '../common/service/authentication.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  public constructor(protected _authenticationService: AuthenticationService) {}

  public isAuthenticated(): boolean {
    return this._authenticationService.isAuthenticated();
  }
}
