import { RepositoryStubBase } from '../_repository.stub.base';

import { Stat } from '../../model/tito/stat';

export class StatRepositoryStub extends RepositoryStubBase<Stat> {
  public generateDefaultModel(): Stat {
    return {
      name: 'Home Runs',
      value: 23
    } as Stat;
  }
}
