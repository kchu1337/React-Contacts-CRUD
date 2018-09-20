'use strict';

const chai = require("chai");
const expect = chai.expect;
const sinon  = require('sinon');
const sinonChai = require('sinon-chai');
const proxyquire = require('proxyquire').noCallThru();
const mockReq = require('mock-express-request');
const mockRes = require('mock-express-response');

chai.use(sinonChai);

describe('contacts controller', function() {
  let controller, dynamoMock, req, res;

  beforeEach(function() {
    dynamoMock = {
      getAll: sinon.stub(),
      create: sinon.stub(),
      update: sinon.stub(),
      delete: sinon.stub()
    };

    controller = proxyquire('src/controllers/controller.js', {
      '../helpers/dynamo': dynamoMock
    });

    req = new mockReq();
    res = new mockRes();
  });

  it('should get all contacts', function() {

    dynamoMock.getAll.resolves({});
    return controller.getAllContacts(req, res).then(() => {
      expect(res.statusCode).to.equal(200);
      expect(dynamoMock.getAll).to.have.callCount(1);
    });
  });

  it('should error when getting all contacts', function() {

    dynamoMock.getAll.rejects({});
    return controller.getAllContacts(req, res).then(() => {
      expect(res.statusCode).to.equal(400);
      expect(dynamoMock.getAll).to.have.callCount(1);
    });
  });

  it('should create a new contact', function() {

    dynamoMock.create.resolves({});
    return controller.createContact(req, res).then(() => {
      expect(res.statusCode).to.equal(200);
      expect(dynamoMock.create).to.have.callCount(1);
    });
  });

  it('should error when create a new contact', function() {

    dynamoMock.create.rejects({});
    return controller.createContact(req, res).then(() => {
      expect(res.statusCode).to.equal(400);
      expect(dynamoMock.create).to.have.callCount(1);
    });
  });

  it('should udpate a contact', function() {

    dynamoMock.update.resolves({});
    return controller.updateContact(req, res).then(() => {
      expect(res.statusCode).to.equal(200);
      expect(dynamoMock.update).to.have.callCount(1);
    });
  });

  it('should error when updating a contact', function() {

    dynamoMock.update.rejects({});
    return controller.updateContact(req, res).then(() => {
      expect(res.statusCode).to.equal(400);
      expect(dynamoMock.update).to.have.callCount(1);
    });
  });

  it('should delete a contact', function() {

    dynamoMock.delete.resolves({});
    return controller.deleteContact(req, res).then(() => {
      expect(res.statusCode).to.equal(204);
      expect(dynamoMock.delete).to.have.callCount(1);
    });
  });

  it('should error when deleting a contact', function() {

    dynamoMock.delete.rejects({});
    return controller.deleteContact(req, res).then(() => {
      expect(res.statusCode).to.equal(400);
      expect(dynamoMock.delete).to.have.callCount(1);
    });
  });

});