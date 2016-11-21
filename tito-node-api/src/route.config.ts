// vendor imports
import * as express from 'express';

// controller imports
import { SausageController } from './controller/sausage.controller';
import { StatController } from './controller/stat.controller';
import { TeamController } from './controller/team.controller';

export class RouteConfig {
  public constructor(private _application: any) {
    // instantiate a router
    let router = express.Router();

    // health check
    router.get('/', function(request: any, response: any) {
      response.json({status: 'healthy'});
    });

    // sausage routes
    router.get('/sausage', function(request: any, response: any) {
      let controller = request.dependencyInjector.get(SausageController);
      controller.find(request, response);
    });
    router.post('/sausage', function(request:any, response: any){
      let controller = request.dependencyInjector.get(SausageController);
      controller.create(request, response);
    });
    router.get('/sausage/:id', function(request: any, response: any) {
      let controller = request.dependencyInjector.get(SausageController);
      controller.get(request, response);
    });
    router.post('/sausage/register', function(request: any, response: any) {
      let controller = request.dependencyInjector.get(SausageController);
      controller.register(request, response);
    });
    router.post('/sausage/login', function(request: any, response: any) {
      let controller = request.dependencyInjector.get(SausageController);
      controller.login(request, response);
    });
    router.post('/sausage/google', function(request: any, response: any) {
      let controller = request.dependencyInjector.get(SausageController);
      controller.google(request, response);
    });

    // team routes
    router.get('/team', function(request: any, response: any) {
      let controller = request.dependencyInjector.get(TeamController);
      controller.getTeams(request, response);
    });

    // stat routes
    router.get('/stats/requestToken', function(request: any, response: any) {
      let controller = request.dependencyInjector.get(StatController);
      controller.requestToken(request, response);
    });
    router.post('/stats/accessToken', function(request: any, response: any) {
      let controller = request.dependencyInjector.get(StatController);
      controller.accessToken(request, response);
    });
    router.post('/stats', function(request: any, response: any) {
      let controller = request.dependencyInjector.get(StatController);
      controller.stats(request, response);
    });

    // register the router w/ express application
    this._application.use('/api', router);
  }
}
