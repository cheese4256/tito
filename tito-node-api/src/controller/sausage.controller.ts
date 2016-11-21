import * as config from 'config';
import * as moment from 'moment';

import { ControllerBase } from './_controller.base';

// model imports
import { Sausage } from '../model/identity/sausage';

// service imports
import { JwtService } from '../service/jwt.service';
import { SausageService } from '../service/sausage.service';

export class SausageController extends ControllerBase<Sausage> {
  // constructor
  constructor(protected _jwtService: JwtService,
    protected _service: SausageService) {
    super(_service);
  }

  public google(httpRequest: any, httpResponse: any): void {
    let model: any = httpRequest.body

    this._service.google(model)
      .then((m: Sausage) => {
        let payload = {
          iss: httpRequest.hostname,
          sub: m.id,
          exp: moment().add(10, 'days').unix()
        }

        let jwtSecret = config.get('jwt.secret').toString();

        let jwt: string = this._jwtService.encode(payload, jwtSecret);

        httpResponse.send({
          sausage: m,
          auth_token: jwt
        });
      })
      .catch((e: any) => {
        httpResponse.status(401).send(e);
        // this.handleError(e, httpResponse);
      });
  }

  public login(httpRequest: any, httpResponse: any): void {
    let model: Sausage = httpRequest.body;

    this._service.login(model)
      .then((m: Sausage) => {
        let payload = {
          iss: httpRequest.hostname,
          sub: m.id,
          exp: moment().add(10, 'days').unix()
        }

        let jwtSecret = config.get('jwt.secret').toString();

        let jwt: string = this._jwtService.encode(payload, jwtSecret);

        httpResponse.send({
          sausage: m,
          auth_token: jwt
        });
      })
      .catch((e: any) => {
        httpResponse.status(401).send(e);
        // this.handleError(e, httpResponse);
      });
  }

  public register(httpRequest: any, httpResponse: any): void {
    let model: Sausage = httpRequest.body;

    this._service.register(model)
      .then((m: Sausage) => {
        let payload = {
          iss: httpRequest.hostname,
          sub: m.id,
          exp: moment().add(10, 'days').unix()
        }

        let jwtSecret = config.get('jwt.secret').toString();

        let jwt: string = this._jwtService.encode(payload, jwtSecret);

        httpResponse.send({
          sausage: m,
          auth_token: jwt
        });
      })
      .catch((e: any) => {
        httpResponse.status(401).send(e);
        // this.handleError(e, httpResponse);
      });
  }
}
