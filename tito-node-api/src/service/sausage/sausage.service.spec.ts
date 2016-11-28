let chai = require('chai');
let sinon = require('sinon');
let expect = chai.expect;

// subject
import { SausageService } from './sausage.service';

// dependency imports
import { CryptoService } from '../crypto/crypto.service';
import { JwtService } from '../jwt/jwt.service';
import { Sausage } from '../../model/identity/sausage';
import { SausageRepository } from '../../repository/sausage/sausage.repository';
import { SausageRepositoryStub } from '../../repository/sausage/sausage.repository.stub';
import { SausageValidator } from '../../validation/sausage.validator';
import { ValidationError, ValidationErrorType } from '../../validation/validation-error';

describe('SausageService', () => {
  let subject: SausageService;
  let cryptoService: CryptoService;
  let jwtService: JwtService;
  let repository: SausageRepository;
  let validator: SausageValidator;
  let stub: SausageRepositoryStub = new SausageRepositoryStub();

  beforeEach(function () {
    cryptoService = new CryptoService();
    jwtService = new JwtService();
    repository = {} as SausageRepository;
    validator = new SausageValidator();
    subject = new SausageService(repository, validator,
      cryptoService, jwtService);
  });

  describe('#create', () => {
    it('should create a new sausage', () => {
      // arrange
      let expected = {
        email: 'testable@nevo.com',
        password: 'p@ssw0rD'
      } as Sausage;
      repository.create = stub.buildMethodStub(expected);

      sinon.spy(validator, 'create');

      // act
      let result = subject.create(expected);

      // assert
      return expect(result).to.be.fulfilled.then((m: any) => {
        expect(m.email).to.equal(expected.email);

        expect(repository.create).to.have.been.called;
        expect(validator.create).to.have.been.called;
      });
    });

    it('should reject sausages when email is missing', () => {
      // arrange
      let expected = {} as Sausage;
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

    it('should reject sausages when email is invalid', () => {
      // arrange
      let expected = { email: 'im_not_an_email_address' } as Sausage;
      repository.create = stub.buildMethodStub(expected);

      // act
      let result = subject.create(expected);

      // assert
      return expect(result).to.be.rejected.then((errors: any) => {
        expect(errors).to.exist;
        expect(errors.find((e: any) =>
          e.errorType === ValidationErrorType.invalidFormat)).to.exist;
      });
    });
  });

  describe('#register', () => {
    it('should encrypt password and create sausage', () => {
      // arrange
      let expected = {
        email: 'testable@nevo.com',
        password: 'p@ssw0rD'
      } as Sausage;
      repository.create = stub.buildMethodStub(expected);

      sinon.spy(validator, 'register');
      sinon.spy(cryptoService, 'generateSalt');
      sinon.spy(cryptoService, 'secureHash');
      sinon.spy(jwtService, 'jwtSign');

      // act
      let result = subject.register(expected);

      // assert
      return expect(result).to.be.fulfilled.then((r: any) => {
        // validate token
        expect(r.token).to.be.string;

        // validate sausage data
        expect(r.sausage).to.exist;
        expect(r.sausage.email).to.equal(expected.email);
        expect(r.sausage.password).to.be.undefined;
        expect(r.sausage.credential.passwordEncrypted).to.not.be.undefined;
        expect(r.sausage.credential.passwordSalt).to.not.be.undefined;

        // validate code paths
        expect(repository.create).to.have.been.called;
        expect(validator.register).to.have.been.called;
        expect(cryptoService.generateSalt).to.have.been.called;
        expect(cryptoService.secureHash).to.have.been.called;
        expect(jwtService.jwtSign).to.have.been.called;
      });
    });
  });

  describe('#findByEmail', () => {
    it('should return known sausage with matching email', () => {
      // arrange
      let expected = stub.generateDefaultModel();

      repository.findByEmail = stub.buildMethodStub(expected);

      // act
      let result = subject.findByEmail(expected.email);

      // assert
      return expect(result).to.be.fulfilled.then((m: any) => {
        expect(m).to.not.be.undefined;
        expect(m.email).to.equal(expected.email);

        expect(repository.findByEmail).to.have.been.called;
      });
    });
  });

  describe('#login', () => {
    it('should return known sausage when password matches', () => {
      // arrange
      let expected = stub.generateDefaultModel();
      repository.findByEmail = stub.buildMethodStub(expected);

      sinon.spy(cryptoService, 'secureHash');
      sinon.spy(jwtService, 'jwtSign');

      // act
      let result = subject.login(expected.email, 'p@ssw0rD');

      // assert
      return expect(result).to.be.fulfilled.then((r: any) => {
        // validate token
        expect(r.token).to.be.string;

        // validate sausage data
        expect(r.sausage).to.exist;
        expect(r.sausage.email).to.equal(expected.email);

        // validate code paths
        expect(repository.findByEmail).to.have.been.called;
        expect(cryptoService.secureHash).to.have.been.called;
        expect(jwtService.jwtSign).to.have.been.called;
      });
    });

    it('should return null when email and password do not match', () => {
      // arrange
      let expected = stub.generateDefaultModel();
      repository.findByEmail = stub.buildMethodStub(expected);

      sinon.spy(cryptoService, 'secureHash');

      // act
      let result = subject.login(expected.email, 'incorrect-password');

      // assert
      return expect(result).to.be.fulfilled.then((m: any) => {
        expect(m).to.be.undefined;

        expect(repository.findByEmail).to.have.been.called;
        expect(cryptoService.secureHash).to.have.been.called;
      });
    });
  });
});
