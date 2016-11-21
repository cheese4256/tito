import * as chai from 'chai';
let expect = chai.expect;
let sinon = require('sinon');

import { SausageController } from './sausage.controller';

import { Sausage } from '../model/identity/sausage';

import { JwtService } from '../service/jwt.service';
import { SausageService } from '../service/sausage.service';

describe('SausageService', () => {
  let subject: SausageController;
  let jwtService: JwtService;
  let service: SausageService;
  let httpRequest: any;
  let httpResponse: any;

  beforeEach(function () {
    jwtService = {} as JwtService;
    service = {} as SausageService;
    subject = new SausageController(jwtService, service);
    httpRequest = {};

    httpResponse = {};
    httpResponse.json = sinon.stub().returns();
  });

  describe('#create', () => {
    it('should create a new sausage', () => {
      // arrange
      let stub = sinon.stub().resolves();
      stub().then((m: Sausage) => {
        return m;
      });
      service.create = stub;

      // act
      let result = subject.create(httpRequest, httpResponse);

      // assert
      expect(service.create).to.have.been.called;
    });
  });
});
