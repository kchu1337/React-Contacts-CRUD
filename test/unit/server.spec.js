'use strict';

describe('Route Setup', function() {
  const chai = require('chai');
  const expect = chai.expect;
  const proxyquire = require('proxyquire');
  const sinon = require('sinon');

  let app, expressStub;

  beforeEach(function() {
    expressStub = {
      get: sinon.stub(),
      post: sinon.stub(),
      put: sinon.stub(),
      delete: sinon.stub(),
      use: sinon.stub(),
      enable: sinon.stub(),
      listen: sinon.stub()
    };
    app = proxyquire('src/server.js', {
      express: () => expressStub
    });
  });

  it('should setup all routes', function() {
    expect(app.get.callCount).to.equal(1);
    expect(app.post.callCount).to.equal(1);
    expect(app.delete.callCount).to.equal(1);
    expect(app.put.callCount).to.equal(1);
  });
});
