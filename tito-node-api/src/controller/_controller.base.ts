// service imports
import { ServiceBase } from '../service/_service.base';

export abstract class ControllerBase<T> {
  public constructor(protected _service: ServiceBase<T>) {}

  public create(httpRequest: any, httpResponse: any): void {
    let model: T = httpRequest.body;

    this._service.create(model)
      .then((m: T) => {
        httpResponse.json(m);
      })
      .catch((e: any) => {
        this.handleError(e, httpResponse);
      });
  }

  public find(httpRequest: any, httpResponse: any): void {
    let model: T = httpRequest.body;

    this._service.find()
      .then((m: T[]) => {
        httpResponse.json(m);
      })
      .catch((e: any) => {
        this.handleError(e, httpResponse);
      });
  }

  public get(httpRequest: any, httpResponse: any): void {
    let id = httpRequest && httpRequest.params
      ? httpRequest.params.id
      : null;

    this._service.get(id)
      .then((m: T) => {
        httpResponse.json(m);
      })
      .catch((e: any) => {
        this.handleError(e, httpResponse);
      });
  }

  protected handleError(e: any, httpResponse: any) {
    console.log(e);

    httpResponse.status(500).send(e);
  }
}
