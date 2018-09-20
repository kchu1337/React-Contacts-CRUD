'use strict';

const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
const dynamo = require('../../src/helpers/dynamo');
const AWSMock = require('aws-sdk-mock');
const AWS =  require('aws-sdk');
AWSMock.setSDKInstance(AWS);
const uuid = require('uuid/v1');
chai.use(chaiAsPromised);

describe('Dynamo CRUD', function() {

  afterEach( function() {
    AWSMock.restore('DynamoDB.DocumentClient');
  });
  const id = uuid();

  it('create a new contact', function () {
    AWSMock.mock('DynamoDB.DocumentClient', 'put', function(params, callback) {
      callback(null, Promise.resolve());
    });
    return expect(dynamo.update({id})).to.be.fulfilled;
  });

  it('Errors when creating a new contact', function () {
    AWSMock.mock('DynamoDB.DocumentClient', 'put', function(params, callback) {
      callback(null, Promise.reject());
    });
    return expect(dynamo.create({id})).to.be.rejected;
  });

  it('update a new contact', function () {
    AWSMock.mock('DynamoDB.DocumentClient', 'put', function(params, callback) {
      callback(null, Promise.resolve());
    });
    return expect(dynamo.update({id})).to.be.fulfilled;
  });

  it('errors when updating a new contact', function () {
    AWSMock.mock('DynamoDB.DocumentClient', 'put', function(params, callback) {
      callback(null, Promise.reject());
    });
    return expect(dynamo.update({id})).to.be.rejected;
  });

  it('deletes a contact', function () {
    AWSMock.mock('DynamoDB.DocumentClient', 'delete', function(params, callback) {
      callback(null, Promise.resolve());
    });
    return expect(dynamo.delete({id})).to.be.fulfilled;
  });

  it('errors when deleting a contact', function () {
    AWSMock.mock('DynamoDB.DocumentClient', 'delete', function(params, callback) {
      callback(null, Promise.reject());
    });
    return expect(dynamo.delete({id})).to.be.rejected;
  });
});