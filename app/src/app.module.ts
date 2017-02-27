import { NgModule, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

// app & routing
import { AppComponent } from './app.component';
import { routing } from './app.routing';

// top level page
import { AdminComponent } from './admin/admin.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ProfileComponent } from './profile/profile.component';
import { RegistrationComponent } from './registration/registration.component';
import { TeamsComponent } from './teams/teams.component';

// services
import { AuthenticationService } from './common/service/authentication.service';
import { DeploymentContextService } from './common/service/deployment-context.service';
import { JwtService } from './common/service/jwt.service';
import { ProfileService } from './common/service/profile.service';
import { SausageService } from './common/service/sausage.service';
import { StatService } from './common/service/stat.service';
import { TeamService } from './common/service/team.service';

// guards
import { LoggedInGuard } from './common/guard/logged-in.guard';

let providers: any[] = [
  AuthenticationService,
  DeploymentContextService,
  JwtService,
  LoggedInGuard,
  ProfileService,
  SausageService,
  StatService,
  TeamService
];

let environment = process.env.ENV;
if (environment === 'development') {
  providers.push({provide: LocationStrategy, useClass: HashLocationStrategy});
}

enableProdMode();

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  declarations: [
    AdminComponent,
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    LogoutComponent,
    ProfileComponent,
    RegistrationComponent,
    TeamsComponent
  ],
  providers: providers,
  bootstrap: [ AppComponent ]
})
export class AppModule { }
