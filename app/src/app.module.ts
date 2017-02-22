import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';

// app & routing
import { AppComponent }  from './app.component';
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
import { ProfileService } from './common/service/profile.service';
import { SausageService } from './common/service/sausage.service';
import { StatService } from './common/service/stat.service';
import { TeamService } from './common/service/team.service';

// guards
import { LoggedInGuard } from './common/guard/logged-in.guard';

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
  providers: [
    AuthenticationService,
    DeploymentContextService,
    LoggedInGuard,
    ProfileService,
    SausageService,
    StatService,
    TeamService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
