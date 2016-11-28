import { ControllerBase } from '../_controller.base';

// model imports
import { Stat } from '../../model/tito/stat';

// service imports
import { StatService } from '../../service/stat/stat.service';

export class StatController extends ControllerBase<Stat> {
  // constructor
  constructor(protected _service: StatService) {
    super(_service);
  }

  public create(httpRequest: any, httpResponse: any): void {
    throw Error('not implemented');
  }

  public stats(httpRequest: any, httpResponse: any): void {
    let model: any = httpRequest.body

    this._service.stats(model)
      .then(r => {
        httpResponse.send(r);
      })
      .catch((e: any) => {
        this.handleError(e, httpResponse);
      });
  }

  public requestToken(httpRequest: any, httpResponse: any): void {
    this._service.requestToken()
      .then(r => {
        httpResponse.json(r);
      })
      .catch((e: any) => {
        this.handleError(e, httpResponse);
      });
  }

  public accessToken(httpRequest: any, httpResponse: any): void {
    let model: any = httpRequest.body;
    this._service.accessToken(model)
      .then(r => {
        httpResponse.json(r);
      })
      .catch((e: any) => {
        this.handleError(e, httpResponse);
      });
  }
}
