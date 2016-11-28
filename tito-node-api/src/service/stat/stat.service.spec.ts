let chai = require('chai');
let sinon = require('sinon');
let expect = chai.expect;

// subject
import { StatService } from './stat.service';

// dependency imports
import { Stat } from '../../model/tito/stat';
import { StatRepository } from '../../repository/stat/stat.repository';
import { StatRepositoryStub } from '../../repository/stat/stat.repository.stub';
import { StatValidator } from '../../validation/stat.validator';
import { ValidationError, ValidationErrorType } from '../../validation/validation-error';

describe('StatService', () => {
  let subject: StatService;
  let repository: StatRepository;
  let validator: StatValidator;
  let stub: StatRepositoryStub = new StatRepositoryStub();

  beforeEach(function () {
    repository = {} as StatRepository;
    validator = new StatValidator();
    subject = new StatService(repository, validator);
  });

  describe('#create', () => {
    it('should create a new stat', () => {
      // arrange
      let expected = stub.generateDefaultModel();
      repository.create = stub.buildMethodStub(expected);

      sinon.spy(validator, 'create');

      // act
      let result = subject.create(expected);

      // assert
      return expect(result).to.be.fulfilled.then((m: any) => {
        expect(m.name).to.equal(expected.name);

        expect(repository.create).to.have.been.called;
        expect(validator.create).to.have.been.called;
      });
    });

    it('should reject stat when name is missing', () => {
      // arrange
      let expected = {} as Stat;
      repository.create = stub.buildMethodStub(expected);

      // act
      let result = subject.create(expected);

      // assert
      return expect(result).to.be.rejected.then((errors: any) => {
        expect(errors).to.exist;
        expect(errors.find((e: any) =>
          e.errorType === ValidationErrorType.missingRequiredField)).to.exist;
      });
    });
  });
});
