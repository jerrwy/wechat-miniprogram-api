'use strict';

var API = require('../');
var expect = require('expect');
var config = require('./config');

describe('api_common', () => {
  describe('isAccessTokenValid', function () {
    it('should invalid', function () {
      var token = new API.AccessToken('token', new Date().getTime() - 7200 * 1000);
      expect(token.isValid()).toBe(false);
    });

    it('should valid', function () {
      var token = new API.AccessToken('token', new Date().getTime() + 7200 * 1000);
      expect(token.isValid()).toBe(true);
    });
  });

  describe('getAccessToken', () => {
    it('should ok', (done) => {
      var api = new API(config.appid, config.appsecret);
      api.getAccessToken((err, token)=> {
        expect(err).toBeNull();
        expect(token.accessToken).not.toBeNull();
        expect(token.expireTime).not.toBeNull();
        done();
      });
    });

    it('should not ok', function (done) {
      var api = new API('appid', 'secret');
      api.getAccessToken(function (err, token) {
        expect(err).not.toBeNull();
        expect(err.name).toEqual('WeChatAPIError');
        expect(err.message).toMatch(/invalid appid hint/);
        done();
      });
    });
  });

  describe('mixin', function () {
    it('should ok', function () {
      API.mixin({sayHi: function () {}});
      expect(API.prototype).toHaveProperty('sayHi');
    });

    it('should not ok when override method', function () {
      expect(() => {
        API.mixin({sayHi: function () {}});
      }).toThrow(/Don't allow override existed prototype method\./);
    });
  });
});
