'use strict';

const controller = (module.exports = {});
const dynamo = require('../helpers/dynamo');

/**
 * Controller method for creating a new contact
 *
 * @param req
 * @param res
 */
controller.createContact = function createContact(req, res) {
  return dynamo
    .create(req.body)
    .then((response) => res.send(response))
    .catch((err) => res.status(400).send(err));
};

/**
 * Controller method for getting all contacts
 *
 * @param req
 * @param res
 */
controller.getAllContacts = function getAllContacts(req, res) {
  return dynamo
    .getAll()
    .then((response) => res.send(response))
    .catch((err) => res.status(400).send(err));
};

/**
 * Controller method for updating a contact
 *
 * @param req
 * @param res
 */
controller.updateContact = function updateContact(req, res) {
  return dynamo
    .update(req.body)
    .then((response) => res.send(response))
    .catch((err) => res.status(400).send(err));
};

/**
 * Controller method for deleting a contact
 *
 * @param req
 * @param res
 */
controller.deleteContact = function deleteContact(req, res) {
  return dynamo
    .delete(req.query)
    .then((response) => res.status(204).send(response))
    .catch((err) => res.status(400).send(err));
};