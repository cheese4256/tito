import { ServiceBase } from './_service.base';

// model imports
import { Team } from '../model/team';

// repository imports
import { TeamRepository } from '../repository/team.repository';

export class TeamService extends ServiceBase<Team> {
  // constructor
  constructor(protected _repository: TeamRepository) {
    super(_repository);
  }
}
