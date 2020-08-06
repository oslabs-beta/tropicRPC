/**
 * @author : Shahrukh Khan, Roseanne Damasco, Steve Canavan
 * @functionality : Implementing chai tests for throttle functionality 
 * @changelog : ##WHOEVER CHANGES THE FILE, date, details
 * * */

import { expect } from 'chai';

const displayOutputMessage = require('../../src/modules/client/displayOutputMessage');
const sendgRPCRequest = require('../../src/modules/client/sendgRPCRequest');
const throttle = require('../../src/modules/client/throttleOnSave');

describe('Testing all functions', function () {
  describe('Testing displayOutputMessage', function () {
    it('should be a function', function () {
      expect(typeof displayOutputMessage).to.equal('function');
    });
  });
  describe('Testing sendgRPCRequest', function () {
    it('should be a function', function () {
      expect(typeof sendgRPCRequest).to.equal('function');
    });
  });
  describe('Testing throttle', function () {
    it('should be a function', function () {
      expect(typeof throttle).to.equal('function');
    });
    const add = (num1: number, num2: number): number => num1 + num2;
    const throttledAdd = throttle(add, 1000);
    it('should return a function', function () {
      expect(typeof throttledAdd).to.equal('function');
    });
    describe('Testing function returned (throttledAdd) from throttle', function () {
      it('should invoke add the first time', function () {
        const firstResult = throttledAdd(1, 2);
        expect(firstResult).not.to.equal(undefined);
      });
      it('should return undefined if immediately invoked again', function () {
        const secondResult = throttledAdd(2, 3);
        expect(secondResult).to.equal(undefined);
      });
      it('should invoke add after designated delay', function (done) {
        setTimeout(() => {
          try {
            const secondResult = throttledAdd(2, 3);
            expect(secondResult).not.to.equal(undefined);
            done();
          } catch (e) {
            done(e);
          }
        }, 1001);
      });
    });
  });
});
