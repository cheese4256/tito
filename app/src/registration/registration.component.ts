import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../common/service/authentication.service';

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html'
})
export class RegistrationComponent {
  public constructor(private authenticationService: AuthenticationService,
    private router: Router) {}

  public onSubmit(email: string, password: string): void {
    // this.sausageService.register(this.currentSausage)
    //   .then((result: any) => {
    //     if (result) {
    //       this.router.navigate(['/login']);
    //     }
    //   });
  }
}
