let chai = require('chai');
let sinon = require('sinon');
let expect = chai.expect;

// test subject import
import { CryptoService } from './crypto.service';

describe('CryptoService', () => {
  let subject: CryptoService;

  beforeEach(function () {
    subject = new CryptoService();
  });

  describe('#generateSalt', () => {
    it('should generate a salt with known length', () => {
      // arrange
      let config = require('config');
      let length = config.get('crypto.salt.length') as number;

      // act
      let result = subject.generateSalt();

      // assert
      expect(result).to.be.string;
      expect(result.length).to.equal(length);
    });
  });

  describe('#secureHash', () => {
    it('should generate a known hash given a salt and value', () => {
      // arrange
      let salt = "14fe16d4b28b00666ac2e75a8";
      let value = "p@ssw0rD";
      let expected = "fajYqXwxuytyzl0zpr0ywahaG+D2feRDj8XoQdx86HuI9wwH8p+BS06gXdRxv5eRNalHL2nbsuvIq7pE9s6ZLA==";

      // act
      let result = subject.secureHash(value, salt);

      // assert
      expect(result).to.be.string;
      expect(result).to.equal(expected);
    });
  });
});
