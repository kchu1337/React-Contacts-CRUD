'use strict';

const chai = require("chai");
const chaiHttp = require('chai-http');
const chaiAsPromised = require('chai-as-promised');
const expect = chai.expect;
const server = require('../../src/server');
const fakerator = require('fakerator') ();
const uuid = require('uuid/v1');

let length, id, lname, fname, phone, email;
id = uuid();

chai.use(chaiHttp);
chai.use(chaiAsPromised);

describe("Testing", function() {
  it("test framework works", function () {
    expect(2).to.equal(2);
    return expect(Promise.reject({statusCode: 400})).to.be.rejected.then((err) => {
      expect(err.statusCode).to.equal(400);
    });
  });
});

describe("CRUD testing", function() {

  beforeEach(() => {
    email = fakerator.internet.email();
    lname = fakerator.names.lastName();
    fname = fakerator.names.firstName();
    phone = fakerator.phone.number();
    });

  it('Gets list of all contacts from URL', function () {
    return chai.request(server)
      .get('/api')
      .then((res) => {
        expect(res).to.have.status(200);
        length = res.length;
      })
  });

  it('Inserts a new contact', function () {

    const body = {
      id,
      email,
      lname,
      fname,
      phone,
      enabled: true
    }
    return chai.request(server)
      .post('/api')
      .set('content-type', 'application/json')
      .send(body)
      .then((res) => {
        expect(res).to.have.status(200);
      })
  });


  it('updates an existing contact', function () {

    const body = {
      id,
      email,
      lname,
      fname,
      phone,
      enabled: true
    }
    return chai.request(server)
      .put('/api')
      .set('content-type', 'application/json')
      .send(body)
      .then((res) => {
        expect(res).to.have.status(200);
      })
  });

  it('deletes an existing contact', function () {

    return chai.request(server)
      .delete(`/api?id=${id}`)
      .set('content-type', 'application/json')
      .then((res) => {
        expect(res).to.have.status(204);
      })
  });

  it('fails validation', function () {

    const body = {
      id,
      email : 'indvalid_email',
      lname,
      fname,
      phone,
      enabled: true
    }

    return chai.request(server)
      .post('/api')
      .set('content-type', 'application/json')
      .send(body)
      .then((res) => {
        expect(res.text).to.equal('Invalid Email');
        expect(res).to.have.status(400);
      })
  });

});