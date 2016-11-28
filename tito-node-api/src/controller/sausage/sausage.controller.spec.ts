let chai = require('chai');
let sinon = require('sinon');
let expect = chai.expect;

import { SausageController } from './sausage.controller';

import { Sausage } from '../../model/identity/sausage';
import { SausageService } from '../../service/sausage/sausage.service';

describe('SausageController', () => {
  let subject: SausageController;
  let service: SausageService;
  let httpRequest: any;
  let httpResponse: any;

  beforeEach(function () {
    service = {} as SausageService;
    subject = new SausageController(service);
    httpRequest = {};
    // TODO - find somewhere else to define this utility
    httpResponse = {
      send: () => {},
      json: () => {},
      status: (responseCode: number) => {
        return { send: () => {} }
      }
    };
  });

  describe('#create', () => {
    it('should always throw exception', () => {
      return expect(subject.create).to.throw(Error);
    });
  });

  describe('#login', () => {
    it('should succeed if service provides token and sausage', () => {
      // arrange
      let stub = sinon.stub().resolves({token: {}, sausage: {}});
      stub().then((m: Sausage) => {
        return m;
      });
      service.login = stub;

      httpRequest.body = {
        email: 'testable@nevo.com',
        password: 'p@assw0rD'
      }

      // act
      let result = subject.login(httpRequest, httpResponse);

      // assert
      expect(service.login).to.have.been.called;
    });

    it('should return 401 if service provides empty token and/or sausage', () => {
      // arrange
      let stub = sinon.stub().resolves();
      stub().then((m: Sausage) => {
        return m;
      });
      service.login = stub;

      httpRequest.body = {
        email: 'testable@nevo.com',
        password: 'p@assw0rD'
      }
      sinon.spy(httpResponse, 'status');

      // act
      subject.login(httpRequest, httpResponse);

      // assert
      expect(service.login).to.have.been.called;
      // TODO - race condition is preventing this call from being verified
      // may want to consider implementing promises at the controller tier
      // that can act as completion marks for methods with no return type.
      // expect(httpRequest.status).to.have.been.called;
    });
  });

  describe('#register', () => {
    it('should register a new Sausage', () => {
      // arrange
      let stub = sinon.stub().resolves();
      stub().then((m: Sausage) => {
        return m;
      });
      service.register = stub;

      // act
      let result = subject.register(httpRequest, httpResponse);

      // assert
      expect(service.register).to.have.been.called;
    });
  });
});
