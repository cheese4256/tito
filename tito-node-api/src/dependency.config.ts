// controller imports
import { SausageController } from './controller/sausage.controller';
import { StatController } from './controller/stat.controller';
import { TeamController } from './controller/team.controller';

// service imports
import { JwtService } from './service/jwt.service';
import { SausageService } from './service/sausage.service';
import { ServiceBase } from './service/_service.base';
import { StatService } from './service/stat.service';
import { TeamService } from './service/team.service';

// repository imports
import { SausageRepository } from './repository/sausage.repository';
import { StatRepository } from './repository/stat.repository';
import { TeamRepository } from './repository/team.repository';

export class DependencyConfig {
  public constructor(private _application: any) {
    // initialize the application dependency injection container
    require('express-dependency-injector')(_application);

    // bind the dependencies
    _application.bind(SausageController, [JwtService, SausageService], 'webrequest');
    _application.bind(SausageService, [SausageRepository], 'webrequest');
    _application.bind(StatController, [StatService], 'webrequest');
    _application.bind(StatService, [StatRepository], 'webrequest');
    _application.bind(TeamController, [JwtService, TeamService], 'webrequest');
    _application.bind(TeamService, [TeamRepository], 'webrequest');
  }
}
