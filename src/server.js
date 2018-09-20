'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const controller = require('./controllers/controller');
const { body } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const generalValidator = require('./validators/general')
const app = express();
const port = 5000;

app.use(bodyParser.json());

app.post('/api/',[
  body('email')
    .trim()
    .escape(),
  body('fname')
    .trim()
    .escape(),
  body('lname')
    .trim()
    .escape(),
  body('phone')
    .trim()
    .escape(),
  sanitizeBody('enabled').toBoolean()
], generalValidator, controller.createContact);

app.get('/api/', controller.getAllContacts);

app.put('/api/', [
  body('email')
    .trim()
    .escape(),
  body('fname')
    .trim()
    .escape(),
  body('lname')
    .trim()
    .escape(),
  body('phone')
    .trim()
    .escape(),
  sanitizeBody('enabled').toBoolean()
], generalValidator,  controller.updateContact);

app.delete('/api/', controller.deleteContact);

app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;