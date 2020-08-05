// These tests are run using the "npm run parseUnitTest" command in package.json

import { expect } from 'chai';
import 'mocha';
import 'path';

const displayOutputMessage = require('../../src/modules/client/displayOutputMessage');
const getRootProjectDir = require('../../src/modules/client/getRootProjectDir');
const onSaveCb = require('../../src/modules/client/onSaveCb');
const sendgRPCRequest = require('../../src/modules/client/sendgRPCRequest');

describe('Testing all functions', function () {
  describe('Testing displayOutputMessage', function () {
    it('should be a function', function () {
      expect(typeof displayOutputMessage).to.equal('function');
    });
    it('should fail on uneven number of brackets', function () {
      const result = displayOutputMessage('{');
      expect(result.toString()).to.equal('Error: The following character makes the gRPC request unbalanced: {\nThe portion of the gRPC request that ran before the unbalance was detected was:\n{\n\n');
    });
    it('should fail on wrong brackets', function () {
      const result = displayOutputMessage('{)})');
      expect(result.toString()).to.equal('Error: The following character makes the gRPC request unbalanced: {\nThe portion of the query that ran before the unbalance was detected was:\n{\n\n');
    });
  // describe('Testing getRootProjectDir', function () {
  //   it('should be a function', function () {
  //     expect(typeof getRootProjectDir).to.equal('function');
  //   });
  // });
  // describe('Testing onSaveCb', function () {
  //   it('should be a function', function () {
  //     expect(typeof onSaveCb).to.equal('function');
  //   });
  // });
  // describe('Testing sendgRPCRequest', function () {
  //   it('should be a function', function () {
  //     expect(typeof sendgRPCRequest).to.equal('function');
  // //   });
  });
});
