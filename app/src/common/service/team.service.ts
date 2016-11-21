import { ServiceBase } from './_service.base';

// vendor imports
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

// model imports
import { Team } from '../../../../tito-node-api/src/model/team';

// service imports
import { AuthenticationService } from './authentication.service'
import { DeploymentContextService } from './deployment-context.service';

@Injectable()
export class TeamService extends ServiceBase {
  public constructor(protected _http: Http,
    protected _authenticationService: AuthenticationService,
    protected _context: DeploymentContextService) {
      super(_http, _context, 'team');
  }

  public getTeams(): Promise<any> {
    let headers = new Headers({'Content-Type': 'application/json'});

    this._authenticationService.setAuthorizationHeader(headers);

    return this._http.get(this._apiUrl, { headers })
      .toPromise()
      .then(res => res.json());
  }
}
