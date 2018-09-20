'use strict';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const generalValidator = require('src/validators/general.js');
const MockReq = require('mock-express-request');
const MockRes = require('mock-express-response');

describe('General validator', function() {
  let req, res, next;

  beforeEach(function() {
    req = new MockReq();
    res = new MockRes();

    next = sinon.stub();

    req.body = {
      id: 'fake uuid',
      fname: 'Rick',
      lname: 'Sanchez',
      phone: '1234567890',
      email: 'fakeemail@gmail.com',
      enabled: false
    };
  });

  afterEach(function() {
    req.errors = [];
  });

  it('should should call the next function after passing validation', function() {
    generalValidator(req, res, next);
    expect(next).to.have.callCount(1);
  });


  it('should should fail validation for too long a first name', function() {
    req.body.fname ='nameismorethan50characterszzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz';
    generalValidator(req, res, next);
    expect(next).to.have.callCount(0);
    expect(res.statusCode).to.equal(400);
  });

  it('should should fail validation for too long a lastname name', function() {
    req.body.lname ='nameismorethan50characterszzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz';
    generalValidator(req, res, next);
    expect(next).to.have.callCount(0);
    expect(res.statusCode).to.equal(400);
  });

  it('should should fail validation for invalid email', function() {
    req.body.email ='invalid_email';
    generalValidator(req, res, next);
    expect(next).to.have.callCount(0);
    expect(res.statusCode).to.equal(400);
  });

  it('should should fail validation for invalid phone number', function() {
    req.body.phone ='123abc';
    generalValidator(req, res, next);
    expect(next).to.have.callCount(0);
    expect(res.statusCode).to.equal(400);
  });

  it('should should fail validation for invalid enabled type', function() {
    req.body.enabled ='true';
    generalValidator(req, res, next);
    expect(next).to.have.callCount(0);
    expect(res.statusCode).to.equal(400);
  });


});
