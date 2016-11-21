import * as chai from 'chai';
let expect = chai.expect;
let sinon = require('sinon');

import { SausageService } from './sausage.service';

import { Sausage } from '../model/identity/sausage';
import { SausageRepository } from '../repository/sausage.repository';

describe('SausageService', () => {
  let subject: SausageService;
  let repository: SausageRepository;

  beforeEach(function () {
    repository = {} as SausageRepository;
    subject = new SausageService(repository);
  });

  describe('#create', () => {
    it('should create a new sausage', () => {
      // arrange
      let expected = {
        email: 'testable@tito-node.com'
      } as Sausage;

      let stub = sinon.stub().resolves(expected);
      stub().then((m: Sausage) => {
        return m;
      });
      repository.create = stub;

      // act
      let result = subject.create(expected);

      // assert
      result.then(m => {
        expect(m.email).to.equal(expected.email);
      })
      expect(repository.create).to.have.been.called;
    });
  });
});
