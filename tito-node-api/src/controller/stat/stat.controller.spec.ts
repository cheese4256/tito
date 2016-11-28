let chai = require('chai');
let sinon = require('sinon');
let expect = chai.expect;

import { StatController } from './stat.controller';

import { Stat } from '../../model/tito/stat';
import { StatService } from '../../service/stat/stat.service';

describe('StatController', () => {
  let subject: StatController;
  let service: StatService;
  let httpRequest: any;
  let httpResponse: any;

  beforeEach(function () {
    service = {} as StatService;
    subject = new StatController(service);
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

  // describe('#create', () => {
  //   it('should create a new stat', () => {
  //     // arrange
  //     let stub = sinon.stub().resolves();
  //     stub().then((m: Stat) => {
  //       return m;
  //     });
  //     service.create = stub;
  //
  //     // act
  //     let result = subject.create(httpRequest, httpResponse);
  //
  //     // assert
  //     expect(service.create).to.have.been.called;
  //   });
  // });
});
