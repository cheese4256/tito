import * as config from 'config';
import * as moment from 'moment';

import { ControllerBase } from '../_controller.base';

// model imports
import { Sausage } from '../../model/identity/sausage';

// service imports
import { SausageService } from '../../service/sausage/sausage.service';

export class SausageController extends ControllerBase<Sausage> {
  // constructor
  constructor(protected _service: SausageService) {
    super(_service);
  }

  public create(httpRequest: any, httpResponse: any): void {
    // NOTE - we want to make use of the registration endpoint instead
    // of create.  No routes should be mapped to SausageController.create
    throw Error('not implemented');
  }

  public google(httpRequest: any, httpResponse: any): void {
    let model: any = httpRequest.body

    this._service.google(model)
      .then((m: Sausage) => {
        // console.log(`sausage? ${JSON.stringify(m)}`);
        httpResponse.json(m);
        // let payload = {
        //   iss: httpRequest.hostname,
        //   sub: m.id,
        //   exp: moment().add(10, 'days').unix()
        // }
        //
        // let jwtSecret = config.get('jwt.secret').toString();
        //
        // let jwt: string = this._jwtService.encode(payload, jwtSecret);
        //
        // httpResponse.send({
        //   sausage: m,
        //   token: jwt
        // });
      })
      .catch((e: any) => {
        httpResponse.status(401).send(e);
        // this.handleError(e, httpResponse);
      });
  }

  public login(httpRequest: any, httpResponse: any): void {
    let email = httpRequest.body.email;
    let password = httpRequest.body.password;

    this._service.login(email, password)
      .then((result: any) => {
        if (result && result.token && result.sausage) {
          httpResponse.json(result);  // valid sausage found
        } else {
          httpResponse.status(401).send(); // sausage not found
        }
      })
      .catch((e: any) => {
        this.handleError(e, httpResponse);
      });
  }

  public register(httpRequest: any, httpResponse: any): void {
    let model: Sausage = httpRequest.body;

    this._service.register(model)
      .then((m: Sausage) => {
        httpResponse.json(m);
      })
      .catch((e: any) => {
        this.handleError(e, httpResponse);
      });
  }
}
