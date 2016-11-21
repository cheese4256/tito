import { Component } from '@angular/core';
import { Router } from '@angular/router';

// model imports
import { Sausage } from '../../../tito-node-api/src/model/identity/sausage';

// service imports
import { AuthenticationService } from '../common/service/authentication.service';
import { SausageService } from '../common/service/sausage.service';
import { StatService } from '../common/service/stat.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  // public properties
  public currentSausage: Sausage;

  public constructor(private authenticationService: AuthenticationService,
    private sausageService: SausageService,
    private statService: StatService,
    private router: Router) {}

  public ngOnInit(): void {
    // Make sure we're starting with a fresh Sausage
    this.currentSausage = this.sausageService.getNewSausage();
  }

  public google(): void {
    if (!this.currentSausage) {
      this.router.navigate(['login']);
    }
    this.authenticationService.googleAuth(this.currentSausage)
      .then((result: any) => {
        if (result) {
          this.router.navigate(['']);
        }
      });
  }

  public login(): void {
    if (!this.currentSausage) {
      this.router.navigate(['login']);
    }
    this.authenticationService.login(this.currentSausage)
      .then((result: any) => {
        if (result) {
          this.router.navigate(['']);
        }
      });
  }

  public yahooStats(): void {
    this.statService.yahooStats()
      .then((result: any) => {
        console.log(`result: ${result}`);
      });
  }
}
