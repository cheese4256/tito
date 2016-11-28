let chai = require('chai');
let sinon = require('sinon');
let expect = chai.expect;

import { TeamController } from './team.controller';

import { Team } from '../../model/tito/team';
import { TeamService } from '../../service/team/team.service';

describe('TeamController', () => {
  let subject: TeamController;
  let service: TeamService;
  let httpRequest: any;
  let httpResponse: any;

  beforeEach(function () {
    service = {} as TeamService;
    subject = new TeamController(service);
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
    it('should create a new team', () => {
      // arrange
      let stub = sinon.stub().resolves();
      stub().then((m: Team) => {
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
