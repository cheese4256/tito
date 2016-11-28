import { RepositoryStubBase } from '../_repository.stub.base';

import { Team } from '../../model/tito/team';

export class TeamRepositoryStub extends RepositoryStubBase<Team> {
  public generateDefaultModel(): Team {
    return {
      name: 'CheeseDome'
    } as Team;
  }
}
