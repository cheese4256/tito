let chai = require('chai');
let sinon = require('sinon');
let expect = chai.expect;

// subject
import { TeamService } from './team.service';

// dependency imports
import { Team } from '../../model/tito/team';
import { TeamRepository } from '../../repository/team/team.repository';
import { TeamRepositoryStub } from '../../repository/team/team.repository.stub';
import { TeamValidator } from '../../validation/team.validator';
import { ValidationError, ValidationErrorType } from '../../validation/validation-error';

describe('TeamService', () => {
  let subject: TeamService;
  let repository: TeamRepository;
  let validator: TeamValidator;
  let stub: TeamRepositoryStub = new TeamRepositoryStub();

  beforeEach(function () {
    repository = {} as TeamRepository;
    validator = new TeamValidator();
    subject = new TeamService(repository, validator);
  });

  describe('#create', () => {
    it('should create a new team', () => {
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

    it('should reject team when name is missing', () => {
      // arrange
      let expected = {} as Team;
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
