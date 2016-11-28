import { RepositoryStubBase } from '../_repository.stub.base';

import { Sausage } from '../../model/identity/sausage';

export class SausageRepositoryStub extends RepositoryStubBase<Sausage> {
  public generateDefaultModel(): Sausage {
    return {
      email: 'testable@nevo.com',
      firstName: 'James',
      lastName: 'Duggan',
      credential: {
        passwordEncrypted: "fajYqXwxuytyzl0zpr0ywahaG+D2feRDj8XoQdx86HuI9wwH8p+BS06gXdRxv5eRNalHL2nbsuvIq7pE9s6ZLA==",
        passwordSalt: "14fe16d4b28b00666ac2e75a8"
      }
    } as Sausage;
  }
}
