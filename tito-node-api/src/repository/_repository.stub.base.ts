let sinon = require('sinon');

export abstract class RepositoryStubBase<T> {
  public abstract generateDefaultModel(): T;

  public buildMethodStub(expected: T): any {
    if (!expected) {
      expected = this.generateDefaultModel();
    }
    let stub = sinon.stub().resolves(expected);
    stub().then((m: T) => {
      return m;
    });

    return stub;
  };
}
