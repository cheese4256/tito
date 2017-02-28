import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

// model imports
import { Sausage } from '../../../tito-node-api/src/model/identity/sausage';

// service imports
import { SausageService } from '../common/service/sausage.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  // public properties
  public currentSausage: Sausage;
  public rememberMe: boolean;
  public submitAttempted: boolean = false;
  public year: number;

  // private properties
  @ViewChild('usernameInput')
  private _usernameInput: any;

  public constructor(private sausageService: SausageService,
    private router: Router) {
      this.year = new Date().getFullYear();
  }

  public ngOnInit(): void {
    // Make sure we're starting with a fresh Sausage
    this.currentSausage = this.sausageService.getNewSausage();
  }

  public ngAfterViewInit(): void {
    this._usernameInput.nativeElement.focus();
  }

  public isSubmitDisabled(): boolean {
    if (this.currentSausage.username && this.currentSausage.password) {
      return false;
    }
    return true;
  }

  public login(): void {
    if (!this.currentSausage) {
      // This indicates the SausageService is down. We need it, though, so
      // navigate back to the login page, and provide a message to the sausage.
      // TODO: Populate errors, and display them on the login page
      this.router.navigate(['login']);
    }
    this.sausageService.login(this.currentSausage)
      .then((result: Sausage) => {
        if (result.username) {
          this.router.navigate(['']);
        } else {
          this.router.navigate(['login']);
        }
      });
    // if (!this.currentSausage) {
    //   this.router.navigate(['login']);
    // }
    // this.authenticationService.login(this.currentSausage)
    //   .then((result: any) => {
    //     if (result) {
    //       this.router.navigate(['']);
    //     }
    //   });
  }
}
