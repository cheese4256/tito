// vendor imports
import { Headers, Http } from '@angular/http';

// model imports
import { Sausage } from '../../../../tito-node-api/src/model/identity/sausage';

// service imports
import { DeploymentContextService } from './deployment-context.service';

export abstract class ServiceBase {
  // private & protected properties
  protected _apiUrl: string;

  // constructor
  public constructor(protected _http: Http,
    protected _context: DeploymentContextService,
    restApiRelativePath: string) {
    this._apiUrl = _context.buildApiUrl(restApiRelativePath);
  }

  // private & protected methods
  protected _post<T>(model: T): Promise<T> {
    let headers = new Headers({'Content-Type': 'application/json'});

    return this._http.post(this._apiUrl, model, { headers })
      .toPromise()
      .then(r => r.json() as T);
  }

  protected _put<T>(model: T): Promise<T> {
    let headers = new Headers({'Content-Type': 'application/json'});

    return this._http.put(this._apiUrl, model, { headers })
      .toPromise()
      .then(r => r.json() as T);
  }
}
