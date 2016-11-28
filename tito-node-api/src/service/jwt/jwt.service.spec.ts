let chai = require('chai');
let sinon = require('sinon');
let expect = chai.expect;

// test subject import
import { JwtService } from './jwt.service';

// import dependencies
import { SausageRepositoryStub } from '../../repository/sausage/sausage.repository.stub';

describe('JwtService', () => {
  let subject: JwtService;
  let stub: SausageRepositoryStub = new SausageRepositoryStub();
  let validToken = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RhYmxlQG5ldm8uY29tIiwiZmlyc3ROYW1lIjoiSmFtZXMiLCJsYXN0TmFtZSI6IkR1Z2dhbiIsImNyZWRlbnRpYWwiOnsicGFzc3dvcmRFbmNyeXB0ZWQiOiJmYWpZcVh3eHV5dHl6bDB6cHIweXdhaGFHK0QyZmVSRGo4WG9RZHg4Nkh1STl3d0g4cCtCUzA2Z1hkUnh2NWVSTmFsSEwybmJzdXZJcTdwRTlzNlpMQT09IiwicGFzc3dvcmRTYWx0IjoiMTRmZTE2ZDRiMjhiMDA2NjZhYzJlNzVhOCJ9LCJpYXQiOjE0NzkzMzE2NjV9.MqlosYZ6dk4b42M-GqGDNieDgOfoF80FdGcsqkxrRPwFNKUeZ1lGUdXQImOowHjD6NuAMOvVZb9gSXw41vkM3g';
  let invalidToken = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RhYmxlQG5ldm8uY29tIiwiZmlyc3ROYW1lIjoiSmFtZXMiLCJsYXN0TmFtZSI6IkR1Z2dhbiIsImNyZWRlbnRpYWwiOnsicGFzc3dvcmRFbmNyeXB0ZWQiOiJmYWpZcVh3eHV5dHl6bDB6cHIweXdhaGFHK0QyZmVSRGo4WG9RZHg4Nkh1STl3d0g4cCtCUzA2Z1hkUnh2NWVSTmFsSEwybmJzdXZJcTdwRTlzNlpMQT09IiwicGFzc3dvcmRTYWx0IjoiMTRmZTE2ZDRiMjhiMDA2NjZhYzJlNzVhOCJ9LCJpYXQiOjE0NzkzMzIwOTl9.rpY4ml2yEgOLYoAgaIiQJtLIsFW9fCgtWGfbShTH09Hx0s296cKznLzePCqIsTje_62LvOMKooKUzCy34dEOHA';
  let expiredToken = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RhYmxlQG5ldm8uY29tIiwiZmlyc3ROYW1lIjoiSmFtZXMiLCJsYXN0TmFtZSI6IkR1Z2dhbiIsImNyZWRlbnRpYWwiOnsicGFzc3dvcmRFbmNyeXB0ZWQiOiJmYWpZcVh3eHV5dHl6bDB6cHIweXdhaGFHK0QyZmVSRGo4WG9RZHg4Nkh1STl3d0g4cCtCUzA2Z1hkUnh2NWVSTmFsSEwybmJzdXZJcTdwRTlzNlpMQT09IiwicGFzc3dvcmRTYWx0IjoiMTRmZTE2ZDRiMjhiMDA2NjZhYzJlNzVhOCJ9LCJpYXQiOjE0NzkzMzA4NTYsImV4cCI6MTQ3OTMzMDg1Nn0.UkUM5LlVAryaaTtQsJTPM6uRJ-6MbC8iNQU7jdv1MDKsZVBBVmFWBiIRHH6J5NuNBpPsSyLCc8VaF-tw3g94xg';

  beforeEach(function () {
    subject = new JwtService();
  });

  describe('#jwtSign', () => {
    it('should generate a token with 3 parts', () => {
      // arrange
      let sausage = stub.generateDefaultModel();

      // act
      let result = subject.jwtSign(sausage);

      // assert
      return expect(result).to.be.fulfilled.then((token: any) => {
        expect(token).to.exist;
        expect(token).to.be.string;
        expect(token.split('.').length).to.equal(3);
      });
    });
  });

  describe('#jwtVerify', () => {
    it('should unpack valid token as an object with known properties', () => {
      // arrange
      let expected = stub.generateDefaultModel();

      // act
      let result = subject.jwtVerify(validToken);

      // assert
      return expect(result).to.be.fulfilled.then((payload: any) => {
        expect(payload).to.exist;
      });
    });

    it('should reject an expired token', () => {
      // arrange
      let expected = stub.generateDefaultModel();

      // act
      let result = subject.jwtVerify(expiredToken);

      // assert
      return expect(result).to.be.rejected.then((error: any) => {
        expect(error).to.exist;
        expect(error.name).to.equal('TokenExpiredError');
      });
    });

    it('should reject a token signed with the wrong key', () => {
      // arrange
      let expected = stub.generateDefaultModel();

      // act
      let result = subject.jwtVerify(invalidToken);

      // assert
      return expect(result).to.be.rejected.then((error: any) => {
        expect(error).to.exist;
        expect(error.name).to.equal('JsonWebTokenError');
      });
    });
  });
});
