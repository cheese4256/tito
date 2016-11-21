import * as config from 'config';

import { ControllerBase } from './_controller.base';

// model imports
import { Stat } from '../model/stat';

// service imports
import { StatService } from '../service/stat.service';

export class StatController extends ControllerBase<Stat> {
  // constructor
  constructor(protected _service: StatService) {
    super(_service);
  }

  public stats(httpRequest: any, httpResponse: any): void {
    let model: any = httpRequest.body

    this._service.stats(model)
      .then(r => {
        httpResponse.send({
          stats: "TODO"
        });
      })
      .catch((e: any) => {
        this.handleError(e, httpResponse);
      });
  }

  public token(httpRequest: any, httpResponse: any): void {
    this._service.requestToken()
      .then(r => {
        httpResponse.json(r);
      })
      .catch((e: any) => {
        this.handleError(e, httpResponse);
      });
  }
}
