import { Component } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Router } from '@angular/router';

// service imports
import { JwtService } from '../common/service/jwt.service';
import { SausageService } from '../common/service/sausage.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  public test: string;

  public constructor(private _http: Http,
    private _sausageService: SausageService,
    private _jwtService: JwtService,
    private _router: Router) {
    if (!this._jwtService.isAuthenticated()) {
      this._router.navigate(['login']);
    }
  }

  public getTestData(): void {
    this._sausageService.getTestData().then((r) => this.test = r);
  }
}
