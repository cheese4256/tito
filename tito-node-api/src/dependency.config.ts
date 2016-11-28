// controller imports
import { SausageController } from './controller/sausage/sausage.controller';
import { StatController } from './controller/stat/stat.controller';
import { TeamController } from './controller/team/team.controller';

// service imports
import { CryptoService } from './service/crypto/crypto.service';
import { JwtService } from './service/jwt/jwt.service';
import { SausageService } from './service/sausage/sausage.service';
import { ServiceBase } from './service/_service.base';
import { StatService } from './service/stat/stat.service';
import { TeamService } from './service/team/team.service';

// repository imports
import { SausageRepository } from './repository/sausage/sausage.repository';
import { StatRepository } from './repository/stat/stat.repository';
import { TeamRepository } from './repository/team/team.repository';

// validator imports
import { SausageValidator } from './validation/sausage.validator';
import { StatValidator } from './validation/stat.validator';
import { TeamValidator } from './validation/team.validator';

export class DependencyConfig {
  public constructor(private _application: any) {
    // initialize the application dependency injection container
    require('express-dependency-injector')(_application);

    // sausage dependencies
    _application.bind(SausageController, [SausageService], 'webrequest');
    _application.bind(SausageService,
      [SausageRepository, SausageValidator, CryptoService, JwtService], 'webrequest');

    // stat dependencies
    _application.bind(StatController, [StatService], 'webrequest');
    _application.bind(StatService, [StatRepository, StatValidator], 'webrequest');

    // team dependencies
    _application.bind(TeamController, [TeamService], 'webrequest');
    _application.bind(TeamService, [TeamRepository, TeamValidator], 'webrequest');
  }
}
