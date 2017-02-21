import { ServiceBase } from './_service.base';

// vendor imports
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

// model imports
import { Sausage } from '../../../../tito-node-api/src/model/identity/sausage';

// service imports
import { AuthenticationService } from './authentication.service';
import { DeploymentContextService } from './deployment-context.service';

@Injectable()
export class SausageService extends ServiceBase {
  // private properties
  private _currentSausage: Sausage = null;

  public constructor(protected _http: Http,
    protected _authenticationService: AuthenticationService,
    protected _deploymentContextService: DeploymentContextService) {
      super(_http, _deploymentContextService, 'sausage');
    }

  // public methods
  public clearCurrentSausage(): void {
    this._currentSausage = null;
  }

  public getNewSausage(): Sausage {
    this.clearCurrentSausage();
    return <Sausage>{};
  }

  public login(sausage: Sausage): Promise<Sausage> {
    return this._authenticationService.login(sausage)
      .then(r => {
        this._currentSausage = r;
        console.log(this._currentSausage);
        return this._currentSausage;
      })
      .catch(err => {
        console.log(`Unable to login sausage: ${err}]`);
        return err;
      });
    // let apiUrl = `${this._apiUrl}/login`;
    // let headers = new Headers({'Content-Type': 'application/json'});
    // return this._http.post(apiUrl, sausage, { headers })
    //   .toPromise()
    //   .then(r => {
    //     this._currentSausage = r.json() as Sausage;
    //     console.log(this._currentSausage);
    //     return this._currentSausage;
    //   })
    //   .catch(err => {
    //     console.log(`Unable to login sausage: ${err}]`);
    //     return err;
    //   });
  }

  public register(sausage: Sausage): Promise<Sausage> {
    return this._authenticationService.register(sausage)
      .then(r => {
        this._currentSausage = r;
        console.log(this._currentSausage);
        return this._currentSausage;
      })
      .catch(err => {
        console.log(`Unable to login sausage: ${err}]`);
        return err;
      });
    // let apiUrl = `${this._apiUrl}/register`;
    // let headers = new Headers({'Content-Type': 'application/json'});
    // return this._http.post(apiUrl, sausage, { headers })
    //   .toPromise()
    //   .then(r => {
    //     this._currentSausage = r.json() as Sausage;
    //     console.log(this._currentSausage);
    //     return this._currentSausage;
    //   })
    //   .catch(err => {
    //     console.log("Unable to register sausage");
    //     return err;
    //   });
  }

  public getTestData(): Promise<string> {
    let headers = new Headers({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
    let apiUrl: string =
      this._deploymentContextService.buildApiUrl('TestRest');
    return this._http.get(apiUrl, { headers })
      .toPromise()
      .then(res => res.json());
  }
}
