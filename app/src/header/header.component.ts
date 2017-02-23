import { Component, OnInit } from '@angular/core';

// service imports
import { JwtService } from '../common/service/jwt.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  public constructor(protected _jwtService: JwtService) {}

  public isAuthenticated(): boolean {
    return this._jwtService.isAuthenticated();
  }
}
