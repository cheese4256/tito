import { Routes, RouterModule } from '@angular/router';

// components
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ProfileComponent } from './profile/profile.component';
import { RegistrationComponent } from './registration/registration.component';
import { TeamsComponent } from './teams/teams.component';

// services, etc.
import { LoggedInGuard } from './common/guard/logged-in.guard';

const appRoot: string = `${process.env.APP_ROOT}`;

const appRoutes: Routes = [
  {
    path: appRoot,
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: appRoot ? appRoot + '/login' : 'login',
    component: LoginComponent
  },
  {
    path: appRoot ? appRoot + '/logout' : 'logout',
    component: LogoutComponent
  },
  {
    path: appRoot ? appRoot + '/profile' : 'profile',
    component: ProfileComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: appRoot ? appRoot + '/registration' : 'registration',
    component: RegistrationComponent
  },
  {
    path: appRoot ? appRoot + '/teams' : 'teams',
    component: TeamsComponent,
    canActivate: [LoggedInGuard]
  }
];

export const routing = RouterModule.forRoot(appRoutes);
