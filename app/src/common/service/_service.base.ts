// vendor imports
import { Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

// model imports
import { Sausage } from '../../../../tito-node-api/src/model/identity/sausage';

// service imports
import { DeploymentContextService } from './deployment-context.service';

export abstract class ServiceBase {
  // private & protected properties
  protected _apiUrl: string;

  // constructor
  public constructor(protected _authHttp: AuthHttp,
    protected _context: DeploymentContextService,
    restApiRelativePath: string) {
    this._apiUrl = _context.buildApiUrl(restApiRelativePath);
  }

  // private & protected methods
  protected _post<T>(model: T): Promise<T> {
    let headers = new Headers({'Content-Type': 'application/json'});

    return this._authHttp.post(this._apiUrl, model, { headers })
      .toPromise()
      .then(r => r.json() as T);
  }

  protected _put<T>(model: T): Promise<T> {
    let headers = new Headers({'Content-Type': 'application/json'});

    return this._authHttp.put(this._apiUrl, model, { headers })
      .toPromise()
      .then(r => r.json() as T);
  }
}
