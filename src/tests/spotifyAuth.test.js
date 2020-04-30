import SpotifyWebApi from 'spotify-web-api-js';
var Q = require('q');
var sinon = require('sinon');


describe('Basic tests', function () {
  var that = this;
  beforeEach(function () {
    that.requests = [];
    that.xhr = sinon.useFakeXMLHttpRequest();
    that.xhr.onCreate = function (xhr) {
      that.requests.push(xhr);
    };
  });

  afterEach(function () {
    that.xhr.restore();
  });

  it('should return the access token', function () {
    var api = new SpotifyWebApi();
    expect(api.getAccessToken()).toBe(null);
    api.setAccessToken('Some access token');
    expect(api.getAccessToken()).toBe('Some access token');
  });

  });