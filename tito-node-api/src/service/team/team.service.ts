import { ServiceBase } from '../_service.base';

// model imports
import { Team } from '../../model/tito/team';

// dependency imports
import { TeamRepository } from '../../repository/team/team.repository';
import { TeamValidator } from '../../validation/team.validator';

export class TeamService extends ServiceBase<Team> {
  // constructor
  constructor(protected _repository: TeamRepository,
    protected _validator: TeamValidator) {
      super(_repository, _validator);
  }
}
