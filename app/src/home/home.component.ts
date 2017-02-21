import { Component } from '@angular/core';
import { Headers, Http } from '@angular/http';

// service imports
import { SausageService } from '../common/service/sausage.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  public test: string;

  public constructor(private _http: Http,
    private _sausageService: SausageService) {}

  public getTestData(): void {
    this._sausageService.getTestData().then((r) => this.test = r);
  }
}
